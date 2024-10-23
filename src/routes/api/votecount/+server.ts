import type { Votos } from "$lib/misc";
import { db } from "$lib/server/db";

export async function POST() {
    return new Response(
        JSON.stringify(await new Promise(res => db.all(`SELECT * FROM votos`, (err: Error, rows: Votos[]) => {
            res(rows)
        })))
    , { status: 200 });
}