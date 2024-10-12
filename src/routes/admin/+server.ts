import { db } from "$lib/server/db"
import { env } from '$lib/server/env';
import { error } from "@sveltejs/kit";

export async function POST({ request }) {
    let auth = request.headers.get("Authorization");
    if(auth !== `Basic ${btoa(`${env.ADMIN_USER}:${env.ADMIN_PASSWORD}`)}`) {
        return error(400, "Not authorized");
    }
    let comand = await request.text();
    let res: string = await new Promise(resolve => db.all(comand, (err: Error, rows: unknown[]) =>
        resolve(JSON.stringify(err ?? rows))
    ));
    return new Response(res, { status: 200 });
}   