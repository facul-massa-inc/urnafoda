import { env } from '$lib/server/env';

export function handle({ event, resolve }) {
    if(event.url.pathname.startsWith("/admin")) {
        let auth = event.request.headers.get("Authorization");
        if(auth === `Basic ${btoa(`${env.ADMIN_USER}:${env.ADMIN_PASSWORD}`)}`) {
            return resolve(event);
        }
        return new Response("Not authorized", {
            status: 401,
            headers: {'WWW-Authenticate': 'Basic realm="User Visible Realm", charset="UTF-8"'}
        });
    }
    return resolve(event);
}