import AddApartments from '@/app/ui/dashboard/create-apartments';
import AddItems from '@/app/ui/dashboard/create-items';
import CurrentItems from '@/app/ui/dashboard/item-counts';
import { lusitana } from '@/app/ui/fonts';
export default async function Page() {
	return (
		<main>
			<h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
				Dashboard
			</h1>
			<div>
				<h2>Add new items</h2>
				<AddItems />
			</div>
			<div>
				<h2>Add new apartments</h2>
				<AddApartments />
			</div>
			<div>
				<h2>Current Items</h2>
				<CurrentItems />
			</div>
		</main>
	);
}