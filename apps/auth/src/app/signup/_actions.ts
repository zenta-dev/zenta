"use server";

import createSupabaseServerClient from "@/lib/supabase/server";
import { RegisterSchemaType } from "./_schema";

export async function signUpWithEmailAndPassword({
  data,
  emailRedirectTo,
}: {
  data: RegisterSchemaType;
  emailRedirectTo?: string;
}) {
  const supabase = await createSupabaseServerClient();
  const result = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      emailRedirectTo,
    },
  });
  return JSON.stringify(result);
}
