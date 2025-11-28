import { headers } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

const PROTECTED_ROUTES = ['/dashboard', '/profile', '/settings', '/admin'];
const AUTH_ROUTES = ['/sign-in', '/sign-up', '/forgot-password'];

// Helper function to check if a path matches any pattern
function matchesRoute(pathname: string, routes: string[]): boolean {
  return routes.some((route) => pathname.startsWith(route));
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files, API routes, and public assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.') // Files with extensions
  ) {
    return NextResponse.next();
  }

  try {
    // Get session from Better Auth
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const isAuthenticated = !!session?.user;
    const isProtectedRoute = matchesRoute(pathname, PROTECTED_ROUTES);
    const isAuthRoute = matchesRoute(pathname, AUTH_ROUTES);

    // Redirect authenticated users away from auth pages
    if (isAuthenticated && isAuthRoute) {
      const callbackUrl = request.nextUrl.searchParams.get('callbackUrl');
      const redirectUrl = callbackUrl?.startsWith('/')
        ? callbackUrl
        : '/dashboard';

      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }

    // Redirect unauthenticated users from protected routes
    if (!isAuthenticated && isProtectedRoute) {
      const signInUrl = new URL('/sign-in', request.url);
      signInUrl.searchParams.set('callbackUrl', pathname);

      // Optional: Add a message to display on the sign-in page
      signInUrl.searchParams.set('message', 'Please sign in to continue');

      return NextResponse.redirect(signInUrl);
    }

    // Optional: Role-based access control
    if (isAuthenticated && pathname.startsWith('/admin')) {
      // Check if user has admin role
      // Note: Adjust based on your user schema
      // biome-ignore lint/suspicious/noExplicitAny: error
      const userRole = (session.user as any).role;

      if (userRole !== 'admin') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    }

    // Add security headers
    const response = NextResponse.next();

    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set(
      'Permissions-Policy',
      'camera=(), microphone=(), geolocation=()',
    );

    // Add session info to response headers (optional, for debugging)
    if (process.env.NODE_ENV === 'development' && isAuthenticated) {
      response.headers.set('X-User-Id', session.user.id);
    }

    return response;
  } catch (error) {
    console.error('Middleware error:', error);

    // On error, redirect to sign-in for protected routes
    // This ensures security even if session check fails
    if (matchesRoute(pathname, PROTECTED_ROUTES)) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, robots.txt, sitemap.xml
     * - Files with extensions (images, fonts, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*|api).*)',
  ],
};
