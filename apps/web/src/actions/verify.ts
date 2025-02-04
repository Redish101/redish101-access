"use server"

import speakeasy from "speakeasy"
import { generateAccessToken } from "./token"

export default async function verifyToken(token: string) {
    const isValid = speakeasy.totp.verify({
        secret: process.env.SECRET as string,
        encoding: "base32",
        token: token,
    })

    if (!isValid) {
        return null
    }

    return generateAccessToken()
}