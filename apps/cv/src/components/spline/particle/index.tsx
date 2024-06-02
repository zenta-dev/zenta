"use client";

import { ZentaLoader } from "@packages/ui";
import { Application } from "@splinetool/runtime";
import { lazy, Suspense, useState } from "react";
import styles from "./styles.module.css";

const Spline = lazy(() => import("@splinetool/react-spline"));

export function NebulaParticle() {
  const [isLoaded, setIsLoaded] = useState(false);
  function onLoad(spline: Application) {
    spline.setZoom(1.4);
    setIsLoaded(true);
  }

  return (
    <div className="absolute inset-0 z-0 h-screen bg-transparent">
      {!isLoaded && <ZentaLoader className="absolute inset-0 -z-50" />}
      <Suspense fallback={<ZentaLoader className="absolute inset-0 -z-50" />}>
        <Spline
          scene="/particle.splinecode"
          onLoad={onLoad}
          className={styles.nebula}
        />
      </Suspense>
      <div className="absolute bottom-0 left-0 right-0 z-10 h-64 bg-gradient-to-t from-[#0F0716] to-transparent" />
    </div>
  );
}
