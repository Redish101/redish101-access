import { verifyAccessToken } from "@/actions/token";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const accessToken = searchParams.get('accessToken')

    const isValid = await verifyAccessToken(accessToken as string)

    return new Response(isValid ? "true" : "false")
}