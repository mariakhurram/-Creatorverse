import { createClient } from '@supabase/supabase-js';
const URL ='https://witocjwvygvmaxyqexhv.supabase.co';
const API_KEY ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndpdG9jand2eWd2bWF4eXFleGh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4MjM2NzcsImV4cCI6MjA4NTM5OTY3N30.4desSMEWlYLDmtIkn--5_QtX2ORVFkkTQeJA6nIXVPI";
export const supabase = createClient(URL, API_KEY);
