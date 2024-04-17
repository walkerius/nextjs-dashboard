

CREATE TABLE IF NOT EXISTS apartments (
	apartmentsid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
	name VARCHAR(255),
	address VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS recipients (
    recipientsid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    semester VARCHAR(255) NOT NULL,
	degree VARCHAR(255) NOT NULL,
	ismale BOOLEAN NOT NULL,
	phone VARCHAR(25) NOT NULL,
	email VARCHAR(255) NOT NULL,
	country VARCHAR(255) NOT NULL,
	apartmentid UUID REFERENCES apartments(apartmentsid),
	address VARCHAR(255),
	building VARCHAR(255),
	roomateid UUID REFERENCES recipients(recipientsid),
	roomateName VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS items (
	itemsid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
	islarge BOOLEAN NOT NULL,
	name VARCHAR(255) NOT NULL,
	recipientsid UUID REFERENCES recipients(recipientsid)
);