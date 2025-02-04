import { redish101AccessMiddleware } from "@redish101-access/nextjs"

const serverUrl =
    process.env.NODE_ENV === 'production'
        ? 'https://access.redish101.top'
        : 'http://localhost:3000'

export const middleware = redish101AccessMiddleware(serverUrl)

export const config = {
    matcher: '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
}