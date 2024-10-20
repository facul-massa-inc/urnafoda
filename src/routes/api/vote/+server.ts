import { db } from '$lib/server/db.js';
import { tokens } from '$lib/server/token.js';
import { error } from '@sveltejs/kit';

export async function POST({ request, cookies }) {
    let token = cookies.get("token");
    let cpf = cookies.get("cpf");
    if(!token || !cpf || tokens[cpf] !== token) {
        return error(403, "Invalid token or cpf");
    }
    let jaVotouCpf = await new Promise(
        res => db.prepare(`SELECT cpf FROM ja_votou WHERE cpf=?`).get(cpf, (err, row) => res(row))
    );
    if(jaVotouCpf) {
        return error(403, "Already voted");
    }
    let candidato = await request.text();
    let candidatoVotos: {votos: string} | null = await new Promise(
        res => db.prepare(`SELECT votos from votos where candidato=?`)
            .get(candidato, (err, row) => res(<{votos: string} | null>row))
    );
    if(candidatoVotos) {
        db.prepare(`UPDATE votos SET votos=? WHERE candidato=?`).run(candidatoVotos.votos+1, candidato);
    }
    db.prepare(`INSERT INTO ja_votou (cpf) VALUES (?)`).run(cpf);
    return new Response(null, { status: 200 });
}