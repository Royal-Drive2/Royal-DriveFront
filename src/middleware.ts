import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
});

export const config = {
  matcher: [
    // Exclure /api/, fichiers statiques, images
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
  ],
};