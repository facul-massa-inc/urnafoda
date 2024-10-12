import * as crypto from "crypto";

export let tokens: {[cpf: string]: string} = {};

export function getToken(cpf: string) {
    if(!tokens[cpf]) {
        tokens[cpf] = crypto.randomUUID();
    }
    return tokens[cpf];
}