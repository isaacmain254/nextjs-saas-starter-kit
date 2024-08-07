"use server";

import { dbConnect } from "@/lib/db";
import { User } from "@/models/userModel";
import { z } from "zod";
import { hashPassword } from "@/lib/password-hash";

import { signUpFormSchema } from "./signupSchema";
// types
import { ActionResponse } from "@/types";

type SignUpFormData = z.infer<typeof signUpFormSchema>;

const register = async (
  SignUpFormData: SignUpFormData
): Promise<ActionResponse> => {
  try {
    await dbConnect();
    // validate form data
    signUpFormSchema.parse(SignUpFormData);
    const email = SignUpFormData.email;
    //  Check  user already exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { type: "ERROR", message: "User already exist" };
    }

    // hash password
    const hashedPassword = await hashPassword(SignUpFormData.password);
    // save user to mongodb
    await User.create({
      firstName: SignUpFormData.firstName,
      lastName: SignUpFormData.lastName,
      email,
      password: hashedPassword,
    });

    return { type: "SUCCESS", message: "User created successfully" };
  } catch (error) {
    return { type: "ERROR", message: "Something went wrong please try again" };
  }
};

export { register };
