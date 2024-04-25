"use client";

import { handleSignIn } from "@/action/auth/signin";
import { useEffect } from "react";
import "./redirect.css";

type Props = {
  params: {
    to: string;
  };
};

function determineRedirectUrl(to: string) {
  switch (to) {
    case "auth":
      handleSignIn();
    default:
      return to;
  }
}

export default function RedirectPage({ params }: Props) {
  useEffect(() => {
    determineRedirectUrl(params.to);
  }, []);
  return (
    <>
      <div className="body">
        <span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </span>
        <div className="base">
          <span></span>
          <div className="face"></div>
        </div>
      </div>
      <div className="longfazers">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <h1>Redirecting</h1>
    </>
  );
}
