# NextJS SAAS Starter Kit

This is a Next.js SaaS Starter Kit with built-in authentication (using NextAuth), payment subscription handling (using Stripe), and email functionality (via Resend). This starter kit is designed to handle recurring payments and manage the entire authentication flow, including account creation, login, logout, and password resets.

## Getting Started

### 1. Clone the Repository

To get started, clone the repository to your local machine:

```bash
git clone https://github.com/isaacmain254/nextjs-saas-starter-kit
```
### 2. Set up Environment Variables

Create a **.env.local** file at the root of your project and add the following environment variables:

```
STRIPE_WEBHOOK_SECRET=""
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=""
STRIPE_SECRET_KEY=""
RESEND_API_KEY=""
MONGODB_URI=""
VERCEL_URL=""
```

Explanation of the Environment Variables:

- **STRIPE_WEBHOOK_SECRET:** This secret key is used for Stripe's webhook events, which notify your app about payment updates, subscription changes, and other events in your Stripe account. You can find this in your Stripe Dashboard under Webhooks.

- **NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:** This is your public Stripe API key. It’s safe to expose this key on the frontend, and it is used to create payment intents and handle client-side Stripe integrations.

- **STRIPE_SECRET_KEY:** This is your secret Stripe API key, which is used to interact with Stripe’s API on the server-side (e.g., for creating charges, managing subscriptions, etc.). Keep this secret and never expose it in your frontend code.

- **RESEND_API_KEY:** Resend is used for sending email notifications. Create an account on Resend to obtain your API key. You’ll use this to send welcome emails, password resets, etc.

- **MONGODB_URI:** The URI to your MongoDB database. This connects your app to a database to store user data, authentication details, subscriptions, etc. Ensure your MongoDB is properly set up, either locally or with a cloud service like MongoDB Atlas.

- **VERCEL_URL:** The URL of your deployed application on Vercel. This is useful in the email templates, particularly to insert your application's logo or dynamically build links. Make sure this is set to your Vercel app's URL.

### 3. Install Dependencies

```bash
pnpm install
```

### 4. Run the app

```bash
pnpm dev
```

### 5.Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
