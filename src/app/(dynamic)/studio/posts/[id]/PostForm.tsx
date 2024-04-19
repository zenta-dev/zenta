"use client";
import { Heading } from "@/components";
import { AlertModal } from "@/components/client";
import { Editor } from "@/components/client/editor";
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
import { emptyToNull } from "@/lib/utils";
import { PostFormValue, PostSchema } from "@/schema";
import { PostFormProps } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaTrash } from "react-icons/fa6";
import { toast } from "sonner";

export const PostForm: FC<PostFormProps> = ({ initialData }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const title = initialData ? `Edit ${initialData.title}` : "Create new post";
  const description = initialData
    ? `You're editing ${initialData.title} with id ${initialData.id}.`
    : "Add a new post";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<PostFormValue>({
    resolver: zodResolver(PostSchema),
    defaultValues: initialData || {
      title: "",
      summary: "",
      content: {},
    },
  });

  const onSubmit = async (data: PostFormValue) => {
    try {
      setLoading(true);
      let res;
      if (initialData) {
        res = await fetch(`/api/post/${initialData.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emptyToNull(data)),
        });
      } else {
        res = await fetch("/api/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emptyToNull(data)),
        });
      }
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      const json = await res.json();
      if (json.success) {
        toast.success(json.message);
        router.refresh();
        setTimeout(() => {
          router.push("/studio/posts");
        }, 1000);
      } else {
        if (json.redirect) {
          router.refresh();
          router.push("/auth/signin");
        } else {
          toast.error(json.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again later");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  async function onDelete() {
    try {
      if (initialData) {
        setLoading(true);
        const res = await fetch(`/api/post/${initialData.id}`, {
          method: "DELETE",
        });

        const json = await res.json();
        if (json.success) {
          toast.success(json.message);
          router.refresh();
          setTimeout(() => {
            router.push("/studio/posts");
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
        toast.error("Post not found");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    } finally {
      setLoading(false);
      setOpen(false);
      router.push("/studio/posts");
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
      <div className="flex items-center justify-between py-1 5 px-4">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <FaTrash className="mr-1" />
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
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="title">Title</FormLabel>
                <FormControl>
                  <Input {...field} id="title" placeholder="Title" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cover"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="cover">Cover</FormLabel>
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
            name="summary"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="summary">Summary</FormLabel>
                <FormControl>
                  <Textarea {...field} id="summary" placeholder="Summary" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="content">Content</FormLabel>
                <FormControl>
                  <Editor
                    onChange={(content) => field.onChange(content)}
                    content={initialData?.content}
                    setWordCount={(count) => {
                      form.setValue("readTime", count);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button>
            {loading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              action
            )}
          </Button>
        </form>
      </Form>
    </>
  );
};
