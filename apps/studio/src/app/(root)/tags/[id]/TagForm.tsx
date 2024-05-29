"use client";

import { env } from "@/env";
import { emptyToNull } from "@/helpers/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertModal,
  Button,
  ColorPicker,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
import { TagFormProps, TagFormValue, TagSchema } from "./_schema";

export const TagForm: FC<TagFormProps> = ({ initialData }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const title = initialData ? `Edit ${initialData.name}` : "Create new tag";
  const description = initialData
    ? `You're editing ${initialData.name} with id ${initialData.id}.`
    : "Add a new tag";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<TagFormValue>({
    resolver: zodResolver(TagSchema),
    defaultValues: initialData || {},
  });

  const onSubmit = async (data: TagFormValue) => {
    try {
      setLoading(true);
      let res;
      if (initialData) {
        res = await fetch(`/api/tag/${initialData.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emptyToNull(data)),
        });
      } else {
        res = await fetch("/api/tag", {
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
          router.push("/tags");
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
    }
  };
  async function onDelete() {
    try {
      if (initialData) {
        setLoading(true);

        const res = await fetch(`/api/tag/${initialData.id}`, {
          method: "DELETE",
        });

        const json = await res.json();

        if (json.success) {
          toast.success(json.message, { duration: 3000 });

          router.refresh();
          setTimeout(() => {
            router.push("/tags");
          }, 1000);
        } else {
          if (json.redirect) {
            router.refresh();
            router.push("/auth/signin");
          } else {
            toast.error(json.message);
          }
        }
      } else {
        toast.error("No data to delete");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
      setOpen(false);
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
            name="photo"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="photo">Photo</FormLabel>
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
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormLabel htmlFor="color">Color</FormLabel>
                <FormControl>
                  <ColorPicker
                    value={field.value || "#000000"}
                    onChange={(color) => field.onChange(color)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
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
