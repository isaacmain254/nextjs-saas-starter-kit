import { model, models, Schema } from "mongoose";

export interface UserDocument {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  authProviderId: string;
  image: String;
  passwordResetToken: string | null;
  passwordResetTokenExpires: Date | null;
}
const userSchema = new Schema<UserDocument>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    firstName: { type: String, required: [true, "First name is required"] },
    lastName: { type: String, required: [true, "Last name is required"] },
    password: { type: String, select: false },
    authProviderId: { type: String },
    image: { type: String },
    passwordResetToken: { type: String },
    passwordResetTokenExpires: { type: Date },
  },
  { timestamps: true }
);

export const User = models?.User || model<UserDocument>("User", userSchema);
