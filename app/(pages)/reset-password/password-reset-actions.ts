"use server";

import { dbConnect } from "@/lib/db";
import { hashPassword } from "@/lib/password-hash";
import { User } from "@/models/userModel";
import { ActionResponse } from "@/types";
import { z } from "zod";
import { passwordResetFormSchema } from "./password-reset-form-schema";

type ResetPasswordFormData = z.infer<typeof passwordResetFormSchema>;

const resetPassword = async (
  ResetPasswordFormData: ResetPasswordFormData
): Promise<ActionResponse> => {
  try {
    passwordResetFormSchema.parse(ResetPasswordFormData);
    // Validate if password and confirmPassword match
    if (
      ResetPasswordFormData.password !== ResetPasswordFormData.confirmPassword
    ) {
      return { type: "ERROR", message: "Password does not match" };
    }
    const token = ResetPasswordFormData.token;

    await dbConnect();
    // find a user that has the passwordResetToken
    const user = await User.findOne({ passwordResetToken: token });
    //  validate if the user exists and the token has not expired
    if (!user || user.passwordResetTokenExpires < new Date()) {
      return { type: "ERROR", message: "Invalid or expired token" };
    }
    // Hash the password and update the user's password
    const hashedPassword = await hashPassword(ResetPasswordFormData.password);
    user.password = hashedPassword;
    user.passwordResetToken = null;
    user.passwordResetTokenExpires = null;
    await user.save();

    return { type: "SUCCESS", message: "Password updated successfully" };
  } catch (error) {
    return {
      type: "ERROR",
      message: "An error occurred! Failed to update password.",
    };
  }
};

export { resetPassword };
