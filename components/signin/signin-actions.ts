"use server";

import { z } from "zod";
import { signInFormSchema } from "./signin-schema";
import { ActionResponse } from "@/types";
import { signIn } from "@/auth";

type LogInFormData = z.infer<typeof signInFormSchema>;

const login = async (LogInFormData: LogInFormData): Promise<ActionResponse> => {
  try {
    signInFormSchema.parse(LogInFormData);
    const email = LogInFormData.email;
    const password = LogInFormData.password;
    // signIn with credentials
    const result = await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });

    if (result.error) {
      return { type: "ERROR", message: `Log in failed: ${result.error}` };
    }

    return { type: "SUCCESS", message: "Logged in successfully" };
  } catch (error) {
    return {
      type: "ERROR",
      message: `Something went wrong please try again, ${
        (error as Error).message
      }`,
    };
  }
};

export { login };

// const login = async (formData: FormData) => {
//     const email = formData.get("email") as string;
//     const password = formData.get("password") as string;

//     try {
//       await signIn("credentials", {
//         redirect: false,
//         callbackUrl: "/",
//         email,
//         password,
//       });
//     } catch (error) {
//       const someError = error as CredentialsSignin;
//       return someError.cause;
//     }
//     redirect("/profile");
//   };
