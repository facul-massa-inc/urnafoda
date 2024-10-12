
export function load({ request }) {
    const auth = request.headers.get("Authorization") ?? "";
    return { auth: auth };
}