import * as crypto from "crypto";
import { db, type User } from "$lib/server/db";
import { error } from "@sveltejs/kit";

export interface ValidatePass {
    cpf: string,
    password: string
}

export async function POST({ request }) {
    let json: ValidatePass; 
    try {
        json = await request.json();
    }catch {
        return error(400);
    }
    let entry: User | null = await new Promise(resolve => db.prepare(`SELECT * FROM users WHERE cpf=?`).get(json.cpf, (err, row) => {
        resolve(<User | null>row);
    }));
    if(!entry) {
        return new Response("true", { status: 200 });
    }
    let hashedPass = crypto.pbkdf2Sync(json.password, entry.salt, 1000, 32, "sha256");
    if(hashedPass.equals(entry.password)) return new Response("true", { status: 200 });
    return new Response("false", { status: 200 });
}