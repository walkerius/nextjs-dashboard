'use client';

import { Button } from '@/app/ui/button';
import { createItems } from '@/app/lib/itemactions';

export default function Form() {
	return (
		<form action={createItems}>
			{/* Item Name */}
			<div className="mb-4 inline-block" style={{ margin: '10px' }}>
				<label htmlFor="name" className="mb-2 block text-sm font-medium" style={{ fontSize: '22px' }}>
					Item name
				</label>
				<div className="relative mt-2 rounded-md">
					<div className="relative">
						<input
							id="name"
							name="name"
							type="string"
							placeholder="Enter Item Name"
							className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
							aria-describedby="name-error"
						/>
					</div>
				</div>
			</div>
			{/* number of items */}
			<div className="mb-4 inline-block" style={{ margin: '10px' }}>
				<label htmlFor="amount" className="mb-2 block text-sm font-medium" style={{ fontSize: '22px' }}>
					Item amount
				</label>
				<div className="relative mt-2 rounded-md">
					<div className="relative">
						<input
							id="amount"
							name="amount"
							type="number"
							step="1"
							placeholder="Enter Item amount"
							className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
							aria-describedby="name-error"
						/>
					</div>
				</div>
			</div>
			{/* size */}
			<fieldset className="inline-block" style={{ margin: '10px' }}>
				<legend className="mb-2 block text-sm font-medium" style={{ fontSize: '22px' }}>
					Select size
				</legend>
				<div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
					<div className="flex gap-4">
						<div className="flex items-center">
							<input
								id="small"
								name="isLarge"
								type="radio"
								value="small"
								className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
							/>
							<label
								htmlFor="small"
								className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
								style={{ fontSize: '22px' }}
							>
								Small
							</label>
						</div>
						<div className="flex items-center">
							<input
								id="large"
								name="isLarge"
								type="radio"
								value="large"
								className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
							/>
							<label
								htmlFor="large"
								className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
								style={{ fontSize: '22px' }}
							>
								Large
							</label>
						</div>
					</div>
				</div>
			</fieldset>
			<div className="mt-6 gap-4 inline-block">
				<Button type="submit">Add</Button>
			</div>
		</form>
	);
}
