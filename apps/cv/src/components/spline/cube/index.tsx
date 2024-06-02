"use client";

import { ZentaLoader } from "@packages/ui";
import { lazy, Suspense, useState } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

export function Cube() {
  const [isLoaded, setIsLoaded] = useState(false);
  function onLoad() {
    setIsLoaded(true);
  }

  return (
    <div className="absolute inset-0 z-0 h-full max-h-min w-full bg-transparent">
      {!isLoaded && <ZentaLoader className="absolute inset-0 -z-50" />}
      <Suspense fallback={<ZentaLoader className="absolute inset-0 -z-50" />}>
        <Spline
          scene="/cube.splinecode"
          onLoad={onLoad}
          className="mx-auto opacity-50"
        />
      </Suspense>
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#0F0716] to-transparent" />
      <div className="absolute left-0 right-0 top-0 h-64 bg-gradient-to-b from-[#0F0716] to-transparent" />
    </div>
  );
}
