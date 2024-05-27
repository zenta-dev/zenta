"use client";

import {
    EducationSchema,
    EducationSchemaValue
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
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
    Textarea
} from "@packages/ui";
import { Education } from "@prisma/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { format } from "util";
 
export const EducationForm = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const form = useForm<Education>({
    resolver: zodResolver(EducationSchema),
    defaultValues: {
      name: "",
      address: "",
      level: "",
      major: "",
      gpa: 0,
      maxGPA: 0,
      start: new Date(),
      graduate: new Date(),
      activities: [],
      active: false,
      document: "",
    },
  });

  const onSubmit = async (data: EducationSchemaValue) => {};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="m-2 pb-4">
              <FormLabel htmlFor="name">School or University Name</FormLabel>
              <FormControl>
                <Input
                  id="name"
                  placeholder="Enter your school or university name"
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
              <FormLabel htmlFor="address">
                School or University Location (City, Country)
              </FormLabel>
              <FormControl>
                <Input
                  id="address"
                  placeholder="Enter your school or university location"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="m-2 grid grid-cols-4 gap-4">
          <FormItem className="col-span-4 pb-4 sm:col-span-2 md:col-span-1">
            <FormLabel htmlFor="level">Education Level</FormLabel>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select education level" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Education Level</SelectLabel>
                  <SelectItem value="certificate">Certificate</SelectItem>
                  <SelectItem value="senior high school">
                    Senior High School
                  </SelectItem>
                  <SelectItem value="associate's degree">
                    Associate’s Degree
                  </SelectItem>
                  <SelectItem value="diplomna">Diploma</SelectItem>
                  <SelectItem value="undergraduate">Undergraduate</SelectItem>
                  <SelectItem value="bachelor">Bachelor</SelectItem>
                  <SelectItem value="master">Master</SelectItem>
                  <SelectItem value="professor">Professor</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormItem>

          <FormField
            control={form.control}
            name="major"
            render={({ field }) => (
              <FormItem className="pb-4">
                <FormLabel htmlFor="major">Major</FormLabel>
                <FormControl>
                  <Input id="major" placeholder="Enter your major" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gpa"
            render={({ field }) => (
              <FormItem className="pb-4">
                <FormLabel htmlFor="gpa">GPA</FormLabel>
                <FormControl>
                  <Input id="gpa" placeholder="Enter your GPA" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maxGPA"
            render={({ field }) => (
              <FormItem className="pb-4">
                <FormLabel htmlFor="maxGPA">Max GPA</FormLabel>
                <FormControl>
                  <Input
                    id="maxGPA"
                    placeholder="Enter your Max GPA"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="m-2 grid grid-cols-4 gap-4 sm:col-span-2 md:col-span-1">
          <FormItem className="col-span-2 w-full pb-4">
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

          <FormItem className="col-span-2 m-2 w-full pb-4">
            <FormLabel htmlFor="graduate">Graduation</FormLabel>
            <div className={cn("grid gap-2")}>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-center font-normal",
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
          name="activities"
          render={({ field }) => (
            <FormItem className="m-2 pb-4">
              <FormLabel htmlFor="activities">
                Activities and Achievements
              </FormLabel>
              <FormControl>
                <Textarea
                  id="activities"
                  placeholder="Describe your activities and achievements"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

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
                I am currently studying here
              </FormLabel>
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