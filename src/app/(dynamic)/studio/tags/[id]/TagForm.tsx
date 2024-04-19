"use client";
import { Heading } from "@/components";
import { AlertModal } from "@/components/client";
import ImageUpload from "@/components/ImageUpload";
import { Separator } from "@/components/separator";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { emptyToNull } from "@/lib/utils";
import { TagFormValue, TagSchema } from "@/schema";
import { TagFormProps } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaTrash } from "react-icons/fa6";
import { toast } from "sonner";

export const TagForm: FC<TagFormProps> = ({ initialData }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { setIsExpanded, setLimit } = useToast();

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
          router.push("/studio/tags");
        }, 1000);
      } else {
        if (json.redirect) {
          router.refresh();
          router.push("/auth/signin");
        }
        if (Array.isArray(json.errors)) {
          setIsExpanded(true);
          setLimit(json.errors.length);
          for (const key in json.errors) {
            const error = json.errors[key];
            console.log(error);
            toast.error(error.label, { description: error.message });
          }
          setIsExpanded(false);
          setLimit(3);
        } else {
          toast.error(json.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };
  async function onDelete() {
    try {
      if (initialData) {
        setLoading(true);
        console.log(initialData.id);
        const res = await fetch(`/api/tag/${initialData.id}`, {
          method: "DELETE",
        });

        console.log(res);

        const json = await res.json();

        if (json.success) {
          toast.success(json.message, { duration: 3000 });

          router.refresh();
          setTimeout(() => {
            router.push("/studio/tags");
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
      console.error(error);
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
      <div className="flex items-center justify-between py-1.5 px-4">
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
          className="space-y-8 p-2 w-[calc(40vw)] mx-auto"
        >
          <FormField
            control={form.control}
            name="photo"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="photo">Photo</FormLabel>
                <FormControl>
                  <ImageUpload
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
