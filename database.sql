-- database generated in postgreSQL

create table if not exists projects(
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	title varchar(100),
	description text,
	creation_date timestamp,
	url varchar(255),
	technologies varchar(255),
	image text
);

create table if not exists users(
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	name varchar(100),
	lastname varchar(100),
	document varchar(100)
);

create table if not exists tokens(
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	token text,
	creation_date timestamp,
	expiration_date timestamp
);