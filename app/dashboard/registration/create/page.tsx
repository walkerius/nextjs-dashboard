import Form from '@/app/ui/registration/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';

import { fetchCustomers } from '@/app/lib/data';
export default async function Page() {
	const apartments = await fetchCustomers();

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