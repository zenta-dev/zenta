"use client";

import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertDialogCancel,
  AlertDialogFooter,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  toast,
} from "@packages/ui";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const CreateCVSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(3, "Title is too short"),
});

type CreateCVSchemaValue = z.infer<typeof CreateCVSchema>;

export const CreateCVForm = () => {
  const router = useRouter();
  const cvTRPC = api.cv.create.useMutation();
  const { isSuccess, isPending, isError, error } = cvTRPC;

  const form = useForm<CreateCVSchemaValue>({
    resolver: zodResolver(CreateCVSchema),
  });

  useEffect(() => {
    toast.dismiss();
    if (isSuccess) {
      toast.success("CV created successfully");
      router.push(`/dash/cv/${cvTRPC.data?.id}`);
    }
    if (isError) {
      toast.error(error.message || "Failed to create CV");
    }
    if (isPending) {
      toast.loading("Creating CV...");
    }
  }, [isSuccess, isPending, isError]);

  const handleCreate = async (data: CreateCVSchemaValue) => {
    const { title } = data;
    await cvTRPC.mutateAsync({
      title,
    });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleCreate)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel htmlFor="title">Title</FormLabel>

                <FormControl>
                  <Input
                    id="title"
                    placeholder="Enter valid title"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <AlertDialogFooter className="mt-6">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button type="submit">Create</Button>
          </AlertDialogFooter>
        </form>
      </Form>
    </>
  );
};
