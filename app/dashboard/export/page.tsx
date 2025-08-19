
import { fetchRecipients } from '@/app/lib/itemdata';

export default async function Page() {
	const recipients = await fetchRecipients();
	return (
		<main>
			<div>
				Name|large items|small items|Semester|degree|gender|phone number|email|home country|apartment name|apartment address|apartment building|apartment number|clean building|clean apartment|full address|married|has roommates|roommate name|create Date|Note
			</div>

			{recipients.map((recipient) => {
				const cleanBuilding = recipient.building
					?.replace(/\b(Building|Bldg)\.?/gi, '')
					.trim();

				const cleanApartment = recipient.apartmentnumber
					?.replace(/\b(Apartment|Apt|Unit)\.?/gi, '')
					.trim();

				return (
					<div key={recipient.recipientsid}>
						{recipient.recipientsname} | {recipient.largeitems} | {recipient.smallitems} | {recipient.semester} | {recipient.degree} | {recipient.gender} | {recipient.phone} | {recipient.email} | {recipient.country} | {recipient.apartment} | {recipient.apartmentaddress} | {recipient.building}| {recipient.apartmentnumber} | {cleanBuilding}  | {cleanApartment} | {recipient.address} | {recipient.married} | {recipient.hasroommates} | {recipient.roomatename} | {recipient.creation} | {recipient.note}
					</div>
				);
			})}
		</main>
	);
}