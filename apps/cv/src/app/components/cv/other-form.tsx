"use client";

import {
    OtherSchema,
    OtherSchemaValue
} from "@/schemas/cv";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Button,
    Calendar,
    CalendarIcon,
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
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
    Textarea
} from "@packages/ui";
import { Other } from "@prisma/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { format } from "util";
    
export const OtherForm = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const form = useForm<Other>({
    resolver: zodResolver(OtherSchema),
    defaultValues: {
      category: "",
      name: "",
      description: "",
      month: 0,
      year: 0,
      achievements: [],
      document: "",
    },
  });

  const onSubmit = async (data: OtherSchemaValue) => {};
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormItem className="m-2 pb-4">
          <FormLabel htmlFor="category">Category</FormLabel>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select the category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                <SelectItem value="project">Project</SelectItem>
                <SelectItem value="bootcamp">Bootcamp</SelectItem>
                <SelectItem value="webinar">Webinar</SelectItem>
                <SelectItem value="achievements">Achievements</SelectItem>
                <SelectItem value="soft skill">Soft Skill</SelectItem>
                <SelectItem value="hard skill">Hard Skill</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </FormItem>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="m-2 pb-4">
              <FormLabel htmlFor="name">
                Skills, Achievements & Other Experience Name
              </FormLabel>
              <FormControl>
                <Input
                  id="name"
                  placeholder="Enter your skill, achievements, and other experience name"
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
              <FormLabel htmlFor="description">Organizer Description</FormLabel>
              <FormControl>
                <Textarea
                  id="description"
                  placeholder="Describe the organizer that helds the event"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormItem className="col-span-1 m-2 w-full pb-4">
          <FormLabel htmlFor="month">Month and Year</FormLabel>
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
                  {date ? format(date) : <span>Select the month and year</span>}
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

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="m-2 pb-4">
              <FormLabel htmlFor="description">
                Role or Achievements Description
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