"use server";

import { dbConnect } from "@/lib/db";
import { User } from "@/models/userModel";
import { Resend } from "resend";
import { v4 as uuidv4 } from "uuid";
import { PasswordResetEmailTemplate } from "@/emails/password-reset-email-template";
import { baseUrl } from "@/app/constants";
// types
import { PrevStateProps } from "@/types";

const sendResetEmailWithResend = async (
  email: string,
  userFirstname: string,
  passwordResetLink: string
) => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const { data, error } = await resend.emails.send({
      // TODO: Update the from email address on Resend to match your domain
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: "Password reset instructions",
      react: PasswordResetEmailTemplate({ userFirstname, passwordResetLink }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
};

const sendPasswordResetEmail = async (
  prevState: PrevStateProps,
  formData: FormData
) => {
  const email = formData.get("email") as string;
  try {
    await dbConnect();
    // Find a user that matches the email
    const user = await User.findOne({ email });
    if (!user) {
      return { type: "ERROR", message: "Email does not exist" };
    }

    // Generate a unique token for password reset
    const passwordResetToken = uuidv4();
    const passwordResetLink = `${baseUrl}/reset-password/${passwordResetToken}`;

    // set the token and expiry date on mongoDB database
    user.passwordResetToken = passwordResetToken;
    user.passwordResetTokenExpires = Date.now() + 3600000;
    await user.save();

    // Send email reset link to the user
    sendResetEmailWithResend(email, user.firstName, passwordResetLink);
    return {
      type: "SUCCESS",
      message:
        "Password reset instructions sent to your email. Please check your email.",
    };
  } catch (error) {
    return { type: "ERROR", message: "Failed to send reset password email." };
  }
};

export { sendPasswordResetEmail };
