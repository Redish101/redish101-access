"use server"

import speakeasy from "speakeasy"

export default async function verifyToken(token: string) {
    const isValid = speakeasy.totp.verify({
        secret: process.env.SECRET as string,
        encoding: "base32",
        token: token,
    })

    return isValid
}