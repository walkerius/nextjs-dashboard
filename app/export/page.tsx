
import { fetchRecipients } from '@/app/lib/itemdata';

export default async function Page() {
	const recipients = await fetchRecipients();
	return (
		<main>
			<div>
				Name,Semester,degree,gender,phone number,email,home country,apartment name, apartment address,apartment building and number,full address,has roommates,large items,small items
			</div>
			{recipients.map((recipient) => (
				<div key={recipient.recipientsid}>
					{recipient.recipientsname} | {recipient.recipientsid} | {recipient.largeitems} | {recipient.smallitems} | {recipient.semester} | {recipient.degree} | {recipient.gender} | {recipient.phone} | {recipient.email} | {recipient.country} | {recipient.apartment} | {recipient.apartmentaddress} | { recipient.building } | { recipient.address } | { recipient.hasroommates }
				</div>
			))}
		</main>
	);
}