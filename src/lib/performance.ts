/**
 * Performance monitoring utilities
 * Lightweight performance tracking without external dependencies
 */

export interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
}

/**
 * Measure Core Web Vitals
 */
export class PerformanceMonitor {
  private metrics: PerformanceMetrics = {};
  private observer?: PerformanceObserver;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeMetrics();
    }
  }

  private initializeMetrics() {
    // Measure TTFB
    this.measureTTFB();
    
    // Measure FCP and LCP
    this.measurePaintMetrics();
    
    // Measure CLS
    this.measureCLS();
    
    // Measure FID
    this.measureFID();
  }

  private measureTTFB() {
    const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navEntry) {
      this.metrics.ttfb = navEntry.responseStart - navEntry.fetchStart;
    }
  }

  private measurePaintMetrics() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            this.metrics.fcp = entry.startTime;
          } else if (entry.entryType === 'largest-contentful-paint') {
            this.metrics.lcp = entry.startTime;
          }
        }
      });

      observer.observe({ type: 'paint', buffered: true });
      observer.observe({ type: 'largest-contentful-paint', buffered: true });
    }
  }

  private measureCLS() {
    if ('PerformanceObserver' in window) {
      let clsValue = 0;
      const observer = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
            this.metrics.cls = clsValue;
          }
        }
      });

      observer.observe({ type: 'layout-shift', buffered: true });
    }
  }

  private measureFID() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          this.metrics.fid = entry.processingStart - entry.startTime;
          observer.disconnect();
        }
      });

      observer.observe({ type: 'first-input', buffered: true });
    }
  }

  /**
   * Get current performance metrics
   */
  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  /**
   * Log metrics to console (development only)
   */
  public logMetrics(): void {
    if (process.env.NODE_ENV === 'development') {
      console.group('🚀 Performance Metrics');
      console.table(this.metrics);
      console.groupEnd();
    }
  }

  /**
   * Send metrics to analytics service
   */
  public sendMetrics(endpoint: string = '/api/analytics'): void {
    if (Object.keys(this.metrics).length === 0) return;

    // Only send if we have meaningful data
    const hasValidMetrics = this.metrics.fcp && this.metrics.lcp;
    if (!hasValidMetrics) return;

    // Send to analytics endpoint (replace with your service)
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        metrics: this.metrics,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: Date.now(),
      }),
    }).catch(error => {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Failed to send metrics:', error);
      }
    });
  }
}

/**
 * Global performance monitor instance
 */
export const performanceMonitor = new PerformanceMonitor();

/**
 * Initialize performance monitoring
 */
export function initPerformanceMonitoring() {
  if (typeof window === 'undefined') return;

  // Log metrics after page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      performanceMonitor.logMetrics();
    }, 1000);
  });

  // Send metrics before page unload
  window.addEventListener('beforeunload', () => {
    performanceMonitor.sendMetrics();
  });
}

/**
 * Performance budget alerts
 */
export const PERFORMANCE_BUDGETS = {
  fcp: 1800, // First Contentful Paint should be < 1.8s
  lcp: 2500, // Largest Contentful Paint should be < 2.5s
  fid: 100,  // First Input Delay should be < 100ms
  cls: 0.1,  // Cumulative Layout Shift should be < 0.1
  ttfb: 800, // Time to First Byte should be < 800ms
} as const;

/**
 * Check if metrics meet performance budget
 */
export function checkPerformanceBudget(metrics: PerformanceMetrics): {
  passed: boolean;
  violations: string[];
} {
  const violations: string[] = [];

  Object.entries(PERFORMANCE_BUDGETS).forEach(([metric, budget]) => {
    const value = metrics[metric as keyof PerformanceMetrics];
    if (value !== undefined && value > budget) {
      violations.push(`${metric.toUpperCase()}: ${value.toFixed(2)} (budget: ${budget})`);
    }
  });

  return {
    passed: violations.length === 0,
    violations,
  };
}

/**
 * Resource timing analysis
 */
export function analyzeResourceTiming(): void {
  if (typeof window === 'undefined') return;

  const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
  const analysis = {
    totalResources: resources.length,
    slowestResource: null as PerformanceResourceTiming | null,
    largestResource: null as PerformanceResourceTiming | null,
    totalTransferSize: 0,
  };

  resources.forEach(resource => {
    // Find slowest resource
    if (!analysis.slowestResource || resource.duration > analysis.slowestResource.duration) {
      analysis.slowestResource = resource;
    }

    // Find largest resource
    if (resource.transferSize && (!analysis.largestResource || resource.transferSize > analysis.largestResource.transferSize)) {
      analysis.largestResource = resource;
    }

    // Calculate total transfer size
    analysis.totalTransferSize += resource.transferSize || 0;
  });

  if (process.env.NODE_ENV === 'development') {
    console.group('📊 Resource Analysis');
    console.log('Total Resources:', analysis.totalResources);
    console.log('Total Transfer Size:', `${(analysis.totalTransferSize / 1024).toFixed(2)} KB`);
    
    if (analysis.slowestResource) {
      console.log('Slowest Resource:', analysis.slowestResource.name, `(${analysis.slowestResource.duration.toFixed(2)}ms)`);
    }
    
    if (analysis.largestResource) {
      console.log('Largest Resource:', analysis.largestResource.name, `(${(analysis.largestResource.transferSize / 1024).toFixed(2)} KB)`);
    }
    
    console.groupEnd();
  }
}