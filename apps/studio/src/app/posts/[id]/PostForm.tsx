"use client";

import { env } from "@/env";
import { emptyToNull } from "@/helpers/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertModal,
  Button,
  cn,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Editor,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Heading,
  ImageUpload,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
  Textarea,
} from "@packages/ui";
import { Check, ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaTrash } from "react-icons/fa6";
import { toast } from "sonner";
import { PostFormProps, PostFormValue, PostSchema } from "./_schema";

export const PostForm: FC<PostFormProps> = ({ initialData, tags, techs }) => {
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
      cover: "",
      tags: [],
      techs: [],
      content: {},
    },
  });

  const useTagsFieldArray = useFieldArray({
    control: form.control,
    name: "tags",
  });
  const useTechsFieldArray = useFieldArray({
    control: form.control,
    name: "techs",
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
          router.push("/posts");
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
            router.push("/posts");
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
      router.push("/posts");
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
      <div className="5 flex items-center justify-between px-4 py-1">
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
          className="mx-auto w-[calc(40vw)] space-y-8 p-2"
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
          <Label>Tags</Label>
          <Separator />
          <section className="grid grid-cols-2 gap-2">
            {useTagsFieldArray.fields?.map((tag, index) => (
              <FormField
                control={form.control}
                name={`tags.${index}`}
                key={tag.id}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel htmlFor={`tags.${tag.id}.name`} className="p-0">
                      Tag {index + 1}
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "h-16 w-full justify-between",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            <div className="flex items-center gap-2">
                              {field.value && (
                                <Image
                                  src={
                                    tags.find((tags) => tags.id === field.value)
                                      ?.photo ||
                                    "https://via.placeholder.com/32"
                                  }
                                  alt={
                                    tags.find((tags) => tags.id === field.value)
                                      ?.name || "Tag"
                                  }
                                  className="h-8 w-8 rounded-full"
                                  width={32}
                                  height={32}
                                />
                              )}
                              <p className="truncate">
                                {field.value
                                  ? tags.find((tags) => tags.id === field.value)
                                      ?.name
                                  : "Select tags"}
                              </p>
                            </div>
                            <div className="flex items-center">
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => {
                                  useTagsFieldArray.remove(index);
                                }}
                              >
                                <FaTrash className="mr-1" />
                              </Button>
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </div>
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Search tag" />
                          <CommandList>
                            <CommandEmpty>No tags found</CommandEmpty>
                            <CommandGroup>
                              {tags.map((tag) => (
                                <CommandItem
                                  value={tag.name}
                                  key={tag.id}
                                  onSelect={() => {
                                    const tags = form.getValues("tags") || [];
                                    if (tags.includes(tag.id)) {
                                      toast.error("Tag already selected");
                                      return;
                                    } else {
                                      form.setValue(`tags.${index}`, tag.id);
                                    }
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      tag.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                  <div className="flex items-center gap-2">
                                    <Image
                                      src={
                                        tag.photo ||
                                        "https://via.placeholder.com/32"
                                      }
                                      alt={tag.name}
                                      className="h-8 w-8 rounded-full"
                                      width={32}
                                      height={32}
                                    />
                                    {tag.name}
                                  </div>
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
            ))}
            <div>
              <Label>&nbsp;</Label>
              <Button
                variant="outline"
                type="button"
                className="h-16 w-full"
                onClick={() => {
                  const tags = form.getValues("tags") || [];
                  const lastTag = tags[tags.length - 1];
                  if (tags.length === 0 || tags.length === null) {
                    useTagsFieldArray.append("");
                    return;
                  }
                  if (!lastTag || lastTag === "") {
                    toast.error("Please fill the previous tag");
                    return;
                  }
                  useTagsFieldArray.append("");
                }}
              >
                Add tag
              </Button>
            </div>
          </section>{" "}
          <Label className="m-0 p-0">Techs</Label>
          <Separator className="m-0 p-0" />
          <section className="grid grid-cols-2 gap-2">
            {useTechsFieldArray.fields?.map((tech, index) => (
              <FormField
                control={form.control}
                name={`techs.${index}`}
                key={tech.id}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel
                      htmlFor={`techs.${tech.id}.name`}
                      className="p-0"
                    >
                      Tech {index + 1}
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "h-16 w-full justify-between",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            <div className="flex items-center gap-2">
                              {field.value && (
                                <Image
                                  src={
                                    techs.find(
                                      (techs) => techs.id === field.value,
                                    )?.logo || "https://via.placeholder.com/32"
                                  }
                                  alt={
                                    techs.find(
                                      (techs) => techs.id === field.value,
                                    )?.name || "tech"
                                  }
                                  className="h-8 w-8 rounded-full"
                                  width={32}
                                  height={32}
                                />
                              )}
                              <p className="truncate">
                                {field.value
                                  ? techs.find(
                                      (techs) => techs.id === field.value,
                                    )?.name
                                  : "Select techs"}
                              </p>
                            </div>
                            <div className="flex items-center">
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => {
                                  useTechsFieldArray.remove(index);
                                }}
                              >
                                <FaTrash className="mr-1" />
                              </Button>
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </div>
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Search tech" />
                          <CommandList>
                            <CommandEmpty>No techs found</CommandEmpty>
                            <CommandGroup>
                              {techs.map((tech) => (
                                <CommandItem
                                  value={tech.name}
                                  key={tech.id}
                                  onSelect={() => {
                                    const techs = form.getValues("techs") || [];
                                    if (techs.includes(tech.id)) {
                                      toast.error("Tech already selected");
                                      return;
                                    } else {
                                      form.setValue(`techs.${index}`, tech.id);
                                    }
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      tech.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                  <div className="flex items-center gap-2">
                                    <Image
                                      src={tech.logo}
                                      alt={tech.name}
                                      className="h-8 w-8 rounded-full"
                                      width={32}
                                      height={32}
                                    />
                                    {tech.name}
                                  </div>
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
            ))}
            <div>
              <Label>&nbsp;</Label>
              <Button
                variant="outline"
                type="button"
                className="h-16 w-full"
                onClick={() => {
                  const techs = form.getValues("techs") || [];
                  const lasttech = techs[techs.length - 1];
                  if (techs.length === 0 || techs.length === null) {
                    useTechsFieldArray.append("");
                    return;
                  }
                  if (!lasttech || lasttech === "") {
                    toast.error("Please fill the previous tech");
                    return;
                  }
                  useTechsFieldArray.append("");
                }}
              >
                Add tech
              </Button>
            </div>
          </section>
          <Separator />
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
