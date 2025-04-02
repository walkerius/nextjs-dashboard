'use server';
import { boolean, z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';
const FormSchema = z.object({
	id: z.string(),
	isLarge: z.enum(['small', 'large'], { invalid_type_error: 'Please select an size.' }),
	name: z.string(),
	amount: z.coerce
		.number()
		.gt(0, { message: 'Please enter an amount greater than 0.' }),
	recipientId: z.string(),
});
// Define the Zod schema for an apartment
const ApartmentSchema = z.object({
	name: z.string().min(1, "Apartment name cannot be empty."),
	address: z.string().min(1, "Address cannot be empty."),
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
	roommatename: z.string().optional(),
	apartmentnumber: z.string(),
	married: z.enum(['yes', 'no'], { invalid_type_error: 'Please select married option.' }),
	address: z.string().optional().nullable()
});
const AssociateItemsSchema = z.object({
	largeItemId: z.string().optional().nullable(),
	smallItemId: z.string().optional().nullable(),
	recipientsId: z.string().optional().nullable(),
	notes: z.string().optional().nullable()
})
const CreateItems = FormSchema.omit({ id: true, recipientId: true });
const CreateApartment = ApartmentSchema;
const CreateRecipient = RecipientSchema.omit({ id: true });
const UpdateRecipient = RecipientSchema.omit({ id: true });
const CreateAssociateItems = AssociateItemsSchema;
export type State = {
	errors?: {
		recipientId?: string[];
		amount?: string[];
		name?: string[];
		isLarge?: string[];
	};
	message?: string | null;
};
export type ApartmentState = {
	errors?: {
		recipientId?: string[];
		apartment?: string[];
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
	redirect(`/dashboard`);
}
// Function to create an apartment using validated FormData
// Assuming this is in an API route or similar server-side context
export async function createApartment(formData: FormData) {
	const rawFormData = CreateApartment.parse({
		name: formData.get('name'),
		address: formData.get('address')
	});
	try {
		await sql`
		INSERT INTO apartments (name, address)
		VALUES(${rawFormData.name}, ${rawFormData.address})
			
	`;
	}
	catch (error) {
		console.log(error);
		return { message: 'Database Error: failed to create new apartment.' }
	}
	redirect(`/dashboard`);
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
		apartmentnumber: formData.get('apartmentnumber'),
		hasroommate: formData.get('roommate'),
		roommatename: formData.get('roommatename'),
		married: formData.get('married'),
		address: formData.get('address')
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
			INSERT INTO recipients (name, semester, degree, ismale, phone, email, country, apartmentid, address, building, roomatename, apartmentnumber, married, apartment)
			VALUES(${rawData.name}, ${rawData.semester}, ${rawData.degree}, ${isMale}, ${rawData.phone}, ${rawData.email}, ${rawData.homecountry}, ${rawData.apartmentid}, ${rawData.address}, ${rawData.building}, ${rawData.roommatename}, ${rawData.apartmentnumber}, ${rawData.married}, ${rawData.otherapartment})
			RETURNING recipientsid;			
		`;
		// Access the recipientsid of the inserted row
		recipientsId = result.rows[0].recipientsid;
		console.log('Inserted recipient ID:', recipientsId);
	}
	catch (error) {
		console.log(error);
		return { message: 'Database Error: failed to create Recipient.' }
	}
	redirect(`/dashboard/registration/${recipientsId}/edit`);
}
export async function updateRecipient(id: string, prevState: State, formData: FormData) {
	const rawData = UpdateRecipient.parse({
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
		roommatename: formData.get('roommatename'),
		married: formData.get('married')
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
			UPDATE recipients
			SET
				name = ${rawData.name},
				semester = ${rawData.semester},
				degree = ${rawData.degree},
				ismale = ${isMale},
				phone = ${rawData.phone},
				email = ${rawData.email},
				country = ${rawData.homecountry},
				apartmentid = ${rawData.apartmentid},
				address = ${rawData.otherapartment},
				building = ${rawData.building},
				roomatename = ${rawData.roommatename},
				married = ${rawData.married}
			WHERE recipientsid = ${id}
			
		`;
		console.log('updated recipient ID:', id);
	}
	catch (error) {
		console.log(error);
		return { message: 'Database Error: failed to create Invoice.' }
	}
	revalidatePath('/dashboard/registration');
	redirect(`/dashboard/registration/${id}/edit`);
}
export async function AssociateItemRecipient(formData: FormData) {
	const largeItemData = CreateAssociateItems.parse({
		smallItemId: formData.get('smallItemId') as string,
		largeItemId: formData.get('largeItemId') as string,
		recipientsId: formData.get('recipientsId') as string,
		notes: formData.get('notes') as string
	});

	try {
		console.log(largeItemData);
		if (largeItemData.largeItemId != '') {
			await sql`
				update items
				set recipientsid = ${largeItemData.recipientsId}
				WHERE itemsid = (
					SELECT itemsid
					FROM items
					WHERE items.recipientsid IS NULL AND ${largeItemData.largeItemId} = items.name
					ORDER BY itemsid
					LIMIT 1
				);
			`;
			;

			await sql`
				UPDATE recipients
				SET notes = ${largeItemData.notes}
				WHERE recipientsid = ${largeItemData.recipientsId}
			`;

			console.log('Items associated successfully with large item:', largeItemData.recipientsId);
		}

	} catch (error) {
		console.error('Failed to associate items:', error);
		throw new Error('Failed to associate items.');
	};

	try {
		if (largeItemData.smallItemId != '') {
			await sql`
				update items
				set recipientsid = ${largeItemData.recipientsId}
				WHERE itemsid = (
					SELECT itemsid
					FROM items
					WHERE items.recipientsid IS NULL AND ${largeItemData.smallItemId} = items.name
					ORDER BY itemsid
					LIMIT 1
				);			
		`;
			console.log('Items associated successfully with small item:', largeItemData.recipientsId);
		}
	} catch (error) {
		console.error('Failed to associate items:', error);
		throw new Error('Failed to associate items.');
	}

	redirect(`/dashboard/registration/${largeItemData.recipientsId}/edit`);
}

export async function addItems(formData: FormData) {
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

export async function DeleteRecipient(id: string) {

	console.log('deleting ' + id);
	try {
		await sql`
			UPDATE items set recipientsid = null WHERE recipientsid = ${id};
		`;

		await sql`
			DELETE FROM recipients
			WHERE recipientsid = ${id}
		`;
	}
	catch (error) {
		console.log('Database Error: failed to delete Invoice.' + error);
		return { message: 'Database Error: failed to delete Invoice.' }
	}

	revalidatePath('/dashboard/registration');
}

export async function DeleteApartment(id: string) {

	console.log('deleting ' + id);
	try {
		//await sql`
		//	UPDATE items set apartmentsId = null WHERE apartmentsId = ${id};
		//`;

		await sql`
			DELETE FROM apartments
			WHERE apartmentsId = ${id}
		`;
	}
	catch (error) {
		console.log('Database Error: failed to delete Invoice.' + error);
		return { message: 'Database Error: failed to delete Invoice.' }
	}

	revalidatePath('/dashboard');
}


export async function DeleteItem(id: string, recipientsId: string) {

	console.log('deleting ' + id);
	try {
		await sql`
			UPDATE items set recipientsid = null WHERE itemsid = ${id};
		`;
	}
	catch (error) {
		console.log('Database Error: failed to delete item.' + error);
		return { message: 'Database Error: failed to delete Invoice.' }
	}
	redirect(`/dashboard/registration/${recipientsId}/edit`);
}

export async function	ResetDatabase() {

	console.log('Resetting DB ');
	try {
		await sql`
			TRUNCATE items;
		`;

		await sql`
			TRUNCATE recipients;
		`;
	}
	catch (error) {
		console.log('Database Error: failed to reset db.' + error);
		return { message: 'Database Error: failed to reset db.' }
	}
	redirect(`/dashboard`);
}





