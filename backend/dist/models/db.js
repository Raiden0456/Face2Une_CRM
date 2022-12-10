import pg from "pg";
var Client = pg.Client;
import dotenv from "dotenv";
dotenv.config();
var client = new Client({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DB,
    password: process.env.PASSWORD,
    port: 5432
});
client.connect(function (err) {
    if (err)
        throw err;
    console.log("Connected!");
});
export default client;
//# sourceMappingURL=db.js.map