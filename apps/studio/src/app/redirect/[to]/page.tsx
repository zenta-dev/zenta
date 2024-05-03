"use client";

import { SupermanLoader } from "@packages/ui";
import { useEffect } from "react";

type Props = {
  params: {
    to: string;
  };
};

function determineRedirectUrl(to: string) {
  switch (to) {
    case "auth":
      return new URL(
        process.env.NODE_ENV === "development"
          ? "https://auth.zenta.local:3000/signin?callbackUri=studio.zenta.dev"
          : "https://auth.zenta.dev/signin?callbackUri=studio.zenta.dev",
      );
    default:
      return to;
  }
}

export default function RedirectPage({ params }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = determineRedirectUrl(params.to).toString();
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <main className="h-[calc(100vh-20vh)] w-screen">
      <SupermanLoader />
    </main>
  );
}
