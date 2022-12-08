import { Client } from "pg";
import { HOST, USER, PASSWORD, DB } from "../config/db_config.js";
const client = new Client({
  user: USER,
  host: HOST,
  database: DB,
  password: PASSWORD,
  port: 5432
})
client.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
export default client;
