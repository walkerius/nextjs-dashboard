'use server';
import { sql } from '@vercel/postgres'
import {
	AvailableItems,
	ItemCountTable,
	ItemsTable,
	RecipientProfile,
	ApartmentCountTable
} from './definitions';
import { unstable_noStore as noStore } from 'next/cache';
import XLSX from 'xlsx';

export async function fetchItemCounts() {
	noStore();

	const items = await sql < ItemCountTable>`
		select 
			CASE WHEN isLarge THEN 'Large Item' ELSE 'Small Item' END as size,
			name,
			SUM(CASE WHEN recipientsid is null then 1 else 0 end) as available,
			count(*) as total
		FROM items
		group by isLarge, name
		ORDER BY name asc
	`;

	return items.rows;
}

export async function fetchApartmentCounts() {
	noStore();

	const apartments = await sql < ApartmentCountTable>`
		select 
			apartmentsid as id,
			name,
			address,
			residents.residents,
			count(*) as total
		FROM apartments
		LEFT JOIN (
					SELECT apartmentid, COUNT(*) AS residents
					FROM recipients
					WHERE recipients.apartmentid is not null
					GROUP BY recipients.apartmentid
				) residents ON residents.apartmentid = apartments.apartmentsid
		group by apartmentsid, name, address, residents
		ORDER BY name asc
	`;

	return apartments.rows;
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredRecipients(
	query: string,
	currentPage: number,
) {
	noStore();
	console.log("breakpoint");
	const offset = (currentPage - 1) * ITEMS_PER_PAGE;

	try {
		const invoices = await sql<ItemsTable>`
			SELECT
				recipients.name as "recipientsname",
				recipients.recipientsid,
				largeitems.items as largeitems,
				smallitems.items as smallitems,
				recipients.address
			FROM recipients
				LEFT JOIN (
					SELECT recipientsid, string_agg(name, ', ') as items
					FROM items
					WHERE isLarge = true
					GROUP BY recipientsid
				) largeitems ON largeitems.recipientsid = recipients.recipientsid
				LEFT JOIN (
					SELECT recipientsid, string_agg(name, ', ') as items
					FROM items
					WHERE isLarge = false
					GROUP BY recipientsid
				) smallitems ON smallitems.recipientsid = recipients.recipientsid
			WHERE
			  recipients.name ILIKE ${`%${query}%`} OR
			  largeitems.items ILIKE ${`%${query}%`} OR
			  smallitems.items ILIKE ${`%${query}%`}
			ORDER BY recipients.name ASC
			LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
		`;
		console.log (invoices);
		return invoices.rows;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch recipients.');
	}
}

export async function fetchRecipientsPages(query: string) {
	noStore();
	try {
		const count = await sql`SELECT COUNT(*)
    FROM recipients
    LEFT JOIN items ON items.recipientsid = recipients.recipientsid
    WHERE
      recipients.name ILIKE ${`%${query}%`} OR
      items.name ILIKE ${`%${query}%`}

  `;

		const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
		return totalPages;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch total number of recipients.');
	}
}

export async function fetchRecipientByName(name: string) {
	noStore();
	try {
		console.log(name);
		const data = await sql<RecipientProfile>`
			SELECT
				recipients.recipientsid, 
				name,
				semester,
				degree,
				CASE WHEN ismale THEN 'male' ELSE 'female' END as ismale,
				phone,
				email,
				country,
				apartmentid,
				address,
				building,
				roomateid,
				roomatename,
				itemgroup.items
			FROM recipients 
			LEFT JOIN (
				SELECT recipientsid, string_agg(name || '(' || (case when islarge = true then 'large' else 'small' end) || ')', ', ') as items
				FROM items
				GROUP BY recipientsid
			) itemgroup ON itemgroup.recipientsid = recipients.recipientsid
			WHERE recipients.recipientsid = ${name};
    `;

	console.log(data.rows[0]); 



	return data.rows[0];
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch recipient.');
	}
}

export async function fetchAvailableItems() {
	noStore();
	try {
		const data = await sql<AvailableItems>`
      select name, islarge, count(*)
		FROM items
		WHERE recipientsid is null
		GROUP BY name, islarge
    `;

		const customers = data.rows;
		return customers;
	} catch (err) {
		console.error('Database Error:', err);
		throw new Error('Failed to fetch all items.');
	}
}

export async function fetchRecipientItems(recipientsId: string) {
	noStore();
	console.log(recipientsId);
	try {
		const data = await sql<AvailableItems>`
      select itemsid as id, name, islarge
		FROM items
		WHERE recipientsid = ${`${recipientsId}`}
		ORDER BY name asc
    `;

		const items = data.rows;
		console.log(items.length);
		return items;
	} catch (err) {
		console.error('Database Error:', err);
		throw new Error('Failed to fetch all items.');
	}
}

export async function fetchRecipients() {
	noStore();
	console.log("test");
	try {
		const recipients = await sql<ItemsTable>`
			SELECT
				recipients.name as "recipientsname",
				recipients.recipientsid,
				largeitems.items as largeitems,
				smallitems.items as smallitems,
				recipients.address,
				recipients.semester,
				recipients.degree,
				CASE WHEN recipients.ismale THEN 'male' ELSE 'female' END as gender,
				recipients.phone,
				recipients.email,
				recipients.country,
				apartments.name as apartment,
				apartments.address as apartmentaddress,
				recipients.address,
				recipients.building,
				CASE WHEN roomateName = '' THEN 'No' ELSE 'Yes' END as hasRoommates,
				recipients.roomateName as roomatename
			FROM recipients
				LEFT JOIN (
					SELECT recipientsid, string_agg(name, ', ') as items
					FROM items
					WHERE isLarge = true
					GROUP BY recipientsid
				) largeitems ON largeitems.recipientsid = recipients.recipientsid
				LEFT JOIN (
					SELECT recipientsid, string_agg(name, ', ') as items
					FROM items
					WHERE isLarge = false
					GROUP BY recipientsid
				) smallitems ON smallitems.recipientsid = recipients.recipientsid
				LEFT JOIN apartments ON apartments.apartmentsid = recipients.apartmentid
			ORDER BY recipients.name ASC
		`;
		console.log(recipients.rows[2]);
		return recipients.rows;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch all.');
	}
}

export async function exportTableToExcel() {
	const XLSX = await import('xlsx');
	const recipients = await fetchRecipients();
	const workbook = XLSX.utils.book_new();
	const worksheet = XLSX.utils.json_to_sheet(recipients);
	XLSX.utils.book_append_sheet(workbook, worksheet, 'Recipients');

	try {
		XLSX.writeFile(workbook, 'recipients.xlsx');
		console.log('File saved successfully.');
	} catch (error) {
		console.error('Error saving file:', error);
	}
}