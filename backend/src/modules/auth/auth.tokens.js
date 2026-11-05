
import { createHash, randomBytes } from "node:crypto";
import { SignJWT } from "jose";
import { env } from "../../config/env.js";

const accessTokenSecret = new TextEncoder().encode(
    env.ACCESS_TOKEN_SECRET
);

export function hashToken(token) {
    return createHash("sha256")
        .update(token)
        .digest("hex");
}

export async function generateAccessToken(user) {
    return new SignJWT({
        email: user.email,
    })
        .setProtectedHeader({ alg: "HS256" })
        .setSubject(String(user.id))
        .setIssuer("flavoriz-api")
        .setAudience("flavoriz-web")
        .setIssuedAt()
        .setExpirationTime(env.ACCESS_TOKEN_EXPIRES_IN)
        .sign(accessTokenSecret);
}

export function generateRefreshToken() {
    return randomBytes(48).toString("base64url");
}
