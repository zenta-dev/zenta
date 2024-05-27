"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  cn,
  IoPerson,
  IoSchool,
  IoTrophy,
  MdWork,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@packages/ui";
import { useState } from "react";
import { EducationForm } from "./education-form";
import { OrganizationalForm } from "./organization-form";
import { OtherForm } from "./other-form";
import { PersonalForm } from "./personal-form";
import { ProfessionalForm } from "./professional-form";

     
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
