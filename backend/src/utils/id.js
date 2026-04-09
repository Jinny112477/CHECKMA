import crypto from "crypto";

export function generateSessionId(length = 6) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const bytes = crypto.randomBytes(length);

  let id = "";
  for (let i = 0; i < length; i++) {
    id += chars[bytes[i] % chars.length];
  }

  return id;
}