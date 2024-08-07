import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { dbConnect } from "./lib/db";
import { User } from "./models/userModel";
import { verifyPassword } from "./lib/password-hash";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const email = credentials.email as string | null;
        const password = credentials.password as string | null;
        if (!email || !password) {
          throw new CredentialsSignin("Email and Password are required");
        }
        try {
          // connect to mongodb database
          await dbConnect();
          const user = await User.findOne({ email }).select("+password");

          if (!user) {
            throw new Error("Invalid email or password");
          }
          // compare the password with the hashed password
          const passwordMatch = await verifyPassword(password, user.password);
          if (!passwordMatch) {
            throw new Error("Password didn't match");
          }
          const userData = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            id: user._id,
          };

          return userData;
        } catch (err) {
          throw new Error("Something went wrong, please try again");
        }
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
});
