import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { DeleteRecipient, DeleteItem } from '@/app/lib/itemactions';
import { exportTableToExcel } from '@/app/lib/itemdata';

export function NewRegistration() {
	return (
		<Link
			href="/dashboard/registration/create"
			className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
		>
			<span className="hidden md:block">New Registration</span>{' '}
			<PlusIcon className="h-5 md:ml-4" />
		</Link>
	);
}

export function UpdateRegistration({ id }: { id: string }) {
	return (
		<Link
			href={`/dashboard/registration/${id}/edit`}
			className="rounded-md border p-2 hover:bg-gray-100"
		>
			<PencilIcon className="w-5" />
		</Link>
	);
}

export function DeleteRegistration({ id }: { id: string }) {
	const deleteInvoiceWithId = DeleteRecipient.bind(null, id);
	return (
		<form action={deleteInvoiceWithId}>
			<button className="rounded-md border p-2 hover:bg-gray-100">
				<span className="sr-only">Delete</span>
				<TrashIcon className="w-5" />
			</button>
		</form>
	);
}

export function RemoveItem({ id, recipientsId }: { id: string, recipientsId: string }) {
	const deleteInvoiceWithId = DeleteItem.bind(null, id, recipientsId);
	return (
		<form action={deleteInvoiceWithId}>
			<button className="rounded-md border p-2 hover:bg-gray-100">
				<span className="sr-only">Delete</span>
				<TrashIcon className="w-5" />
			</button>
		</form>
	);
} 

export function ExportExcel() {
	return (
			<button className="rounded-md border p-2 hover:bg-gray-100" >
				<Link
					href="/dashboard/export"
					className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
				>
						<span className="hidden md:block">Export To Excel</span>{' '}
				</Link>
			</button>
	);
}

