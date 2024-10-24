import { handler } from "./handler.js";
import fs from "fs";
import https from "https";

const server = https.createServer({
    key: fs.readFileSync("./cert/key.pem"),
    cert: fs.readFileSync("./cert/cert.pem")
}, handler);

const port = process.env.PORT || 443;
server.listen(port, () => console.log(`Listening at port ${port}`));
