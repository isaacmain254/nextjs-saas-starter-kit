"use client";

import { Check } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
// components
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

type Props = {};

// TODO: Replace price id with stripe price id
const pricingPlans = [
  {
    id: 1,
    title: "Starter",
    prices: [
      { id1: "29", monthly: '$29' },
      { id2: "290", yearly: '$290' },
    ],
    description: "Best option for personal use & for your next project.",
    features: [
      "Individual configuration",
      "No setup, or hidden fees",
      "Team size: 1 developer",
      "Premium support: 6 months",
      "Free updates: 6 months",
    ],
  },
  {
    id: 2,
    title: "Company",
    prices: [
      { id1: "99", monthly: '$99' },
      { id2: "990", yearly: '$990' },
    ],
    description: "Relevant for multiple users, extended & premium support.",
    features: [
      "Individual configuration",
      "No setup, or hidden fees",
      "Team size: 10 developers",
      "Premium support: 24 months",
      "Free updates: 24 months",
    ],
  },
  {
    id: 3,
    title: "Enterprise",
    prices: [
      { id1: "499", monthly: '$499' },
      { id2: "4990", yearly: '$4990' },
    ],
    description:
      "Best for large scale uses and extended redistribution rights.",
    features: [
      "Individual configuration",
      "No setup, or hidden fees",
      "Team size: 100+ developers",
      "Premium support: 36 months",
      "Free updates: 36 months",
    ],
  },
];

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const PricingTable = () => {
  const [yearly, setYearly] = useState(false);

  const handleCheckout = async (plan: any) => {
    const stripe = await stripePromise;
    console.log("plan", plan);
    const priceId = yearly ? plan.prices[1].id2 : plan.prices[0].id1;
    const productName = plan.title;

    // try {

    const response = await fetch("/api/create-checkout-sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ priceId, productName }),
    });
    const {sessionId} = await response.json();

    await stripe?.redirectToCheckout({ sessionId });
    // } catch (error) {
    //   console.error('Error:', error);
    // }
  };
  return (
      <section className="bg-white dark:bg-gray-900">
        <div className="px-4 mx-auto max-w-screen-xl lg:px-6">
          <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Choose the right plan for your business.
            </h2>
            <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
            Explore our flexible pricing options tailored to fit your time size and requirements.
            </p>
          </div>
          <div className="w-full flex justify-center gap-x-4 py-4">
            <span>Monthly</span>
            <Switch
              checked={yearly}
              onCheckedChange={() => setYearly(!yearly)}
            />
            <span>Yearly</span>
          </div>
          <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
            {/*  Pricing Card  */}
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white"
              >
                <h3 className="mb-4 text-2xl font-semibold">{plan.title}</h3>
                <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                  {plan.description}
                </p>
                <div className="flex justify-center items-baseline my-8">
                  {plan.prices.map((price, index) => (
                    <span key={index} className="mr-2 text-5xl font-extrabold">
                  {yearly ? price.yearly:  price.monthly}
                    </span>
                  ))}
                  <span className="text-gray-500 dark:text-gray-400">
                    /{yearly ? "year" : "month"}
                  </span>
                </div>
                <Button onClick={() => handleCheckout(plan)}>Buy now</Button>
                <ul role="list" className="mt-8 space-y-4 text-left">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <i className="text-green-500">
                        <Check size={18} />
                      </i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
              </div>
            ))}
          </div>
        </div>
      </section>
  );
};

export default PricingTable;
