"use client";

import { usePDF } from "@/provider/pdf-provider";
import { PersonalFormSchema, PersonalFormValue } from "@/schemas/cv/index";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
  toast,
  useStepper,
} from "@packages/ui";
import { nullsToUndefined, useDebouncedCallback } from "@packages/utils";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export const PersonalForm = () => {
  const { isPending, isSuccess, isError, error, mutateAsync, reset } =
    api.cv.updatePersonal.useMutation();
  const { initialData, setCvValue } = usePDF();

  if (!initialData.id) {
    return <div>Missing CV ID. Please reopen from the dashboard.</div>;
  }

  const { personal } = initialData;
  const form = useForm<PersonalFormValue>({
    resolver: zodResolver(PersonalFormSchema),
    mode: "onSubmit",
    delayError: 200,
    defaultValues:
      personal === undefined
        ? {
            cvId: initialData.id,
            name: "",
            email: "",
            phone: "",
            linkedinUrl: "",
            portfolioUrl: "",
            address: "",
            description: "",
          }
        : {
            cvId: initialData.id,
            ...personal,
          },
  });

  function handleSuccess() {
    toast.dismiss();
    toast.success("Personal information updated successfully");
    reset();
    nextStep();
  }

  const debounced = useDebouncedCallback(() => {
    setCvValue({
      initialData: {
        ...initialData,
        personal: nullsToUndefined(form.getValues()),
      },
    });
  }, 100);

  const { nextStep } = useStepper();
  useEffect(() => {
    toast.dismiss();
    if (isSuccess) {
      handleSuccess();
    }
    if (isError) {
      toast.error(error?.message);
    }
    if (isPending) {
      toast.loading("Saving personal information...");
    }
    const sub = form.watch(() => {
      debounced();
    });
    return () => sub.unsubscribe();
  }, [isSuccess, isError, isPending, error, reset, form.watch]);

  const onSubmit = async (data: PersonalFormValue) => {
    if (!initialData.id) {
      toast.error("Missing CV ID. Please reopen from the dashboard.");
      return;
    }

    const { cvId, ...rest } = data;

    const res = await mutateAsync({
      cvId: initialData.id,
      ...rest,
    });
    form.setValue("name", res.personal?.name || "");
    form.setValue("email", res.personal?.email || "");
    form.setValue("phone", res.personal?.phone || "");
    form.setValue("linkedinUrl", res.personal?.linkedinUrl || "");
    form.setValue("portfolioUrl", res.personal?.portfolioUrl || "");
    form.setValue("address", res.personal?.address || "");
    form.setValue("description", res.personal?.description || "");
    initialData.personal = nullsToUndefined(res.personal);
    setCvValue({ initialData });
    if (res.personal) {
      handleSuccess();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="m-2 pb-4">
              <FormLabel htmlFor="name">Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage>
                {form.formState.errors.name && "Name is required"}
              </FormMessage>
            </FormItem>
          )}
        />
        <div className="m-2 grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="pb-4">
                <FormLabel htmlFor="phone">Phone Number (Mobile)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="linkedinUrl"
          render={({ field }) => (
            <FormItem className="m-2 pb-4">
              <FormLabel htmlFor="linkedinUrl">LinkedIn Profile URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your LinkedIn Profile URL"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="portfolioUrl"
          render={({ field }) => (
            <FormItem className="m-2 pb-4">
              <FormLabel htmlFor="portfolioUrl">
                Portfolio or Website URL (Optional)
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your portfolio or website URL"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="m-2 pb-4">
              <FormLabel htmlFor="address">Address (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Enter your address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="m-2 pb-4">
              <FormLabel htmlFor="description">
                Short Description About Yourself
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter short description about yourself"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-12">
          <Button variant={isPending ? "ghost" : "default"} type="submit">
            Save & Continue
          </Button>
        </div>
      </form>
    </Form>
  );
};
