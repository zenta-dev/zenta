"use client";

import { handleSignIn } from "@/action/auth/signin";
import { Button } from "@packages/ui";

export const LoginButton = () => {
  return (
    <Button
      onClick={() => {
        handleSignIn();
      }}
    >
      SIGN IN
    </Button>
  );
};
