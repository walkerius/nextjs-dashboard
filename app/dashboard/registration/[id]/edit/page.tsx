import Form from '@/app/ui/registration/edit-form';
import AssociateItems from '@/app/ui/registration/associate-item';
import AddApartments from '@/app/ui/dashboard/create-apartments';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchAvailableItems, fetchRecipientByName, fetchApartmentCounts } from '@/app/lib/itemdata';
import { notFound } from 'next/navigation';
import { fetchCustomers } from '../../../../lib/data';
export default async function Page({ params }: { params: { id: string } }) {
	const id = params.id;
	console.log("page" + id);
	const [recipient, availableitems, apartments] = await Promise.all([
		fetchRecipientByName(id),
		fetchAvailableItems(),
		fetchApartmentCounts()
	]);
	if (!recipient) {
		notFound();
	}
	return (
		<main>
			<Breadcrumbs
				breadcrumbs={[
					{ label: 'Recipients', href: '/dashboard/registration' },
					{
						label: 'Edit Recipient',
						href: `/dashboard/registration/${id}/edit`,
						active: true,
					},
				]}
			/>
			<AssociateItems recipient={recipient} availableItems={availableitems} />
			<Form recipient={recipient} availableItems={availableitems} apartments={apartments} />
		</main>
	);
}
/* 			<associateItems recipientid={recipient.id}></associateItems> */