import type { Candidato } from "$lib/candidatos_types";
import type { Votos } from "$lib/misc";
import { candidatos } from "$lib/server/candidatos";
import { db } from "$lib/server/db";

export interface VotosPageData {
    votos: {
        [candidato: string]: number,
    },
    candidatos: Candidato[],
}

export async function load() {
    let votos: Votos[] = await new Promise(res => db.all(`SELECT * FROM votos`, (err: Error, rows: Votos[]) => {
        res(rows)
    }));
    let votosMap: { [candidato: string]: number } = {};
    for(let i = 0; i < votos.length; ++i) {
        votosMap[votos[i].candidato] = votos[i].votos;
    }
    return <VotosPageData>{ candidatos: candidatos, votos: votosMap }
}