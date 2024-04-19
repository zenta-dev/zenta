"use client";
import ImageUpload from "@/components/ImageUpload";
import { Button } from "@/components/ui/button";
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
import { RegisterForm, RegisterSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "sonner";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const form = useForm<RegisterForm>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      image: null,
    },
  });

  async function onSubmit(data: RegisterForm) {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await res.json();
    if (json.success) {
      setLoading(false);
      toast.success(json.message);
      window.location.href = "/auth/signin";
    } else {
      setLoading(false);
      toast.error(json.message);
    }
  }
  return (
    <main className="flex items-center justify-center h-screen">
      <Card className="w-96">
        <CardHeader className="space-y-1">
          <CardTitle>Register</CardTitle>
          <CardDescription>Sign up to access your account</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={field.name}>Photo</FormLabel>
                    <FormControl>
                      <div className="flex">
                        <ImageUpload
                          value={field.value}
                          onChange={field.onChange}
                          onRemove={field.onChange}
                          multiple={false}
                          maxFiles={1}
                          className="mx-auto"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={field.name}>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Input your name" {...field} />
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
              <p className="text-sm text-center">
                Already have an account?
                <Link href="/auth/signin">
                  <Button
                    variant="link"
                    className="text-blue-500"
                    type="button"
                  >
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
      </Card>
    </main>
  );
}
