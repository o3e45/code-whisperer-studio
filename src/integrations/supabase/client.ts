// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://dfsilhgotwmyqmhtkmyh.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmc2lsaGdvdHdteXFtaHRrbXloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwMzQwNjcsImV4cCI6MjA1OTYxMDA2N30.WNbNe8DE8PYtqwfh9m3bww5Or9VQQJfekVaLErMwyfA";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);