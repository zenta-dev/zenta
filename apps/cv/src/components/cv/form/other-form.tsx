"use client";

import { usePDF } from "@/provider/pdf-provider";
import { OtherFormSchema, OtherFormSchemaValue } from "@/schemas/cv";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  PlusCircledIcon,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Separator,
  Textarea,
  toast,
  TrashIcon,
  useStepper,
} from "@packages/ui";
import { nullsToUndefined, useDebouncedCallback } from "@packages/utils";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";

const OTHER_CATEGORIES = [
  { value: "project", label: "Project" },
  { value: "bootcamp", label: "Bootcamp" },
  { value: "webinar", label: "Webinar" },
  { value: "achievements", label: "Achievements" },
  { value: "soft_skill", label: "Soft Skill" },
  { value: "hard_skill", label: "Hard Skill" },
] as const;

const emptyOther = {
  category: "",
  name: "",
  description: "",
  month: 0,
  year: 0,
  achievements: [""],
};

export const OtherForm = () => {
  const { isPending, isSuccess, isError, error, mutateAsync, reset } =
    api.cv.updateOther.useMutation();
  const { initialData, setCvValue } = usePDF();

  if (!initialData.id) {
    return <div>Missing CV ID. Please reopen from the dashboard.</div>;
  }

  const { others } = initialData;
  const form = useForm<OtherFormSchemaValue>({
    resolver: zodResolver(OtherFormSchema),
    mode: "onSubmit",
    defaultValues:
      others.length > 0
        ? {
            cvId: initialData.id,
            partial: others,
          }
        : {
            cvId: initialData.id,
          },
  });

  function handleSuccess() {
    toast.dismiss();
    toast.success("Others information updated successfully");
    reset();
    nextStep();
  }
  const debounced = useDebouncedCallback(() => {
    setCvValue({
      initialData: {
        ...initialData,
        others: nullsToUndefined(form.getValues().partial),
      },
    });
  }, 100);

  const { nextStep, prevStep } = useStepper();
  useEffect(() => {
    toast.dismiss();
    if (isSuccess) {
      handleSuccess();
    }
    if (isError) {
      toast.error(error?.message);
    }
    if (isPending) {
      toast.loading("Saving others information...");
      reset();
    }
    const sub = form.watch(() => {
      debounced();
    });
    return () => sub.unsubscribe();
  }, [isSuccess, isError, isPending, error, reset, form.watch]);

  const { fields, append, replace } = useFieldArray({
    control: form.control,
    name: "partial",
  });

  const onSubmit = async (data: OtherFormSchemaValue) => {
    if (!initialData.id) {
      toast.error("Missing CV ID. Please reopen from the dashboard.");
      return;
    }
    const { cvId, ...rest } = data;
    const res = await mutateAsync({
      cvId: initialData.id,
      ...rest,
    });
    form.setValue("partial", nullsToUndefined(res.others));
    initialData.others = nullsToUndefined(res.others);
    if (res.others.length > 0) {
      handleSuccess();
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <Card key={field.id} className="mt-4 pt-4">
            <CardContent>
            <CardHeader className="mt-4 flex flex-row items-center justify-between p-0">
                <CardTitle>Skills, Achievements & Other Experience {index + 1}</CardTitle>
                <Button
                  type="button"
                  size="icon"
                  variant="destructive"
                  onClick={() => {
                    replace([
                      ...fields.slice(0, index),
                      ...fields.slice(index + 1),
                    ]);
                  }}
                >
                  <TrashIcon className="  h-4 w-4" />
                </Button>
              </CardHeader>
            <Separator className="mt-2" />
              <FormField
                control={form.control}
                name={`partial.${index}.category`}
                render={({ field }) => (
                  <FormItem className="m-2 pb-4">
                    <FormLabel htmlFor={`partial.${index}.category`}>
                      Category
                    </FormLabel>
                    <Select onValueChange={(val) => field.onChange(val)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select the category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Category</SelectLabel>
                          {OTHER_CATEGORIES.map((category) => (
                            <SelectItem
                              key={category.value}
                              value={category.value}
                            >
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />


              <FormField
                control={form.control}
                name={`partial.${index}.name`}
                render={({ field }) => (
                  <FormItem className="m-2 pb-4">
                    <FormLabel htmlFor={`partial.${index}.name`}>
                      Skills, Achievements & Other Experience Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your skill, achievements, and other experience name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`partial.${index}.description`}
                render={({ field }) => (
                  <FormItem className="m-2 pb-4">
                    <FormLabel htmlFor={`partial.${index}.description`}>
                      Organizer Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the organizer that helds the event"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`partial.${index}.month`}
                render={({ field }) => (
                  <FormItem className="m-2 pb-4">
                    <FormLabel htmlFor={`partial.${index}.month`}>
                      Month
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter the month"
                        {...form.register(`partial.${index}.month`, {
                          valueAsNumber: true,
                        })}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`partial.${index}.year`}
                render={({ field }) => (
                  <FormItem className="m-2 pb-4">
                    <FormLabel htmlFor={`partial.${index}.year`}>
                      Year
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter the year"
                        {...form.register(`partial.${index}.year`, {
                          valueAsNumber: true,
                        })}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Card>
                <CardContent>
                  {field.achievements.map((achievement, achievementIndex) => (
                    <FormField
                      key={achievement + achievementIndex}
                      control={form.control}
                      name={`partial.${index}.achievements.${achievementIndex}`}
                      render={({ field }) => (
                        <FormItem className="m-2 pb-4">
                          <FormLabel
                            htmlFor={`partial.${index}.achievements.${achievementIndex}`}
                          >
                            Achievement {achievementIndex + 1}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Describe your achievement"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                  <Button
                    type="button"
                    className="m-2"
                    variant="outline"
                    onClick={() => {
                      const data = form.getValues().partial[index];
                      if (!data) return;

                      const { achievements, ...rest } = data;

                      replace([
                        ...fields.slice(0, index),
                        {
                          ...rest,
                          achievements: [...achievements, ""],
                        },
                        ...fields.slice(index + 1),
                      ]);
                      debounced();
                    }}
                  >
                    <PlusCircledIcon className="mr-2 h-4 w-4" />
                    Add Achievement
                  </Button>
                </CardContent>
              </Card>
              <FormField
                control={form.control}
                name={`partial.${index}.document`}
                render={({ field }) => (
                  <FormItem className="m-2 pb-4">
                    <FormLabel htmlFor={`partial.${index}.document`}>
                      Supporting Documents
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Add your documents or sertificate URL"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        ))}
        <Button
          type="button"
          className="mt-4 w-full border-2 border-dashed border-blue-500"
          variant="outline"
          onClick={() =>
            append({
              ...emptyOther,
            })
          }
        >
          Add Other
        </Button>
        {form.formState.errors.partial && (
          <FormMessage className="mt-4">
            {form.formState.errors.partial.message}
          </FormMessage>
        )}
        <div className="mt-4 flex justify-end gap-12">
          <Button
            disabled={isPending}
            variant={isPending ? "ghost" : "outline"}
            onClick={prevStep}
          >
            Back
          </Button>
          <Button
            disabled={isPending}
            type="submit"
            variant={isPending ? "ghost" : "default"}
          >
            Save & Continue
          </Button>
        </div>
      </form>
    </Form>
  );
};