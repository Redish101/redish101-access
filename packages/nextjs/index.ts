import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'

export function redish101AccessMiddleware(serverUrl: string) {
    return async (request: NextRequest) => {
        const cookieStore = await cookies()
        const accessToken = cookieStore.get('accessToken')

        if (!accessToken) {
            return NextResponse.redirect(`${serverUrl}/?target=${request.nextUrl.pathname}`)
        }

        const res = await fetch(`${serverUrl}/api/verifyAccessToken?accessToken=${accessToken}`)
        const data = await res.json()

        if (!data.isValid) {
            return NextResponse.redirect(`${serverUrl}/?target=${request.nextUrl.pathname}`)
        }

        return NextResponse.next()
    }
}

