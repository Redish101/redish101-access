import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'

export function redish101AccessMiddleware(serverUrl: string) {
    return async (request: NextRequest) => {
        const cookieStore = await cookies()
        const searchParams = request.nextUrl.searchParams
        const accessTokenInQuery = searchParams.get('accessToken')

        if (accessTokenInQuery) {
            cookieStore.set('accessToken', accessTokenInQuery)
        }

        const accessTokenInCookie = cookieStore.get('accessToken')

        if (!accessTokenInCookie) {
            return NextResponse.redirect(`${serverUrl}/?target=${request.nextUrl.toString()}`)
        }

        const res = await fetch(`${serverUrl}/api/verifyAccessToken?accessToken=${accessTokenInCookie.value}`)
        const data = await res.json()

        if (!data.isValid) {
            return NextResponse.redirect(`${serverUrl}/?target=${request.nextUrl.toString()}`)
        }

        return NextResponse.next()
    }
}
