"use client";

import { Button } from "@packages/ui";
import Link from "next/link";

export const LoginButton = () => {
  const dev = process.env.NODE_ENV === "development";
  const authLogin = () => {
    if (dev) {
      return "https://zenta.local:3000/signin?origin=zenta.local:3002";
    } else {
      return "https://auth.zenta.dev/signin?origin=cv.zenta.dev";
    }
  };
  return (
    <Link href={authLogin()}>
      <Button type="button">Login</Button>
    </Link>
  );
};
