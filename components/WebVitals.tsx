'use client'

import { useReportWebVitals } from 'web-vitals'

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Send to Vercel Analytics (auto-collected) + console in dev
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[Web Vitals] ${metric.name}:`, metric.value.toFixed(1))
      return
    }

    // Optionally send to a custom endpoint:
    // const body = {
    //   name: metric.name,
    //   value: metric.value,
    //   id: metric.id,
    //   page: window.location.pathname,
    // }
    // navigator.sendBeacon('/api/vitals', JSON.stringify(body))
  })

  return null
}
