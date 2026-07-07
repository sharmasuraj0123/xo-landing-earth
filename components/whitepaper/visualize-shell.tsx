"use client";

import dynamic from "next/dynamic";

/* The 3D instrument is heavy (three.js) and cannot render on the
   server, so it loads behind a dynamic client boundary. */
const QuirqVisualization = dynamic(
  () => import("./quirq-visualization").then((m) => m.QuirqVisualization),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="font-mono text-xs text-white/40 animate-pulse">
          Loading the instrument...
        </p>
      </div>
    ),
  },
);

export function VisualizeShell() {
  return <QuirqVisualization />;
}
