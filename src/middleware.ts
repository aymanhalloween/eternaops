import { createMiddlewareClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Refresh session if expired - required for Server Components
  const { data: { session } } = await supabase.auth.getSession()

  // Protect dashboard routes
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  // Redirect to dashboard if already logged in and trying to access login
  if (req.nextUrl.pathname === '/login' && session) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return res
}

export const config = {
  matcher: ['/dashboard/:path*', '/login']
}