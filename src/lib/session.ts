import { cookies } from "next/headers";
import { SESSION_COOKIE, SESSION_MAX_AGE, decodeSession, encodeSession, type Session } from "./jwt";

export type { Plan, Session } from "./jwt";

export async function getSession(): Promise<Session | null> {
  const store = await cookies();
  return decodeSession(store.get(SESSION_COOKIE)?.value);
}

export async function setSession(session: Session) {
  const store = await cookies();
  store.set(SESSION_COOKIE, await encodeSession(session), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function clearSession() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}
