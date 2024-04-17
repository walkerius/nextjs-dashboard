import { sql } from '@vercel/postgres'
import {
	AvailableItems,
	ItemCountTable,
	ItemsTable,
	RecipientProfile
} from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

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
	`;

	return items.rows;
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredRecipients(
	query: string,
	currentPage: number,
) {
	noStore();
	const offset = (currentPage - 1) * ITEMS_PER_PAGE;

	try {
		const invoices = await sql<ItemsTable>`
			SELECT
				items.itemsid,
				CASE WHEN isLarge THEN 'Large Item' ELSE 'Small Item' END as size,
				items.name,
				items.recipientsid,
				recipients.name as "recipientsname"
			FROM recipients
				JOIN items ON items.recipientsid = recipients.recipientsid
			WHERE
			  recipients.name ILIKE ${`%${query}%`} OR
			  items.name ILIKE ${`%${query}%`}
			ORDER BY recipients.name DESC
			LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
		`;

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
    JOIN items ON items.recipientsid = recipients.recipientsid
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
				ismale,
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

	console.log('fpimd page'); 



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