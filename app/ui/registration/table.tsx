import { fetchFilteredRecipients } from '@/app/lib/itemdata';
import { DeleteRegistration, UpdateRegistration } from '@/app/ui/registration/buttons';
import { ExportExcel } from '@/app/ui/registration/buttons';

export default async function RecipientsTable({
	query,
	currentPage,
}: {
	query: string;
	currentPage: number;
}) {
	const recipients = await fetchFilteredRecipients(query, currentPage);


	return (
		<div className="mt-6 flow-root">
			<div className="inline-block min-w-full align-middle">
				<div className="rounded-lg bg-gray-50 p-2 md:pt-0">
					<div className="md:hidden">
						{recipients?.map((recipient) => (
							<div
								key={recipient.recipientsid}
								className="mb-2 w-full rounded-md bg-white p-4"
							>
								<div className="flex items-center justify-between border-b pb-4">
									<div>
										<div className="mb-2 flex items-center">
											<p>{recipient.recipientsname}</p>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
					<table className="hidden min-w-full text-gray-900 md:table">
						<thead className="rounded-lg text-left text-sm font-normal">
							<tr>
								<th scope="col" className="px-4 py-5 font-medium sm:pl-6">
									Recipient
								</th>
								<th scope="col" className="px-3 py-5 font-medium">
									Large Items
								</th>
								<th scope="col" className="px-3 py-5 font-medium">
									Small Items
								</th>
								<th scope="col" className="px-3 py-5 font-medium">
									Address
								</th>
								<th scope="col" className="relative py-3 pl-6 pr-3">
									<span className="sr-only">Edit</span>
								</th>
							</tr>
						</thead>
						<tbody className="bg-white">
							{recipients?.map((recipient) => (
								<tr
									key={recipient.recipientsid}
									className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
								>
									<td className="whitespace-nowrap py-3 pl-6 pr-3">
										{recipient.recipientsname}
									</td>
									<td className="whitespace-nowrap px-3 py-3">
										{recipient.largeitems}
									</td>
									<td className="whitespace-nowrap px-3 py-3">
										{recipient.smallitems}
									</td>
									<td className="whitespace-nowrap px-3 py-3">
										{recipient.address}
									</td>
									<td className="whitespace-nowrap py-3 pl-6 pr-3">
										<div className="flex justify-end gap-3">
											<UpdateRegistration id={recipient.recipientsid} />
											<DeleteRegistration id={recipient.recipientsid} />
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<ExportExcel/>
				</div>
			</div>
		</div>
	);
}
