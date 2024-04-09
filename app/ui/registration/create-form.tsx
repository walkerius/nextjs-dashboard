'use client';

import { apartmentField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createRecipient } from '@/app/lib/itemactions';
import { useFormState } from 'react-dom';

export default function Form({ apartments }: { apartments: apartmentField[] }) {
	const initialState = { message: null, errors: {} };

	return (
		<form action={createRecipient}>
			<div className="rounded-md bg-gray-50 p-4 md:p-6">
				{/* recipient Name */}
				<div className="mb-4">
					<label htmlFor="name" className="mb-2 block text-sm font-medium">
						Name:*
					</label>
					<div className="relative">
						<input
							id="name"
							name="amount"
							type="string"
							placeholder="Enter your name"
							className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
							aria-describedby="amount-error"
						/>
					</div>
				</div>
				{/* semester */}
				<fieldset>
					<legend className="mb-2 block text-sm font-medium">
						Which semester did you start at Texas A&M?*
					</legend>
					<div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
						<div className="flex gap-4">
							<div className="flex items-center">
								<input
									id="spring"
									name="semester"
									type="radio"
									value="spring"
									className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
								/>
								<label htmlFor="spring"	className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">
									Spring
								</label>
							</div>
							<div className="flex items-center">
								<input
									id="summer"
									name="semester"
									type="radio"
									value="summer"
									className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
								/>
								<label htmlFor="summer" className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white">
									Summer
								</label>
							</div>
							<div className="flex items-center">
								<input
									id="fall"
									name="semester"
									type="radio"
									value="fall"
									className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
								/>
								<label htmlFor="fall" className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white">
									Fall
								</label>
							</div>
							<div className="flex items-center">
								<input
									id="other"
									name="semester"
									type="radio"
									value="other"
									className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
								/>
								<label htmlFor="other" className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white">
									Other
								</label>
							</div>
						</div>
					</div>
				</fieldset>
				{/* degree */}
				<fieldset>
					<legend className="mb-2 block text-sm font-medium">
						Which degree are you pursuing?*
					</legend>
					<div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
						<div className="flex gap-4">
							<div className="flex items-center">
								<input
									id="undergraduate"
									name="degree"
									type="radio"
									value="undergraduate"
									className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
								/>
								<label htmlFor="undergraduate" className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">
									Undergraduate
								</label>
							</div>
							<div className="flex items-center">
								<input
									id="masters"
									name="degree"
									type="radio"
									value="masters"
									className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
								/>
								<label htmlFor="masters" className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white">
									Masters
								</label>
							</div>
							<div className="flex items-center">
								<input
									id="phd"
									name="degree"
									type="radio"
									value="phd"
									className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
								/>
								<label htmlFor="phd" className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white">
									PhD
								</label>
							</div>
							<div className="flex items-center">
								<input
									id="other"
									name="degree"
									type="radio"
									value="other"
									className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
								/>
								<label htmlFor="other" className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white">
									Other
								</label>
								<input
									id="othername"
									name="othername"
									type="string"
									placeholder=""
									className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
									aria-describedby="amount-error"
								/>
							</div>
						</div>
					</div>
				</fieldset>
				{/* gender */}
				<fieldset>
					<legend className="mb-2 block text-sm font-medium">
						Gender:*
					</legend>
					<div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
						<div className="flex gap-4">
							<div className="flex items-center">
								<input
									id="male"
									name="gender"
									type="radio"
									value="male"
									className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
								/>
								<label htmlFor="male" className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">
									Male
								</label>
							</div>
							<div className="flex items-center">
								<input
									id="female"
									name="gender"
									type="radio"
									value="female"
									className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
								/>
								<label htmlFor="female" className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white">
									Female
								</label>
							</div>
						</div>
					</div>
				</fieldset>
				{/* phone Number */}
				<div className="mb-4">
					<label htmlFor="phone" className="mb-2 block text-sm font-medium">
						USA Phone Number:* (If you do not have a USA phone number, write your cell phone number starting with +)
					</label>
					<div className="relative">
						<input
							id="phone"
							name="phone"
							type="string"
							placeholder="Enter your phone number"
							className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
							aria-describedby="amount-error"
						/>
					</div>
				</div>
				{/* email address */}
				<div className="mb-4">
					<label htmlFor="email" className="mb-2 block text-sm font-medium">
						Email Address:*
					</label>
					<div className="relative">
						<input
							id="email"
							name="email"
							type="string"
							placeholder="Enter your email address"
							className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
							aria-describedby="amount-error"
						/>
					</div>
				</div>
				{/* country */}
				<div className="mb-4">
					<label htmlFor="country" className="mb-2 block text-sm font-medium">
						Home Country:*
					</label>
					<div className="relative">
						<input
							id="country"
							name="amount"
							type="string"
							placeholder="Enter your home country"
							className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
							aria-describedby="amount-error"
						/>
					</div>
				</div>
				{/* apartment Name */}
				<div className="mb-4">
					<label htmlFor="apartment" className="mb-2 block text-sm font-medium">
						Apartment Name:*
					</label>
					<div className="relative">
						<select
							id="apartment"
							name="apartmentid"
							className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
							defaultValue=""
							aria-describedby="customer-error"
						>
							<option value="" disabled>
								select an apartment
							</option>
							{apartments.map((apartment) => (
								<option key={apartment.id} value={apartment.id}>
									{apartment.name}
								</option>
							))}
						</select>
					</div>
				</div>
				{/* address */}
				<div className="mb-4">
					<label htmlFor="country" className="mb-2 block text-sm font-medium">
						If you selected &quot;Other&quot; in the question above, type your full address, including name of apartment
					</label>
					<div className="relative">
						<input
							id="address"
							name="address"
							type="string"
							placeholder="full address"
							className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
							aria-describedby="amount-error"
						/>
					</div>
				</div>
				{/* apartment */}
				<div className="mb-4">
					<label htmlFor="country" className="mb-2 block text-sm font-medium">
						Apartment Building & Number:*
					</label>
					<div className="relative">
						<input
							id="building"
							name="building"
							type="string"
							placeholder="building and number"
							className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
							aria-describedby="amount-error"
						/>
					</div>
				</div>
				{/* roommate */}
				<fieldset>
					<legend className="mb-2 block text-sm font-medium">
						Is one or more of your roommates also getting items from the Big Giveaway today?*
					</legend>
					<div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
						<div className="flex gap-4">
							<div className="flex items-center">
								<input
									id="yes"
									name="roommate"
									type="radio"
									value="yes"
									className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
								/>
								<label htmlFor="yes" className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">
									Yes
								</label>
							</div>
							<div className="flex items-center">
								<input
									id="no"
									name="roommate"
									type="radio"
									value="no"
									className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
								/>
								<label htmlFor="no" className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white">
									No
								</label>
							</div>
						</div>
					</div>
				</fieldset>

			</div>




			<div className="mt-6 flex justify-end gap-4">
				<Link
					href="/dashboard/invoices"
					className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
				>
					Cancel
				</Link>
				<Button type="submit">Create Recipient</Button>
			</div>
		</form>
	);
}
