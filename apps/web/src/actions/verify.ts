"use server"

import speakeasy from "speakeasy"

export default async function verifyToken(token: string) {
    return speakeasy.totp.verify({
        secret: process.env.SECRET as string,
        encoding: "base32",
        token: token,
    })
}