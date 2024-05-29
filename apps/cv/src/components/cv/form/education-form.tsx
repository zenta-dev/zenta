"use client";

import { usePDF } from "@/provider/pdf-provider";
import {
  EducationFormSchema,
  EducationFormSchemaValue,
} from "@/schemas/cv/index";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Calendar,
  CalendarIcon,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Separator,
  toast,
  TrashIcon,
  useStepper,
} from "@packages/ui";
import { nullsToUndefined, useDebouncedCallback } from "@packages/utils";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";

const EDUCATION_LEVELS = [
  { value: "certificate", label: "Certificate" },
  { value: "senior_high_school", label: "Senior High School" },
  { value: "associates_degree", label: "Associate's Degree" },
  { value: "diploma", label: "Diploma" },
  { value: "undergraduate", label: "Undergraduate" },
  { value: "bachelor", label: "Bachelor" },
  { value: "master", label: "Master" },
  { value: "professor", label: "Professor" },
] as const;

const emptyEducation = {
  name: "",
  address: "",
  level: "",
  major: "",
  gpa: 0,
  maxGPA: 0,
  start: new Date(),
  activities: [""],
  active: false,
};

export const EducationForm = () => {
  const { isPending, isSuccess, isError, error, mutateAsync, reset, data } =
    api.cv.updateEducations.useMutation();

  const { initialData, setCvValue } = usePDF();

  if (!initialData.id) {
    return <div>Missing CV ID. Please reopen from the dashboard.</div>;
  }

  const { educations } = initialData;
  const form = useForm<EducationFormSchemaValue>({
    resolver: zodResolver(EducationFormSchema),
    mode: "onSubmit",
    defaultValues:
      educations.length > 0
        ? {
            cvId: initialData.id,
            partial: educations,
          }
        : {
            cvId: initialData.id,
            partial: [emptyEducation],
          },
  });

  function handleSuccess() {
    toast.dismiss();
    toast.success("Educations information updated successfully");
    reset();
    nextStep();
  }

  const debounced = useDebouncedCallback(() => {
    setCvValue({
      initialData: {
        ...initialData,
        educations: nullsToUndefined(form.getValues().partial),
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
      toast.loading("Saving education information...");
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

  const onSubmit = async (data: EducationFormSchemaValue) => {
    if (!initialData.id) {
      toast.error("Missing CV ID. Please reopen from the dashboard.");
      return;
    }
    const { cvId, ...rest } = data;
    const res = await mutateAsync({
      cvId: initialData.id,
      ...rest,
    });
    form.setValue("partial", nullsToUndefined(res.educations));
    initialData.educations = nullsToUndefined(res.educations);
    if (res.educations.length > 0) {
      handleSuccess();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <Card key={field.id} className="mt-4">
            <CardContent>
              <CardHeader className="mt-4 flex flex-row items-center justify-between p-0">
                <CardTitle>Education {index + 1}</CardTitle>
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
                name={`partial.${index}.name`}
                render={({ field }) => (
                  <FormItem className="m-2 pb-4">
                    <FormLabel htmlFor={`partial.${index}.name`}>
                      School or University Name {index + 1}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your school or university name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`partial.${index}.address`}
                render={({ field }) => (
                  <FormItem className="m-2 pb-4">
                    <FormLabel htmlFor={`partial.${index}.address`}>
                      School or University Location (City, Country)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your school or university location"
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
                  name={`partial.${index}.level`}
                  render={({ field }) => (
                    <FormItem className="col-span-4 pb-4 sm:col-span-2 md:col-span-1">
                      <FormLabel htmlFor={`partial.${index}.level`}>
                        Education Level
                      </FormLabel>
                      <Select
                        onValueChange={(val) => {
                          field.onChange(val);
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select education level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>
                              Education Level {index + 1}
                            </SelectLabel>
                            {EDUCATION_LEVELS.map((level) => (
                              <SelectItem key={level.value} value={level.value}>
                                {level.label}
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
                  name={`partial.${index}.major`}
                  render={({ field }) => (
                    <FormItem className="pb-4">
                      <FormLabel htmlFor={`partial.${index}.major`}>
                        Major
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your major" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`partial.${index}.gpa`}
                  render={({ field }) => (
                    <FormItem className="pb-4">
                      <FormLabel htmlFor={`partial.${index}.gpa`}>
                        GPA
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter your GPA"
                          value={field.value}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`partial.${index}.maxGPA`}
                  render={({ field }) => (
                    <FormItem className="pb-4">
                      <FormLabel htmlFor={`partial.${index}.maxGPA`}>
                        Max GPA
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter your Max GPA"
                          value={field.value}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="m-2 grid grid-cols-4 gap-4 sm:col-span-2 md:col-span-1">
                <FormField
                  control={form.control}
                  name={`partial.${index}.start`}
                  render={({ field }) => (
                    <FormItem className="col-span-2 w-full pb-4">
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
                  name={`partial.${index}.graduate`}
                  render={({ field }) => (
                    <FormItem className="col-span-2 m-2 w-full pb-4">
                      <FormLabel htmlFor={`partial.${index}.graduate`}>
                        Graduation
                      </FormLabel>
                      <div className={cn("grid gap-2")}>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-center font-normal",
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

              <Card>
                <CardContent>
                  {field.activities.map((activity, activityIndex) => (
                    <FormField
                      key={activity + activityIndex}
                      control={form.control}
                      name={`partial.${index}.activities.${activityIndex}`}
                      render={({ field }) => (
                        <FormItem className="m-2 pb-4">
                          <FormLabel
                            htmlFor={`partial.${index}.activities.${activityIndex}`}
                          >
                            Activity {activityIndex + 1}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Describe your activity"
                              value={field.value}
                              onChange={field.onChange}
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
                      const prev = form.getValues().partial[index];
                      if (!prev) {
                        toast.error("Please fill the previous activity first");
                        return;
                      }
                      replace({
                        ...prev,
                        activities: [...prev.activities, ""],
                      });
                    }}
                  >
                    <PlusCircledIcon className="mr-2 h-4 w-4" />
                    Add Activity
                  </Button>
                </CardContent>
              </Card>
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
                      I am currently studying here
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`partial.${index}.document`}
                render={({ field }) => (
                  <FormItem className="m-2 pb-4">
                    <FormLabel htmlFor={`partial.${index}.document`}>
                      Supporting Document
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Add your document or sertificate URL"
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
          className="mt-4 w-full border-2 border-dashed border-blue-500"
          variant="outline"
          onClick={() =>
            append({
              ...emptyEducation,
            })
          }
        >
          Add Education
        </Button>{" "}
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
