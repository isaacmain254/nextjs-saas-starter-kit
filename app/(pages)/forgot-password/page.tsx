"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
// actions
import { sendPasswordResetEmail } from "./password-reset-request-actions";
// components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormButton from "@/components/others/form-button";

const initialState = {
  type: '',
  message: ''
}
export default function PasswordResetRequestForm() {
  const [state, formAction] = useFormState(sendPasswordResetEmail, initialState)
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Forgot Password</CardTitle>
        <CardDescription>
          Enter your email below to receive your password reset instructions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="grid gap-4">
        {state?.type && (
            <div
              className={
                state?.type === "ERROR" ? "text-red-600" : "text-green-500"
              }
            >
              {state?.message}
            </div>
          )}
          <div className="grid gap-2">
            <Label htmlFor="email">Email:*</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="me@example.com"
              required
            />
          </div>
          <FormButton />
        </form>
        <div className="mt-4 text-center text-sm">
          Remembered your password?
          <Link href="sign-in" className="underline ">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
    </div>
  );
}
