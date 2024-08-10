import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { auth } from "@/auth";
import { SignOut } from "./signout-button";

const Navbar = async () => {
  const session = await auth();
  return (
    <div className="flex w-full max-w-screen-2xl mx-auto justify-between px-5 py-3 items-center bg-slate-100">
      <div>
        <Link href="/">Logo</Link>
      </div>
      <nav>
        <ul className="flex gap-3">
          <li>
            <Link href="/pricing">pricing</Link>
          </li>
          <li>
            <Link href="/profile">profile</Link>
          </li>
        </ul>
      </nav>
      {session?.user ? (
        <SignOut />
      ) : (
        <div className="spacing-x-4">
          <Link href="/sign-in" className={buttonVariants({ variant: "link" })}>
            Login
          </Link>

          <Button asChild>
            <Link href="/sign-up">Sign Up</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
