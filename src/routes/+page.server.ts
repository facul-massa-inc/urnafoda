import type { Candidato } from '$lib/candidatos_types';
import { candidatos } from '$lib/server/candidatos';
import { tokens } from '$lib/server/token';
import { redirect } from '@sveltejs/kit';

export interface MainPageData {
    candidatos: Candidato[]
}

export async function load({ cookies }) {
    let token = cookies.get("token");
    let cpf = cookies.get("cpf");
    if(!token || !cpf || tokens[cpf] !== token) {
        return redirect(302, "/cadastro");
    }
    return <MainPageData>{ candidatos: candidatos };
}