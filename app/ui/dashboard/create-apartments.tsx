'use client';

import { CustomerField, Item } from '@/app/lib/definitions';
import Link from 'next/link';
import {
	CheckIcon,
	ClockIcon,
	CurrencyDollarIcon,
	UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createApartment } from '@/app/lib/itemactions';
import { useFormState } from 'react-dom';

export default function Form() {
	return (
		<form action={createApartment}>
			{/* Apartment Name */}
			<div className="mb-4 inline-block">
				<label htmlFor="name" className="mb-2 block text-sm font-medium">
					Apartment name
				</label>
				<div className="relative mt-2 rounded-md">
					<div className="relative">
						<input
							id="name"
							name="name"
							type="string"
							placeholder="Enter Apartment Name"
							className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
							aria-describedby="name-error"
						/>
					</div>
				</div>
			</div>
			{/* Apartment Address */}
			<div className="mb-4 inline-block">
				<label htmlFor="address" className="mb-2 block text-sm font-medium">
					Apartment Address
				</label>
				<div className="relative mt-2 rounded-md">
					<div className="relative">
						<input
							id="address"
							name="address"
							type="string"
							placeholder="Enter Apartment Address"
							className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
							aria-describedby="address-error"
						/>
					</div>
				</div>
			</div>
			<div className="mt-6 gap-4 inline-block">
				<Button type="submit">Add</Button>
			</div>
		</form>
	);
}