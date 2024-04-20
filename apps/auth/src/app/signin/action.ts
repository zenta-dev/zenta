"use server";

import { signIn } from "@packages/auth";
import { LoginForm } from "@packages/validators";

export async function signWithDiscord() {
  const res = await signIn("discord");
  return res;
}

export async function signWithCredentials(data: LoginForm) {
  return signIn("credentials", {
    redirect: false,
    email: data.email,
    password: data.password,
  });
}
