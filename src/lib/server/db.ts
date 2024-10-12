import * as crypto from "crypto"
import sqlite3 from "sqlite3";

export const db = new sqlite3.Database("db.sqlite");

export interface User {
    cpf: string,
    password: Buffer,
    salt: Buffer,
}

export async function handleUser(cpf: string, password: string) {
    let entry: User | null = await new Promise(resolve => db.get(`SELECT * FROM users WHERE cpf='${cpf}'`, (err, row) => {
        resolve(<User | null>row);
    }));
    if(entry) {
        let hashedPass = crypto.pbkdf2Sync(password, entry.salt, 1000, 32, "sha256");
        if(hashedPass.equals(entry.password)) return true;
        return false;
    }
    let salt = crypto.randomBytes(16);
    let hashedPass = crypto.pbkdf2Sync(password, salt, 1000, 32, "sha256");
    db.run(`INSERT INTO users (cpf, password, salt) VALUES ('${cpf}', X'${hashedPass.toString("hex")}', X'${salt.toString("hex")}')`);
    return true;
}