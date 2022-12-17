import pg from "pg";
var Client = pg.Client;
import dotenv from "dotenv";
dotenv.config();
var client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432
});
client.connect(function (err) {
    if (err)
        throw err;
    console.log("Connected!");
});
export default client;
//# sourceMappingURL=db.js.map