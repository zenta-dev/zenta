"use client";

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
      // remove cookies
      return new URL(
        process.env.NODE_ENV === "development"
          ? "http://zenta.local:3000/signin?origin=cv.zenta.dev"
          : "https://auth.zenta.dev/signin?origin=cv.zenta.dev",
      );
    default:
      return to;
  }
}

export default function RedirectPage({ params }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      // window.location.href = determineRedirectUrl(params.to).toString();
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
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
