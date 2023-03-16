// import pg from "pg";
// const { Client } = pg;
import dotenv from "dotenv";
dotenv.config();

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gzydevicrlzlwvldeuex.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const service_role_key = process.env.SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, service_role_key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })

  // Access auth admin api
const adminAuthClient = supabase.auth.admin
export default supabase;
