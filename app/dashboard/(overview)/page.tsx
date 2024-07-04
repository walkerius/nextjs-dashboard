import AddApartments from '@/app/ui/dashboard/create-apartments';
import AddItems from '@/app/ui/dashboard/create-items';
import CurrentItems from '@/app/ui/dashboard/item-counts';
import CurrentApartments from '@/app/ui/dashboard/apartment-counts';
import { lusitana } from '@/app/ui/fonts';
export default async function Page() {
	return (
		<main>
			<h1 style={{ fontSize: '30px' }}>
				Dashboard
			</h1>
			<div>
				<h2 style={{ fontSize: '25px' }}>Add new items</h2>
				<AddItems />
			</div>
			<div>
				<h2 style={{ fontSize: '25px' }}>Add new apartments</h2>
				<AddApartments />
			</div>
			<div>
				<h2 style={{ fontSize: '25px' }}>Current Items</h2>
				<CurrentItems />
			</div>
			<div>
				<h2 style={{ fontSize: '25px', marginTop: '20px' }}>Current Apartments</h2>
				<CurrentApartments />
			</div>
		</main>
	);
}