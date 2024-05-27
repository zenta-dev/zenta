"use client";

import {
    PersonalSchema,
    PersonalSchemaValue
} from "@/schemas/cv";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Button,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    Input,
    Textarea
} from "@packages/ui";
import { useForm } from "react-hook-form";

export const PersonalForm = () => {
  const form = useForm<PersonalSchemaValue>({
    resolver: zodResolver(PersonalSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      linkedinUrl: "",
      portfolioUrl: "",
      address: "",
      description: "",
    },
  });

  const onSubmit = async (data: PersonalSchemaValue) => {};

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
                <Input id="name" placeholder="Enter your name" {...field} />
              </FormControl>
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
                  <Input
                    id="email"
                    placeholder="Enter your email address"
                    {...field}
                  />
                </FormControl>
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
                  <Input
                    id="phone"
                    placeholder="Enter your phone number"
                    {...field}
                  />
                </FormControl>
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
                  id="linkedinUrl"
                  placeholder="Enter your LinkedIn Profile URL"
                  {...field}
                />
              </FormControl>
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
                  id="portfolioUrl"
                  placeholder="Enter your portfolio or website URL"
                  {...field}
                />
              </FormControl>
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
                <Input
                  id="address"
                  placeholder="Enter your address"
                  {...field}
                />
              </FormControl>
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
                  id="description"
                  placeholder="Enter short description about yourself"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-12">
          <Button variant="outline">Cancel</Button>
          <Button>Save & Continue</Button>
        </div>
      </form>
    </Form>
  );
};