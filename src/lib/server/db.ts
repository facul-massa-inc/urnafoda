import * as crypto from "crypto"
import sqlite3 from "sqlite3";
import { candidatos } from "./candidatos";

export const db = new sqlite3.Database("db.sqlite");

export interface User {
    cpf: string,
    password: Buffer,
    salt: Buffer,
}

export interface RowInfo {
    cid: number,
    name: string,
    type: string,
    notnull: number,
    dflt_value: string | null,
    pk: number
}

export function innitDb() {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            cpf VARCHAR(14) NOT NULL,
            password BINARY(32) NOT NULL,
            salt BINARY(16) NOT NULL,
            PRIMARY KEY (cpf)
        );
    `);
    db.run(`
        CREATE TABLE IF NOT EXISTS ja_votou (
            cpf VARCHAR(14) NOT NULL,
            FOREIGN KEY (cpf) REFERENCES users (cpf)
        );
    `);
    let nums = candidatos.map(c => c.number);
    db.run(`
        CREATE TABLE IF NOT EXISTS votos (
            candidato VARCHAR(4) NOT NULL, 
            votos INT NOT NULL,
            PRIMARY KEY (candidato)
        );
    `, (err) => {
        nums.forEach(n => db.prepare(`INSERT OR IGNORE INTO votos (candidato, votos) VALUES (?, ?)`).run(n, 0));
    });
}

export async function handleUser(cpf: string, password: string) {
    let entry: User | null = await new Promise(resolve => db.prepare(`SELECT * FROM users WHERE cpf=?`).get(cpf, (err, row) => {
        resolve(<User | null>row);
    }));
    if(entry) {
        let hashedPass = crypto.pbkdf2Sync(password, entry.salt, 1000, 32, "sha256");
        if(hashedPass.equals(entry.password)) return true;
        return false;
    }
    let salt = crypto.randomBytes(16);
    let hashedPass = crypto.pbkdf2Sync(password, salt, 1000, 32, "sha256");
    db.prepare(`INSERT INTO users (cpf, password, salt) VALUES (?, ?, ?)`)
        .run(cpf, hashedPass, salt);
    return true;
}