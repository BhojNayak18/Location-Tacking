"use client";

import { useEffect } from "react";

export default function PwaRegistrar(): null {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;

    const register = async () => {
      try {
        await navigator.serviceWorker.register("/sw.js", { scope: "/" });
      } catch {
        // no-op
      }
    };

    // Register after page load to avoid blocking initial render
    if (document.readyState === "complete") {
      register();
    } else {
      window.addEventListener("load", register, { once: true });
    }

    return () => {
      window.removeEventListener("load", register as any);
    };
  }, []);

  return null;
}


