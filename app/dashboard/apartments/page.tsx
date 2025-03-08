
import CurrentApartments from '@/app/ui/dashboard/apartment-counts';
export default async function Page() {
	return (
		<main>
			<div>
				<h2 style={{ fontSize: '25px', marginTop: '20px' }}>Current Apartments</h2>
				<CurrentApartments />
			</div>
		</main>
	);
}