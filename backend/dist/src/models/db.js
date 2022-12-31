// import pg from "pg";
// const { Client } = pg;
import dotenv from "dotenv";
dotenv.config();
// const client = new Client({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: 5432
// })
// client.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });
// export default client;
import { createClient } from '@supabase/supabase-js';
var supabaseUrl = 'https://gzydevicrlzlwvldeuex.supabase.co';
var supabaseKey = process.env.SUPABASE_KEY;
var supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
//# sourceMappingURL=db.js.map