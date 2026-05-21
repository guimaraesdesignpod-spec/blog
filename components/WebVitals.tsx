'use client'

import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals'

export function WebVitals() {
  const report = (metric: { name: string; value: number; id: string }) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[Web Vitals] ${metric.name}:`, metric.value.toFixed(1))
      return
    }

    // Optionally send to a custom endpoint:
    // const body = JSON.stringify({
    //   name: metric.name,
    //   value: metric.value,
    //   id: metric.id,
    //   page: window.location.pathname,
    // })
    // navigator.sendBeacon('/api/vitals', body)
  }

  onCLS(report)
  onFCP(report)
  onINP(report)
  onLCP(report)
  onTTFB(report)

  return null
}
