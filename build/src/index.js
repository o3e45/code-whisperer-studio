import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createClient } from '@supabase/supabase-js';
const SUPABASE_URL = 'https://dfsilhgotwmyqmhtkmyh.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmc2lsaGdvdHdteXFtaHRrbXloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwMzQwNjcsImV4cCI6MjA1OTYxMDA2N30.WNbNe8DE8PYtqwfh9m3bww5Or9VQQJfekVaLErMwyfA';
const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
const server = new Server({
    name: 'supabase',
    version: '0.1.0',
});
server.setRequestHandler((request) => {
    // Handle requests
});
server.connect(new StdioServerTransport());
