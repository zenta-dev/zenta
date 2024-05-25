"use client";

import { format } from "util";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Calendar,
  CalendarIcon,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  cn,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
  IoPerson,
  IoSchool,
  IoTrophy,
  MdWork,
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
} from "@packages/ui";
import { Education, Experience, Organization, Other } from "@prisma/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  EducationSchema,
  EducationSchemaValue,
  ExperienceSchema,
  ExperienceSchemaValue,
  OrganizationSchema,
  OrganizationSchemaValue,
  OtherSchema,
  OtherSchemaValue,
  PersonalSchema,
  PersonalSchemaValue,
} from "../_schema";

const PersonalForm = () => {
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
const EducationForm = () => {
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
const ProfessionalForm = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const form = useForm<Experience>({
    resolver: zodResolver(ExperienceSchema),
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

  const onSubmit = async (data: ExperienceSchemaValue) => {};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="m-2 grid grid-cols-4 gap-4 sm:col-span-2 md:col-span-1">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="col-span-2 w-full pb-4">
                <FormLabel htmlFor="name">Company Name</FormLabel>
                <FormControl>
                  <Input
                    id="name"
                    placeholder="Enter your company name"
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
                <FormLabel htmlFor="role">Job Role or Position</FormLabel>
                <FormControl>
                  <Input
                    id="role"
                    placeholder="Enter your job role or position"
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
                Company Location (City, Country)
              </FormLabel>
              <FormControl>
                <Input
                  id="address"
                  placeholder="Enter your company location"
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
              <FormLabel htmlFor="description">Company Description</FormLabel>
              <FormControl>
                <Textarea
                  id="description"
                  placeholder="Describe your profile company"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

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

          <FormItem className="col-span-2 w-full pb-4">
            <FormLabel htmlFor="end">End</FormLabel>
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
                I am currently working here
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
                Work Portfolio or Achievements
              </FormLabel>
              <FormControl>
                <Textarea
                  id="achievements"
                  placeholder="Describe your activities and achievements in this role"
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
const OrganizationalForm = () => {
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
const OtherForm = () => {
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

const STEPPER_ITEMS = [
  {
    id: "personal",
    label: "Personal",
    title: "Fill in Your Personal Details",
    description: "Help recruiters to get in touch with you",
    icon: IoPerson,
    form: PersonalForm,
  },
  {
    id: "education",
    label: "Education",
    title: "Education Level",
    description: "Start with your most recent education",
    icon: IoSchool,
    form: EducationForm,
  },
  {
    id: "professional",
    label: "Professional",
    title: "Work Experience",
    description: "Start with your most recent (newest) experiences",
    icon: MdWork,
    form: ProfessionalForm,
  },
  {
    id: "organizational",
    label: "Organizational",
    title: "Organizational Experience",
    description: "Start with your most recent (newest) experiences",
    icon: IoPerson,
    form: OrganizationalForm,
  },
  {
    id: "other",
    label: "Other",
    title: "Skills, Achievements & Other Experience",
    description:
      "Add skills and achievements relevant to the job that you’re applying for",
    icon: IoTrophy,
    form: OtherForm,
  },
] as const;
export const FormStepper = () => {
  const [activeStep, setActiveStep] = useState("personal");
  const [activeStepNum, setActiveStepNum] = useState(0);
  return (
    <Tabs
      defaultValue={STEPPER_ITEMS[0].id}
      value={activeStep}
      onValueChange={(val) => setActiveStep(val)}
    >
      <TabsList className="flex items-center justify-between bg-background">
        {STEPPER_ITEMS.map((item, index) => (
          <div
            className={cn(
              "mx-auto flex h-24",
              index === STEPPER_ITEMS.length - 1 ? "w-min" : "w-full",
              index !== activeStepNum && "mt-0",
            )}
          >
            <TabsTrigger
              key={index}
              value={item.id}
              className={cn("flex items-start justify-start p-0")}
              asChild
            >
              <button
                key={index}
                className={cn("flex")}
                onClick={() => setActiveStepNum(index)}
              >
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "rounded-full p-2 transition-all duration-500 ease-in-out",
                      index > activeStepNum
                        ? "bg-neutral-300 bg-opacity-50"
                        : "bg-primary text-white",
                    )}
                  >
                    <item.icon className="text-3xl" />
                  </div>
                  <p
                    className={cn(
                      "mt-2 bg-background text-xs transition-all duration-500 ease-in-out",
                      index === activeStepNum && "px-2 pt-3",
                      index === activeStepNum
                        ? "text-primary"
                        : "text-foreground",
                    )}
                  >
                    {item.label}
                  </p>
                </div>
              </button>
            </TabsTrigger>
            {index !== STEPPER_ITEMS.length - 1 && (
              <div
                className={cn(
                  "mx-4 mt-6 h-1 w-full rounded transition-all duration-500 ease-in-out",
                  index > activeStepNum - 1 ? "bg-neutral-300" : "bg-[#4A4DB1]",
                )}
              />
            )}
          </div>
        ))}
      </TabsList>
      {STEPPER_ITEMS.map((item, index) => (
        <TabsContent key={index} value={item.id} className="mt-2">
          <Card>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <item.form />
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
};
