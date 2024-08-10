import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Cancel() {
  return (
    <div className="flex flex-col min-h-screen w-full max-w-screen-lg mx-auto justify-center items-center text-lg leading-8">
      <h1>Payment Canceled</h1>
      <p>The payment was canceled.</p>
      <Button asChild>
        <Link  href="/pricing">
          Back pricing
        </Link>
      </Button>
    </div>
  );
}
