import Pagination from '@/app/ui/registration/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/registration/table';
import { NewRegistration } from '@/app/ui/registration/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchRecipientsPages, fetchFilteredRecipients } from '@/app/lib/itemdata';
import { Metadata } from 'next';


export const metadata: Metadata = {
	title: 'Registration',
};

export default async function Page({
	searchParams,
}: {
	searchParams?: {
		query?: string;
		page?: string;
	}
}) {
	const query = searchParams?.query || '';
	const currentPage = Number(searchParams?.page) || 1;
	const totalPages = await fetchRecipientsPages(query);
	const recipients = await fetchFilteredRecipients(query, currentPage);

	return (
		<div className="w-full">
			<div className="flex w-full items-center justify-between">
				<h1 className={`${lusitana.className} text-2xl`}>Registrations</h1>
			</div>
			<div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
				<Search placeholder="Search registrations..." />
				<NewRegistration />
			</div>
			<Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
				<Table query={query} currentPage={currentPage} />
			</Suspense>
			<div className="mt-5 flex w-full justify-center">
				<Pagination totalPages={totalPages} />
			</div>
		</div>
	);
}