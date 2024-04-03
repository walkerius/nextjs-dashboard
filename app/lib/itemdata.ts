import { sql } from '@vercel/postgres'
import {
	Item,
	ItemCountTable
} from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchItemCounts() {
	noStore();

	const items = await sql < ItemCountTable>`
		select 
			isLarge,
			name,
			SUM(CASE WHEN recipientsid is null then 1 else 0 end) as available,
			count(*) as total
		FROM items
		group by isLarge, name
	`;

	return items.rows;
}