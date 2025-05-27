CREATE TABLE accounts (
	account_id SERIAL PRIMARY KEY,
	login VARCHAR(64),
	password VARCHAR(64),
	role VARCHAR(64)
);

CREATE TABLE users (
	user_id SERIAL PRIMARY KEY,
	account_id SERIAL REFERENCES accounts(account_id),
	first_name VARCHAR(64),
	patronymic VARCHAR(64),
	last_name VARCHAR(64),
	inn VARCHAR(12),
	passport_number VARCHAR(6),
	passport_series VARCHAR(4),
	date_of_birth DATE,
	citizenship VARCHAR(64),
	email VARCHAR(64)
);

CREATE TABLE services (
	service_id SERIAL PRIMARY KEY,
	name VARCHAR(64),
	result_description TEXT,
	service_description TEXT,
	start_date_of_validity DATE,
	end_date_of_validity DATE
);

CREATE TABLE rules (
	rule_id SERIAL PRIMARY KEY,
	service_id SERIAL REFERENCES services(service_id),
	description TEXT,
	period INTEGER
);

CREATE TABLE parameters (
    parameter_id SERIAL PRIMARY KEY,
    rule_id SERIAL REFERENCES rules(rule_id),
	group_number INTEGER DEFAULT 0,
	group_operator VARCHAR(4) DEFAULT 'AND',
    parameter VARCHAR(64),
    logical_operator VARCHAR(4) DEFAULT '=',
    parameter_value VARCHAR(64)
);

CREATE TABLE requests (
	request_id SERIAL PRIMARY KEY,
	user_id SERIAL REFERENCES users(user_id),
	civil_servant_id SERIAL REFERENCES accounts(account_id),
	service_id SERIAL REFERENCES services(service_id),
	status VARCHAR(64),
	result TEXT,
	planned_completion_date DATE,
	date_of_submission DATE,
	date_of_completion DATE
);