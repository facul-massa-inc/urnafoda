import { tokens } from '$lib/server/token.js';
import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
    let token = cookies.get("token");
    let cpf = cookies.get("cpf");
    if(!token || !cpf || tokens[cpf] !== token) {
        return redirect(302, "/cadastro")
    }
}