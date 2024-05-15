import { sql } from '@vercel/postgres'
import {
	ApartmentField
} from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchItemCounts() {
	noStore();

	const apartments = await sql<ApartmentField>`
        SELECT 
            name,
            address,  // Assuming the 'address' column exists in your database
            count(*) as total
        FROM apartments
        GROUP BY name, address  // Ensure address is included in the GROUP BY
    `;

	return apartments.rows;
}


export async function addApartment(apartment: ApartmentField) {
	try {
		await sql`
            INSERT INTO apartments (name, address)
            VALUES (${apartment.name}, ${apartment.address})
        `;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to add apartment.');
	}
}


const ITEMS_PER_PAGE = 6;
export async function fetchFilteredRecipients(
	query: string,
	currentPage: number,
) {
	noStore();
	const offset = (currentPage - 1) * ITEMS_PER_PAGE;

	try {
		const invoices = await sql<ApartmentField>`
			SELECT
				apartment.apartmentid,
				apartment.name,
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