import { cookies } from "next/headers";
import type { DemoCredential } from "./types";

const SESSION_COOKIE = "screenbc-session";

const DEMO_CREDENTIALS: DemoCredential[] = [
  { username: "margaret.johnson", password: "demo1234", patientId: "PAT-001" },
  { username: "sarah.chen", password: "demo1234", patientId: "PAT-002" },
  { username: "robert.kim", password: "demo1234", patientId: "PAT-003" },
];

export function validateCredentials(
  username: string,
  password: string
): string | null {
  const match = DEMO_CREDENTIALS.find(
    (c) => c.username === username && c.password === password
  );
  return match ? match.patientId : null;
}

export async function createSession(patientId: string) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, patientId, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
}

export async function getSession(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value ?? null;
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
