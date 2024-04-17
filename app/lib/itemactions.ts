'use server';

import { boolean, z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { UUID } from 'crypto';

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
	otherdegree: z.string().optional().nullable(),
	gender: z.enum(['male', 'female'], { invalid_type_error: 'Please select a gender.' }),
	phone: z.string(),
	email: z.string(),
	homecountry: z.string(),
	apartmentid: z.string().optional().nullable(),
	otherapartment: z.string(),
	building: z.string(),
	hasroommate: z.enum(['yes', 'no'], { invalid_type_error: 'Please select roommate option.' }),
	roommatename: z.string().optional()
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
		otherdegree: formData.get('otherdegree'),
		gender: formData.get('gender'),
		phone: formData.get('phone'),
		email: formData.get('email'),
		homecountry: formData.get('homecountry'),
		apartmentid: formData.get('apartmentid'),
		otherapartment: formData.get('otherapartment'),
		building: formData.get('building'),
		hasroommate: formData.get('roommate'),
		roommatename: formData.get('roommatename')
	});

	const isMale: boolean = rawData.gender == 'male';
	var semesterId: number = 0;
	var recipientsId: string = '';


	if (rawData.semester == 'spring') {
		semesterId = 1;
	}
	else if (rawData.semester == 'summer') {
		semesterId = 2;
	}
	else if (rawData.semester == 'fall') {
		semesterId = 3;
	}
	else if (rawData.semester == 'other') {
		semesterId = 4;
	}

	console.log(isMale);
	try {
		const result = await sql`
			INSERT INTO recipients (name, semester, degree, ismale, phone, email, country, apartmentid, address, building, roomatename)
			VALUES(${rawData.name}, ${rawData.semester}, ${rawData.degree}, ${isMale}, ${rawData.phone}, ${rawData.email}, ${rawData.homecountry}, ${rawData.apartmentid}, ${rawData.otherapartment}, ${rawData.building}, ${rawData.roommatename})
			RETURNING recipientsid;
			
		`;
		// Access the recipientsid of the inserted row
		recipientsId = result.rows[0].recipientsid;
		console.log('Inserted recipient ID:', recipientsId);
	}
	catch (error) {
		console.log(error);
		return { message: 'Database Error: failed to create Invoice.' }
	}
	revalidatePath('/dashboard/registration');
	redirect(`/dashboard/registration/${recipientsId}/edit`);
}

export async function updateRecipient(id: string, prevState: State, formData: FormData) {
	const rawData = CreateRecipient.parse({
		name: formData.get('name'),
		semester: formData.get('semester'),
		degree: formData.get('degree'),
		otherdegree: formData.get('otherdegree'),
		gender: formData.get('gender'),
		phone: formData.get('phone'),
		email: formData.get('email'),
		homecountry: formData.get('homecountry'),
		apartmentid: formData.get('apartmentid'),
		otherapartment: formData.get('otherapartment'),
		building: formData.get('building'),
		hasroommate: formData.get('roommate'),
		roommatename: formData.get('roommatename')
	});

	const isMale: boolean = rawData.gender == 'male';
	var semesterId: number = 0;
	var recipientsId: string = '';


	if (rawData.semester == 'spring') {
		semesterId = 1;
	}
	else if (rawData.semester == 'summer') {
		semesterId = 2;
	}
	else if (rawData.semester == 'fall') {
		semesterId = 3;
	}
	else if (rawData.semester == 'other') {
		semesterId = 4;
	}

	console.log(isMale);
	try {
		const result = await sql`
			INSERT INTO recipients (name, semester, degree, ismale, phone, email, country, apartmentid, address, building, roomatename)
			VALUES(${rawData.name}, ${rawData.semester}, ${rawData.degree}, ${isMale}, ${rawData.phone}, ${rawData.email}, ${rawData.homecountry}, ${rawData.apartmentid}, ${rawData.otherapartment}, ${rawData.building}, ${rawData.roommatename})
			RETURNING recipientsid;
			
		`;
		// Access the recipientsid of the inserted row
		recipientsId = result.rows[0].recipientsid;
		console.log('Inserted recipient ID:', recipientsId);
	}
	catch (error) {
		console.log(error);
		return { message: 'Database Error: failed to create Invoice.' }
	}
	revalidatePath('/dashboard/registration');
	redirect(`/dashboard/registration/${recipientsId}/edit`);
}
