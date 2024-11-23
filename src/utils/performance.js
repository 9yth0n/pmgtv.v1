// Performance monitoring utility
class PerformanceMonitor {
  constructor() {
    this.metrics = new Map();
    this.enabled = import.meta.env.VITE_PERFORMANCE_MONITORING === 'true';
    this.sampleRate = parseFloat(import.meta.env.VITE_PERFORMANCE_SAMPLE_RATE) || 0.1;
  }

  shouldSample() {
    return Math.random() < this.sampleRate;
  }

  startTimer(label) {
    if (!this.enabled || !this.shouldSample()) return;
    
    this.metrics.set(label, {
      startTime: performance.now(),
      measurements: [],
    });
  }

  endTimer(label) {
    if (!this.enabled || !this.metrics.has(label)) return;

    const metric = this.metrics.get(label);
    const duration = performance.now() - metric.startTime;
    metric.measurements.push(duration);

    // Calculate statistics
    const stats = this.calculateStats(metric.measurements);
    
    // Log performance data
    console.log(`Performance [${label}]:`, {
      lastDuration: duration.toFixed(2) + 'ms',
      average: stats.average.toFixed(2) + 'ms',
      min: stats.min.toFixed(2) + 'ms',
      max: stats.max.toFixed(2) + 'ms',
      p95: stats.p95.toFixed(2) + 'ms',
    });

    // Report to monitoring service if duration exceeds threshold
    if (duration > 1000) {
      this.reportPerformanceIssue(label, duration, stats);
    }
  }

  calculateStats(measurements) {
    const sorted = [...measurements].sort((a, b) => a - b);
    const sum = sorted.reduce((a, b) => a + b, 0);
    const p95Index = Math.floor(sorted.length * 0.95);

    return {
      average: sum / sorted.length,
      min: sorted[0],
      max: sorted[sorted.length - 1],
      p95: sorted[p95Index] || 0,
    };
  }

  reportPerformanceIssue(label, duration, stats) {
    // TODO: Implement reporting to your preferred monitoring service
    console.warn(`Performance issue detected [${label}]:`, {
      duration,
      stats,
      timestamp: new Date().toISOString(),
    });
  }

  // Memory usage monitoring
  checkMemoryUsage() {
    if (!this.enabled || !this.shouldSample()) return;

    if (window.performance && window.performance.memory) {
      const memory = window.performance.memory;
      console.log('Memory Usage:', {
        usedJSHeapSize: (memory.usedJSHeapSize / 1048576).toFixed(2) + 'MB',
        totalJSHeapSize: (memory.totalJSHeapSize / 1048576).toFixed(2) + 'MB',
        jsHeapSizeLimit: (memory.jsHeapSizeLimit / 1048576).toFixed(2) + 'MB',
      });
    }
  }

  // Resource timing monitoring
  monitorResourceTiming() {
    if (!this.enabled || !this.shouldSample()) return;

    const resources = window.performance.getEntriesByType('resource');
    const slowResources = resources.filter(resource => resource.duration > 1000);

    if (slowResources.length > 0) {
      console.warn('Slow resources detected:', slowResources.map(resource => ({
        name: resource.name,
        duration: resource.duration.toFixed(2) + 'ms',
        type: resource.initiatorType,
      })));
    }
  }

  // First Input Delay monitoring
  monitorFID() {
    if (!this.enabled) return;

    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        const delay = entry.processingStart - entry.startTime;
        console.log('First Input Delay:', delay.toFixed(2) + 'ms');
        
        if (delay > 100) {
          this.reportPerformanceIssue('FID', delay, { threshold: 100 });
        }
      }
    }).observe({ type: 'first-input', buffered: true });
  }

  // Largest Contentful Paint monitoring
  monitorLCP() {
    if (!this.enabled) return;

    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      
      console.log('Largest Contentful Paint:', lastEntry.startTime.toFixed(2) + 'ms');
      
      if (lastEntry.startTime > 2500) {
        this.reportPerformanceIssue('LCP', lastEntry.startTime, { threshold: 2500 });
      }
    }).observe({ type: 'largest-contentful-paint', buffered: true });
  }

  // Cumulative Layout Shift monitoring
  monitorCLS() {
    if (!this.enabled) return;

    let clsValue = 0;
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          console.log('Cumulative Layout Shift:', clsValue.toFixed(3));
          
          if (clsValue > 0.1) {
            this.reportPerformanceIssue('CLS', clsValue, { threshold: 0.1 });
          }
        }
      }
    }).observe({ type: 'layout-shift', buffered: true });
  }
}

export const performanceMonitor = new PerformanceMonitor();
