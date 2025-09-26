import { initPerformanceMonitoring, analyzeResourceTiming } from "../lib/performance.ts";

if (typeof window !== "undefined") {
  initPerformanceMonitoring();

  window.addEventListener("load", () => {
    setTimeout(analyzeResourceTiming, 2000);
  });
}
