import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://cbcuvtaupjwhdsxswice.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNiY3V2dGF1cGp3aGRzeHN3aWNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMwNTM4MDksImV4cCI6MjA5ODYyOTgwOX0.mziIJ44EP-6KRwKn3TufFtSBrSFz52gfMblZLGLI0ZE";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
