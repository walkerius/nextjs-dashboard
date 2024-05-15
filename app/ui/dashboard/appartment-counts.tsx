import React, { useEffect, useState } from 'react';
import { fetchItemCounts } from '@/app/lib/apartmentdata';
import { ApartmentField } from '../../lib/definitions';

export default function ApartmentsTable() {
	const [apartments, setApartments] = useState<ApartmentField[]>([]);

	useEffect(() => {
		const loadApartments = async () => {
			const fetchedApartments = await fetchItemCounts();
			setApartments(fetchedApartments);
		};
		loadApartments();
	}, []);

	return (
		<div className="mt-6 flow-root">
			<div className="inline-block min-w-full align-middle">
				<div className="rounded-lg bg-gray-50 p-2 md:pt-0">
					<table className="min-w-full text-gray-900 md:table">
						<thead className="rounded-lg text-left text-sm font-normal">
							<tr>
								<th scope="col" className="px-4 py-5 font-medium sm:pl-6">Apartment Name</th>
								<th scope="col" className="px-4 py-5 font-medium sm:pl-6">Address</th>
							</tr>
						</thead>
						<tbody className="bg-white">
							{apartments.map((apartment) => (
								<tr key={apartment.name} className="border-b last:border-none">
									<td className="whitespace-nowrap py-3 pl-6 pr-3">{apartment.name}</td>
									<td className="whitespace-nowrap px-3 py-3">{apartment.address}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}