import Form from '@/app/ui/registration/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchApartmentCounts } from '@/app/lib/itemdata';

export default async function Page() {
	const apartments = await fetchApartmentCounts();

	return (
		<main>
			<Breadcrumbs
				breadcrumbs={[
					{ label: 'Registration', href: '/dashboard/registration' },
					{
						label: 'Registration',
						href: '/dashboard/registration/create',
						active: true,
					},
				]}
			/>
			<Form apartments={apartments} />
		</main>
	);
}