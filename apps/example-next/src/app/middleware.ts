import { redish101AccessMiddleware } from "@redish101-access/nextjs"

export const middleware = redish101AccessMiddleware("http://localhost:3001")

export const config = {
    matcher: "/:path*"
}