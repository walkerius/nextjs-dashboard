
import { fetchRecipients } from '@/app/lib/itemdata';

export default async function Page() {
	const recipients = await fetchRecipients();
	return (
		<main>
			<div>
				Name|large items|small items|Semester|degree|gender|phone number|email|home country|apartment name|full address|apartment building and number|has roommates
			</div>
			{recipients.map((recipient) => (
				<div key={recipient.recipientsid}>
					{recipient.recipientsname} | {recipient.largeitems} | {recipient.smallitems} | {recipient.semester} | {recipient.degree} | {recipient.gender} | {recipient.phone} | {recipient.email} | {recipient.country} | {recipient.apartment} | {recipient.address} | {recipient.building} | {recipient.hasroommates}
				</div>
			))}
		</main>
	);
}