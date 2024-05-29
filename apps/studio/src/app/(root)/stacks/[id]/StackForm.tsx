"use client";

import { env } from "@/env";
import { emptyToNull } from "@/helpers/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertModal,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Heading,
  ImageUpload,
  Input,
  Separator,
  Textarea,
} from "@packages/ui";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaTrash } from "react-icons/fa6";
import { toast } from "sonner";
import { StackFormProps, StackFormValue, StackSchema } from "./_schema";
import { FounderCard } from "./FounderCard";
import { VersionCard } from "./VersionCard";

export const StackForm: FC<StackFormProps> = ({ initialData }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const title = initialData ? `Edit ${initialData.name}` : "Create new stack";
  const description = initialData
    ? `You're editing ${initialData.name} with id ${initialData.id}.`
    : "Add a new stack";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<StackFormValue>({
    resolver: zodResolver(StackSchema),
    defaultValues: initialData || {},
  });

  const onSubmit = async (data: StackFormValue) => {
    try {
      setLoading(true);
      let res;
      if (initialData) {
        res = await fetch(`/api/stack/${initialData.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emptyToNull(data)),
        });
      } else {
        res = await fetch("/api/stack", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emptyToNull(data)),
        });
      }

      const json = await res.json();
      if (json.success) {
        toast.success(json.message);
        router.refresh();
        setTimeout(() => {
          router.push("/stacks");
        }, 1000);
      } else {
        if (json.redirect) {
          router.refresh();
          router.push("/auth/signin");
        }
        if (Array.isArray(json.errors)) {
          for (const key in json.errors) {
            const error = json.errors[key];

            toast.error(error.label, { description: error.message });
          }
        } else {
          toast.error(json.message);
        }
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  async function onDelete() {
    try {
      if (initialData) {
        setLoading(true);

        const res = await fetch(`/api/stack/${initialData.id}`, {
          method: "DELETE",
        });

        const json = await res.json();

        if (json.success) {
          toast.success(json.message, { duration: 3000 });

          router.refresh();
          setTimeout(() => {
            router.push("/stacks");
          }, 1000);
        } else {
          if (json.redirect) {
            router.refresh();
            router.push("/auth/signin");
          }
          toast.error(json.message);
        }
      } else {
        toast.error("No data to delete");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between px-4 py-1.5">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <FaTrash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto w-[calc(40vw)] space-y-8 p-2"
        >
          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="logo">Logo</FormLabel>
                <FormControl>
                  <ImageUpload
                    preset={env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                    value={field.value}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                    multiple={false}
                    maxFiles={1}
                  />
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
                <FormLabel htmlFor="name">Name</FormLabel>
                <FormControl>
                  <Input disabled={loading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="description">Description</FormLabel>
                <FormControl>
                  <Textarea disabled={loading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="url">Wiki Url</FormLabel>
                <FormControl>
                  <Input disabled={loading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="homepage"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="homepage">Home Page</FormLabel>
                <FormControl>
                  <Input disabled={loading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <FounderCard form={form} loading={loading} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <VersionCard form={form} loading={loading} />
          </div>
          <Button>
            {loading ? (
              <AiOutlineLoading3Quarters className=" animate-spin" />
            ) : (
              action
            )}
          </Button>
        </form>
      </Form>
    </>
  );
};
