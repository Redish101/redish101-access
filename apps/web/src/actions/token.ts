"use server"

import jwt from "jsonwebtoken"

export async function generateAccessToken() {
    const accessToken = jwt.sign({}, process.env.SECRET as string, {
        expiresIn: "7d",
        issuer: "Redish101 Access"
    })

    return accessToken
}

export async function verifyAccessToken(accessToken: string) {
    const isValid = jwt.verify(accessToken, process.env.SECRET as string, {
        issuer: "Redish101 Access"
    })

    return isValid
}
