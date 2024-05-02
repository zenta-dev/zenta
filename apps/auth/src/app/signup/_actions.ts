"use server";

import { createAuthServer } from "@packages/supabase";
import { cookies } from "next/headers";
import { RegisterSchemaType } from "./_schema";

export async function signUpWithEmailAndPassword({
  data,
  emailRedirectTo,
}: {
  data: RegisterSchemaType;
  emailRedirectTo?: string;
}) {
  const sb = createAuthServer({ cookies: cookies() });
  const result = await sb.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      emailRedirectTo,
    },
  });
  return JSON.stringify(result);
}
