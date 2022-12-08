import pg from "pg";
const { Client } = pg;
//import { HOST, USER, PASSWORD, DB } from "../config/db_config.js";
import dotenv from "dotenv";
dotenv.config();

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'Nani1995',
  port: 5432
})
client.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
export default client;
