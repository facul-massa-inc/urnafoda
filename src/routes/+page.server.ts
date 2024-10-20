import type { Candidato } from '$lib/candidatos_types';
import { candidatos } from '$lib/server/candidatos';
import { db } from '$lib/server/db.js';
import { tokens } from '$lib/server/token';
import { redirect } from '@sveltejs/kit';

export interface MainPageData {
    candidatos: Candidato[],
    alreadyVoted: boolean
}

export async function load({ cookies }) {
    let token = cookies.get("token");
    let cpf = cookies.get("cpf");
    if(!token || !cpf || tokens[cpf] !== token) {
        return redirect(302, "/cadastro");
    }
    let jaVotouCpf = await new Promise(
        res => db.prepare(`SELECT cpf FROM ja_votou WHERE cpf=?`).get(cpf, (err, row) => res(row))
    );
    return <MainPageData>{ candidatos: candidatos, alreadyVoted: !!jaVotouCpf };
}