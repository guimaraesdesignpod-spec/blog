const DEFAULT_SITE_ORIGIN = 'https://blog-six-nu-33.vercel.app'

export const SITE_ORIGIN = (process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_ORIGIN).replace(/\/$/, '')