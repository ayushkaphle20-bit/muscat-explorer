import "server-only";
import { cookies } from "next/headers";
import crypto from "crypto";

const COOKIE_NAME = "me_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 8; // 8 hours

/**
 * Demo-grade auth: a single shared admin password (set ADMIN_PASSWORD in
 * .env.local) protects /admin and /api/admin/*. The session is a signed
 * token (HMAC of an expiry timestamp), stored in an httpOnly cookie.
 *
 * This is intentionally simple for a single-operator admin panel. Before
 * running this as a real multi-admin product, replace it with a proper
 * auth provider (NextAuth/Auth.js, Clerk, etc.) — see README "Admin auth".
 */

function getSecret(): string {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "muscat-explorer-dev-secret";
}

function sign(value: string): string {
  return crypto.createHmac("sha256", getSecret()).update(value).digest("hex");
}

export function createSessionToken(): string {
  const expires = Date.now() + SESSION_MAX_AGE * 1000;
  const payload = `${expires}`;
  const signature = sign(payload);
  return `${payload}.${signature}`;
}

function isValidToken(token: string | undefined): boolean {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  if (sign(payload) !== signature) return false;
  return Number(payload) > Date.now();
}

export function checkPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD || "changeme";
  return password === expected;
}

export async function getSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  return isValidToken(token);
}

export const SESSION_COOKIE_NAME = COOKIE_NAME;
export const SESSION_MAX_AGE_SECONDS = SESSION_MAX_AGE;
