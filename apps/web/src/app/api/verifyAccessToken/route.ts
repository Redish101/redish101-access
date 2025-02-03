import { verifyAccessToken } from "@/actions/token";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const accessToken = searchParams.get('accessToken')

    try {
        const isValid = await verifyAccessToken(accessToken as string)

        return new Response(JSON.stringify({ isValid }))
    } catch (error) {
        return new Response(JSON.stringify({ isValid: false, error }))
    }
}