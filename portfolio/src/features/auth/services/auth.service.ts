import type { SignInPayload, SignUpPayload } from "../types/auth.type";

export async function signIn(_payload: SignInPayload) {
  return { ok: true } as const;
}

export async function signUp(_payload: SignUpPayload) {
  return { ok: true } as const;
}
