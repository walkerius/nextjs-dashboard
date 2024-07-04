'use client'
import { AvailableItems, RecipientProfile } from '@/app/lib/definitions';
import {
	CheckIcon,
	ClockIcon,
	CurrencyDollarIcon,
	UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { AssociateItemRecipient } from '@/app/lib/itemactions';
import { useFormState } from 'react-dom';
export default function AssociateItems({
	recipient,
	availableItems,
}: {
	recipient: RecipientProfile;
	availableItems: AvailableItems[];
}) {
	const initialState = { message: null, errors: {} };
	return (
		<form action={AssociateItemRecipient}>
			<div className='hidden'>
				<input
					id="recipients"
					name="recipientsId"
					defaultValue={recipient.recipientsid}
				></input>
			</div>

			<div className="rounded-md bg-gray-50 p-4 md:p-6 flex space-x-4"> {/* Flex container */}
				{/* Large Item Dropdown */}
				<div className="flex-1">
					<label htmlFor="largeItems" className="mb-2 block text-sm font-medium" style={{ fontSize: '22px' }}>Choose large item</label>
					<div className="relative">
						<select
							id="recipients"
							name="largeItemId"
							className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-none placeholder:text-gray-500"
							aria-describedby="largeItems-error"
						>
							<option value="" >Select a large item</option>
							{availableItems.filter(item => item.islarge).map((item) => (
								<option key={item.name} value={item.name}>
									{item.name}
								</option>
							))}
						</select>
						<UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
					</div>
				</div>
				{/* Small Item Dropdown */}
				<div className="flex-1">
					<label htmlFor="smallItems" className="mb-2 block text-sm font-medium" style={{ fontSize: '22px' }}>Choose small item</label>
					<div className="relative">
						<select
							id="recipients"
							name="smallItemId"
							className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-none placeholder:text-gray-500"
							aria-describedby="smallItems-error"
						>
							<option value="" >Select a small item</option>
							{availableItems.filter(item => !item.islarge).map((item) => (
								<option key={item.name} value={item.name}>
									{item.name}
								</option>
							))}
						</select>
						<UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
					</div>
				</div>
				<Link
					href="/dashboard/registration"
					className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
					style={{ marginTop: '30px' }}
				>
					Cancel
				</Link>
				<Button type="submit" style={{ marginTop: '30px' }}>Add Items to User</Button>
			</div>
		</form>
	);

}