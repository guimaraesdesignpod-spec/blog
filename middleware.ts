import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const lang = pathname.startsWith('/pt') ? 'pt-BR' : 'en-US'
  
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-lang', lang)

  return NextResponse.next({
    request: { headers: requestHeaders }
  })
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|public|assets).*)'],
}
