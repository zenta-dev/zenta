"use server";

import { createAuthServer } from "@packages/supabase";
import { cookies } from "next/headers";
import { LoginSchemaType } from "./_schema";

export async function signInWithEmailAndPassword(data: LoginSchemaType) {
  const sb = createAuthServer({ cookies: cookies() });
  const result = await sb.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });
  return JSON.stringify(result);
}
