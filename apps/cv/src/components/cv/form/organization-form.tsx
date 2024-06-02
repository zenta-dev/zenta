"use client";

import { usePDF } from "@/provider/pdf-provider";
import {
  OrganizationFormSchema,
  OrganizationFormSchemaValue,
} from "@/schemas/cv";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Calendar,
  CalendarIcon,
  Card,
  CardContent,
  Checkbox,
  cn,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  PlusCircledIcon,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
  toast,
  useStepper,
} from "@packages/ui";
import { nullsToUndefined, useDebouncedCallback } from "@packages/utils";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";

const emptyOrganization = {
  name: "",
  role: "",
  address: "",
  description: "",
  start: new Date(),
  active: false,
  achievements: [""],
};

export const OrganizationForm = () => {
  const { isPending, isSuccess, isError, error, mutateAsync, reset } =
    api.cv.updateOrganization.useMutation();
  const { initialData, setCvValue } = usePDF();

  if (!initialData.id) {
    return <div>Missing CV ID. Please reopen from the dashboard.</div>;
  }

  const { organizations } = initialData;
  const form = useForm<OrganizationFormSchemaValue>({
    resolver: zodResolver(OrganizationFormSchema),
    mode: "onSubmit",
    defaultValues:
      organizations.length > 0
        ? {
            cvId: initialData.id,
            partial: organizations,
          }
        : {
            cvId: initialData.id,
          },
  });

  function handleSuccess() {
    toast.dismiss();
    toast.success("Organizations information updated successfully");
    reset();
    nextStep();
  }

  const debounced = useDebouncedCallback(() => {
    setCvValue({
      initialData: {
        ...initialData,
        organizations: nullsToUndefined(form.getValues().partial),
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
      toast.loading("Saving organization information...");
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

  const onSubmit = async (data: OrganizationFormSchemaValue) => {
    if (!initialData.id) {
      toast.error("Missing CV ID. Please reopen from the dashboard.");
      return;
    }
    const { cvId, ...rest } = data;
    const res = await mutateAsync({
      cvId: initialData.id,
      ...rest,
    });
    form.setValue("partial", nullsToUndefined(res.organizations));
    initialData.organizations = nullsToUndefined(res.organizations);
    if (res.organizations.length > 0) {
      handleSuccess();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <Card key={field.id} className="mt-4 pt-4">
            <CardContent>
              <div className="m-2 grid grid-cols-4 gap-4 sm:col-span-2 md:col-span-1">
                <FormField
                  control={form.control}
                  name={`partial.${index}.name`}
                  render={({ field }) => (
                    <FormItem className="col-span-2 w-full pb-4">
                      <FormLabel htmlFor={`partial.${index}.name`}>
                        Organization or Event Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your organization or event name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`partial.${index}.role`}
                  render={({ field }) => (
                    <FormItem className="col-span-2 w-full pb-4">
                      <FormLabel htmlFor={`partial.${index}.role`}>
                        Organization Role or Position
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your organization role or position"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name={`partial.${index}.address`}
                render={({ field }) => (
                  <FormItem className="m-2 pb-4">
                    <FormLabel htmlFor={`partial.${index}.address`}>
                      Organization or Event Location (City, Country)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your organization or event location"
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
                      Organization or Event Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your role or achievements"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="m-2 grid grid-cols-4 gap-4">
                <FormField
                  control={form.control}
                  name={`partial.${index}.start`}
                  render={({ field }) => (
                    <FormItem className="col-span-2 m-2 w-full pb-4 md:col-span-2">
                      <FormLabel htmlFor={`partial.${index}.start`}>
                        Start
                      </FormLabel>
                      <div className={cn("grid gap-2")}>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? (
                                field.value.toLocaleString("en-US", {
                                  month: "long",
                                  year: "numeric",
                                })
                              ) : (
                                <span>Select the month and year</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              initialFocus
                              mode="single"
                              selected={field.value}
                              onSelect={(date) => field.onChange(date)}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`partial.${index}.end`}
                  render={({ field }) => (
                    <FormItem className="col-span-2 m-2 w-full pb-4 md:col-span-2">
                      <FormLabel htmlFor={`partial.${index}.end`}>
                        End
                      </FormLabel>
                      <div className={cn("grid gap-2")}>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? (
                                field.value.toLocaleString("en-US", {
                                  month: "long",
                                  year: "numeric",
                                })
                              ) : (
                                <span>Select the month and year</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              initialFocus
                              mode="single"
                              selected={field.value}
                              onSelect={(date) => field.onChange(date)}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name={`partial.${index}.active`}
                render={({ field }) => (
                  <FormItem className="m-2 flex items-center gap-2 space-y-0 pb-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel
                      htmlFor={`partial.${index}.active`}
                      className="p-0 text-xs text-muted-foreground"
                    >
                      I am currently active here
                    </FormLabel>
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
              ...emptyOrganization,
            })
          }
        >
          Add Organization or Event
        </Button>
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
