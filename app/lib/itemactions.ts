'use server';

import { boolean, z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

const FormSchema = z.object({
	id: z.string(),
	isLarge: z.enum(['small', 'large'], { invalid_type_error: 'Please select an size.' }),
	name: z.string(),
	amount: z.coerce
		.number()
		.gt(0, { message: 'Please enter an amount greater than $0.' }),
	recipientId: z.string(),
});

const RecipientSchema = z.object({
	id: z.string(),
	name: z.string(),
	semester: z.string(),
	degree: z.string(),
	gender: z.enum(['male', 'female'], { invalid_type_error: 'Please select a gender.' })
});

const CreateItems = FormSchema.omit({ id: true, recipientId: true });
const CreateRecipient = RecipientSchema.omit({ id: true });

export type State = {
	errors?: {
		recipientId?: string[];
		amount?: string[];
		name?: string[];
		isLarge?: string[];
	};
	message?: string | null;
};

export async function createItems(formData: FormData) {
	const rawFormData = CreateItems.parse({
		isLarge: formData.get('isLarge'),
		name: formData.get('name'),
		amount: formData.get('amount')
	});
	const isLarge: boolean = rawFormData.isLarge == 'large';
	console.log(isLarge);
	if (isLarge) {
		console.log(isLarge);
		await sql`
			INSERT INTO items (isLarge, name)
			SELECT t.*
			FROM generate_series(1,${rawFormData.amount}) i
			CROSS JOIN Lateral (SELECT true, ${rawFormData.name}) t		
		`;
	}
	else {
		console.log('second');
		await sql`
			INSERT INTO items (isLarge, name)
			SELECT t.*
			FROM generate_series(1,${rawFormData.amount}) i
			CROSS JOIN Lateral (SELECT false, ${rawFormData.name}) t		
		`;
	}
}

export async function createRecipient(formData: FormData) {
	const rawData = CreateRecipient.parse({
		name: formData.get('name'),
		semester: formData.get('semester'),
		degree: formData.get('degree'),
		gender: formData.get('gender')
	});

	const isMale: boolean = rawData.gender == 'male';

	try {
		await sql`
			INSERT INTO recipients (name, semester, degree, ismale)
			VALUES(${rawData.name}, ${rawData.semester}, ${rawData.degree}, ${isMale})
		`;
	}
	catch (error) {
		return { message: 'Database Error: failed to create Invoice.' }
	}

	revalidatePath('/dashboard/registration');
	redirect('/dashboard/registration');
}