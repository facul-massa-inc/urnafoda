import { db } from "$lib/server/db";

db.run(`
	CREATE TABLE IF NOT EXISTS users (
		cpf VARCHAR(14) NOT NULL,
		password BINARY(32) NOT NULL,
		salt BINARY(16) NOT NULL,
		PRIMARY KEY (cpf)
	);
`)
