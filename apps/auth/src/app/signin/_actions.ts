"use server";

import createSupabaseServerClient from "@/lib/supabase/server";
import { LoginSchemaType } from "./_schema";

export async function signInWithEmailAndPassword(data: LoginSchemaType) {
  const supabase = await createSupabaseServerClient();
  const result = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });
  return JSON.stringify(result);
}
