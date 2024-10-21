import { validateCpf } from "$lib/cpf";
import { handleUser } from "$lib/server/db";
import { getToken } from "$lib/server/token";
import { error, redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
    default: async (event) => {
        let data = await event.request.formData();
        let cpf = data.get("cpf")?.toString();
        let password = data.get("password")?.toString();
        if(!cpf || !password || !validateCpf(cpf)) {
            return error(400, "Invalid form data");
        }
        if(!await handleUser(cpf, password)) {
            return error(403, "Forbidden");
        }
        event.cookies.set("cpf", cpf, { path: "/", httpOnly: false, sameSite: "lax", secure: false });
        event.cookies.set("token", getToken(cpf), { path: "/", httpOnly: false, sameSite: "lax", secure: false });
        return redirect(302, "/");
    }
};