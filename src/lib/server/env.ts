import { load } from "ts-dotenv";

export const env = load({
    ADMIN_USER: String,
    ADMIN_PASSWORD: String
});