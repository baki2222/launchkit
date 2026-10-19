// Session token encoding. Kept free of next/headers so middleware (edge) can import it.
import { SignJWT, jwtVerify } from "jose";

export type Plan = "free" | "pro" | "team";

export type Session = {
  email: string;
  name: string;
  plan: Plan;
  role: "admin" | "member";
};

export const SESSION_COOKIE = "lk_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function secret() {
  // A fixed fallback keeps the demo working without config; set AUTH_SECRET in production.
  return new TextEncoder().encode(process.env.AUTH_SECRET ?? "launchkit-dev-secret-change-me-in-production");
}

export async function encodeSession(session: Session): Promise<string> {
  return new SignJWT({ ...session })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(secret());
}

export async function decodeSession(token: string | undefined): Promise<Session | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    return {
      email: String(payload.email),
      name: String(payload.name),
      plan: (["free", "pro", "team"].includes(payload.plan as string) ? payload.plan : "free") as Plan,
      role: payload.role === "admin" ? "admin" : "member",
    };
  } catch {
    return null;
  }
}
