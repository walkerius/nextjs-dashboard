import { sql } from '@vercel/postgres'
import {
	Item,
	ItemCountTable,
	ItemsTable
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