import Image from 'next/image';
import { fetchApartmentCounts } from '@/app/lib/itemdata';
import { ItemCountTable } from '../../lib/definitions';

export default async function ApartmentsTable() {
	const apartments = await fetchApartmentCounts();

	return (
		<div className="mt-6 flow-root">
			<div className="inline-block min-w-full align-middle">
				<div className="rounded-lg bg-gray-50 p-2 md:pt-0">
					<div className="md:hidden">
						{apartments?.map((apartment) => (
							<div key={apartment.name} className="mb-2 w-full rounded-md bg-white p-4">
								<div className="flex items-center justify-between border-b pb-4">
									<div>
										<div className="mb-2 flex items-center">
											<p>{apartment.name}</p>
										</div>
									</div>
									<div>
										apartment.address
									</div>
									<div>
										apartment.residents
									</div>
								</div>
							</div>
						))}
					</div>
					<table className="hidden min-w-full text-gray-900 md:table">
						<thead className="rounded-lg text-left text-sm font-normal">
							<tr>
								<th scope="col" className="px-4 py-5 font-medium sm:pl-6">
									Name
								</th>
								<th scope="col" className="px-3 py-5 font-medium">
									Address
								</th>
								<th scope="col" className="px-3 py-5 font-medium">
									Number Of Residents
								</th>
							</tr>
						</thead>
						<tbody className="bg-white">
							{apartments?.map((apartment) => (
								<tr
									key={apartment.name}
									className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
								>
									<td className="whitespace-nowrap py-3 pl-6 pr-3">
										<div className="flex items-center gap-3">
											<p>{apartment.name}</p>
										</div>
									</td>
									<td className="whitespace-nowrap px-3 py-3">
										{apartment.address}
									</td>
									<td className="whitespace-nowrap px-3 py-3">
										{apartment.residents}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}