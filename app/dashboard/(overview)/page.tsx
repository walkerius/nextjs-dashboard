import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { RevenueChartSkeleton, LatestInvoicesSkeleton, CardsSkeleton } from '@/app/ui/skeletons';
import CardWrapper from '@/app/ui/dashboard/cards';
import AddItems from '@/app/ui/dashboard/create-items';
import CurrentItems from '@/app/ui/dashboard/item-counts';

export default async function Page() {
	/*const revenue = await fetchRevenue();*/
	/*const latestInvoices = await fetchLatestInvoices();*/
	/*const cardData = await fetchCardData();*/

	return (
		<main>
			<h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
				Dashboard
			</h1>
			<div>
				<h2>Add new items</h2>
				<AddItems/>
			</div>
			<div>
				<h2>Current Items</h2>
				<CurrentItems/>
			</div>

			{/*<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">*/}
			{/*	<Suspense fallback={<CardsSkeleton />}>*/}
			{/*		<CardWrapper />*/}
			{/*	</Suspense>*/}
			{/*	*/}{/*<Card title="Collected" value={cardData.totalPaidInvoices} type="collected" /> */}
			{/*	*/}{/*<Card title="Pending" value={cardData.totalPendingInvoices} type="pending" /> */}
			{/*	*/}{/*<Card title="Total Invoices" value={cardData.numberOfInvoices} type="invoices" /> */}
			{/*	*/}{/* <Card*/}
			{/*	*/}{/*	title="Total Customers"*/}
			{/*	*/}{/*	value={cardData.numberOfCustomers}*/}
			{/*	*/}{/*	type="customers"*/}
			{/*	*/}{/*/> */}
			{/*</div>*/}
			{/*<div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">*/}
			{/*	<Suspense fallback={<RevenueChartSkeleton />}>*/}
			{/*		<RevenueChart  />*/}
			{/*	</Suspense>*/}
			{/*	<Suspense fallback={<LatestInvoicesSkeleton /> }>*/}
			{/*		<LatestInvoices />*/}
			{/*	</Suspense>*/}
			{/*</div>*/}
		</main>
	);
}