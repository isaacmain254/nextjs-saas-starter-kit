import { Button } from "@/components/ui/button";
import Link from "next/link";
import Stripe from "stripe";

const Success = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-06-20",
  });
  // retrieve the session using the session_id fron search params
  const session = await stripe.checkout.sessions.retrieve(
    searchParams?.session_id as string,
    {
      expand: ["line_items.data.price.product"],
    }
  );
  // Map through line_items: Extract the product name and price from each line item.
  const lineItems = session.line_items?.data || [];
  const products = lineItems.map((item) => {
    const product = item.price?.product as Stripe.Product;
    const price = item.price?.unit_amount;
    return { name: product.name, price: price };
  });

  return (
    <div className="flex flex-col min-h-screen w-full max-w-screen-lg mx-auto justify-center items-center text-lg leading-8">
      <h1>Payment Successful</h1>
      <p>Thank you for your purchase!</p>
      <ul className="py-5">
        {products.map((product, index) => (
          <li key={index} className="text-xl font-medium">
            {product.name}: $
            {product.price ? (product.price / 100).toFixed(2) : "0.00"}
          </li>
        ))}
      </ul>
      <Button asChild>
        <Link className="" href="/">
          Back home
        </Link>
      </Button>
    </div>
  );
};

export default Success;
