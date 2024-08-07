import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);
// TODO: add production URL
export const baseUrl =
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "";
