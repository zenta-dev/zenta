"use client";

import {
    OrganizationSchema,
    OrganizationSchemaValue
} from "@/schemas/cv";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Button,
    Calendar,
    CalendarIcon,
    Checkbox,
    cn,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    Input,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Textarea
} from "@packages/ui";
import { Organization } from "@prisma/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { format } from "util";
   
export const OrganizationalForm = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const form = useForm<Organization>({
    resolver: zodResolver(OrganizationSchema),
    defaultValues: {
      name: "",
      address: "",
      description: "",
      start: new Date(),
      end: new Date(),
      active: false,
      achievements: [],
      document: "",
    },
  });

  const onSubmit = async (data: OrganizationSchemaValue) => {};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="m-2 grid grid-cols-4 gap-4 sm:col-span-2 md:col-span-1">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="col-span-2 w-full pb-4">
                <FormLabel htmlFor="name">Organization or Event Name</FormLabel>
                <FormControl>
                  <Input
                    id="name"
                    placeholder="Enter your organization or event name"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="col-span-2 w-full pb-4">
                <FormLabel htmlFor="role">
                  Organization Role or Position
                </FormLabel>
                <FormControl>
                  <Input
                    id="role"
                    placeholder="Enter your organization role or position"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="m-2 pb-4">
              <FormLabel htmlFor="address">
                Organization or Event Location (City, Country)
              </FormLabel>
              <FormControl>
                <Input
                  id="address"
                  placeholder="Enter your organization or event location"
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
                Organization or Event Description
              </FormLabel>
              <FormControl>
                <Textarea
                  id="description"
                  placeholder="Describe your role or achievements"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="m-2 grid grid-cols-4 gap-4">
          <FormItem className="justify-content: space-between col-span-2 w-full pb-4 md:col-span-2">
            <FormLabel htmlFor="start">Start</FormLabel>
            <div className={cn("grid gap-2")}>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? (
                      format(date)
                    ) : (
                      <span>Select the month and year</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </FormItem>

          <FormItem className="col-span-2 m-2 w-full pb-4 md:col-span-2">
            <FormLabel htmlFor="end">End</FormLabel>
            <div className={cn("grid gap-2")}>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? (
                      format(date)
                    ) : (
                      <span>Select the month and year</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </FormItem>
        </div>

        <FormField
          control={form.control}
          name="active"
          render={({ field }) => (
            <FormItem className="m-2 flex items-center gap-2 space-y-0 pb-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel
                htmlFor="active"
                className="p-0 text-xs text-muted-foreground"
              >
                I am currently active here
              </FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="achievements"
          render={({ field }) => (
            <FormItem className="m-2 pb-4">
              <FormLabel htmlFor="achievements">
                Role or Achievements Description
              </FormLabel>
              <FormControl>
                <Textarea
                  id="achievements"
                  placeholder="Describe your role or achievements in this organization"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="document"
          render={({ field }) => (
            <FormItem className="m-2 pb-4">
              <FormLabel htmlFor="document">Supporting Documents</FormLabel>
              <FormControl>
                <Input
                  id="document"
                  placeholder="Add your documents or sertificate URL"
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