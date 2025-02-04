import { redish101AccessMiddleware } from "@redish101-access/nextjs"

export const middleware = redish101AccessMiddleware("http://localhost:3000")

export const config = {
    matcher: '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
}