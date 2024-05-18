"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  CardContent,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  toast,
} from "@packages/ui";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { signUpWithEmailAndPassword } from "./_actions";
import { RegisterSchema, RegisterSchemaType } from "./_schema";

export const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: RegisterSchemaType) {
    const res = await signUpWithEmailAndPassword({
      data,
      emailRedirectTo: `${location.origin}/auth/callback`,
    });

    const json = JSON.parse(res);

    if (json.success) {
      setLoading(false);
      const origin = localStorage.getItem("origin");
      toast.success(json.message);
      window.location.href = `/signin?origin=${origin}`;
    } else {
      setLoading(false);
      toast.error(json.message);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="flex flex-col gap-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Input your first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Input your last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Input your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Input your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className="text-center text-sm">
            Already have an account?
            <Link href={`/signin`}>
              <Button variant="link" className="text-blue-500" type="button">
                Sign in
              </Button>
            </Link>
          </p>
          <Button type="submit">
            {loading ? (
              <AiOutlineLoading3Quarters className=" animate-spin" />
            ) : (
              "Sign up"
            )}
          </Button>
        </CardContent>
      </form>
    </Form>
  );
};
