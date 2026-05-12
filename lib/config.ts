const DEFAULT_SITE_ORIGIN = 'https://brainwire-blog.vercel.app'

export const SITE_ORIGIN = (process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_ORIGIN).replace(/\/$/, '')