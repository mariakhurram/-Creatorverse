import { createClient } from '@supabase/supabase-js';
const URL ='https://klxjvixkgzybkxffwkwh.supabase.co';
const API_KEY ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtseGp2aXhrZ3p5Ymt4ZmZ3a3doIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwODM4MTgsImV4cCI6MjA3MTY1OTgxOH0.jrICY2i5CuM1JK8ZJHvnLcOdA0JRrlRHr3o2WKcMZQ4";
export const supabase = createClient(URL, API_KEY);
