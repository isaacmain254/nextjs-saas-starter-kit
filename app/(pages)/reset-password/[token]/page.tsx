"use client";

import { useState } from "react";
import Link from "next/link";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// actions
import { resetPassword } from "../password-reset-actions";
// components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/others/Spinner";
import { Button } from "@/components/ui/button";

import { passwordResetFormSchema } from "../password-reset-form-schema";

export default function PasswordResetForm({
  params,
}: {
  params: { token: string };
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { token } = params;

  const form = useForm<z.infer<typeof passwordResetFormSchema>>({
    resolver: zodResolver(passwordResetFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      token: token
    },
  });
  const onSubmit = async (values: z.infer<typeof passwordResetFormSchema>) => {
    setLoading(true);
    const response = await resetPassword(values);
        setLoading(false)
        if (response.type === 'ERROR'){
          toast.error(response.message)
        }else{
          toast.success(response.message)
          router.push("/sign-in")
        }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Password reset</CardTitle>
          <CardDescription>Please enter a new password.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            {/* TODO: This works fine.find a better way to send token to server action without using the hidden input */}
            <div className="hidden">
            <FormField 
                control={form.control}
                name="token"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Token:*</FormLabel>
                    <FormControl>
                      <Input
                         type="text"
                      
                         autoComplete="on"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password:*</FormLabel>
                    <FormControl>
                      <Input
                         type="password"
                         placeholder="********"
                         autoComplete="on"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
            <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password:*</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        autoComplete="on"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full">
            {loading ? <Spinner /> : 'Update'}
            </Button>
          </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Request new password reset link?
            <Link href="/forgot-password" className="underline ">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
