"use client";

import { CVSchemaValue } from "@/schemas/cv";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  IoPerson,
  IoSchool,
  IoTrophy,
  MdWork,
  Separator,
  Step,
  Stepper,
  useStepper,
} from "@packages/ui";
import { redirect, useRouter } from "next/navigation";
import { EducationForm } from "./education-form";
import { ExperienceForm } from "./experience-form";
import { OrganizationForm } from "./organization-form";
import { OtherForm } from "./other-form";
import { PersonalForm } from "./personal-form";

const STEPPER_ITEMS = [
  {
    id: "personal",
    label: "Personal",
    title: "Fill in Your Personal Details",
    desc: "Help recruiters to get in touch with you",
    icon: IoPerson,
  },
  {
    id: "education",
    label: "Education",
    title: "Education Level",
    desc: "Start with your most recent education",
    icon: IoSchool,
  },
  {
    id: "experience",
    label: "Work",
    title: "Work Experience",
    desc: "Start with your most recent (newest) experiences",
    icon: MdWork,
  },
  {
    id: "organizational",
    label: "Organizational",
    title: "Organizational Experience",
    desc: "Start with your most recent (newest) experiences",
    icon: IoPerson,
  },
  {
    id: "other",
    label: "Other",
    title: "Skills, Achievements & Other Experience",
    desc: "Add skills and achievements relevant to the job that you’re applying for",
    icon: IoTrophy,
  },
];

export const FormStepper = ({
  initialData,
}: {
  initialData?: CVSchemaValue;
}) => {
  if (!initialData) redirect("/dash");

  return (
    <div className="flex w-full flex-col gap-4">
      <Stepper variant="circle-alt" initialStep={0} steps={STEPPER_ITEMS}>
        {STEPPER_ITEMS.map((stepProps, index) => {
          if (index === 0) {
            return (
              <Step key={stepProps.label} {...stepProps}>
                <Card>
                  <CardHeader>
                    <CardTitle>{stepProps.title}</CardTitle>
                    <CardDescription>{stepProps.desc}</CardDescription>
                  </CardHeader>
                  <Separator className="mx-auto mb-4 w-[calc(100vw-8vw)]" />
                  <CardContent>
                    <PersonalForm initialData={initialData} />
                  </CardContent>
                </Card>
              </Step>
            );
          }
          if (index === 1) {
            return (
              <Step key={stepProps.label} {...stepProps}>
                <Card>
                  <CardHeader>
                    <CardTitle>{stepProps.title}</CardTitle>
                    <CardDescription>{stepProps.desc}</CardDescription>
                  </CardHeader>
                  <Separator className="mx-auto mb-4 w-[calc(100vw-8vw)]" />
                  <CardContent>
                    <EducationForm initialData={initialData} />
                  </CardContent>
                </Card>
              </Step>
            );
          }

          if (index === 2) {
            return (
              <Step key={stepProps.label} {...stepProps}>
                <Card>
                  <CardHeader>
                    <CardTitle>{stepProps.title}</CardTitle>
                    <CardDescription>{stepProps.desc}</CardDescription>
                  </CardHeader>
                  <Separator className="mx-auto mb-4 w-[calc(100vw-8vw)]" />
                  <CardContent>
                    <ExperienceForm initialData={initialData} />
                  </CardContent>
                </Card>
              </Step>
            );
          }

          if (index === 3) {
            return (
              <Step key={stepProps.label} {...stepProps}>
                <Card>
                  <CardHeader>
                    <CardTitle>{stepProps.title}</CardTitle>
                    <CardDescription>{stepProps.desc}</CardDescription>
                  </CardHeader>
                  <Separator className="mx-auto mb-4 w-[calc(100vw-8vw)]" />
                  <CardContent>
                    <OrganizationForm initialData={initialData} />
                  </CardContent>
                </Card>
              </Step>
            );
          }

          return (
            <Step key={stepProps.label} {...stepProps}>
              <Card>
                <CardHeader>
                  <CardTitle>{stepProps.title}</CardTitle>
                  <CardDescription>{stepProps.desc}</CardDescription>
                </CardHeader>
                <Separator className="mx-auto mb-4 w-[calc(100vw-8vw)]" />
                <CardContent>
                  <OtherForm initialData={initialData} />
                </CardContent>
              </Card>
            </Step>
          );
        })}
        <MyStepperFooter slug={initialData.slug} />
      </Stepper>
    </div>
  );
};

function MyStepperFooter({ slug }: { slug: string }) {
  const { activeStep, steps } = useStepper();
  const router = useRouter();

  if (activeStep !== steps.length) {
    return null;
  }

  return (
    <div className="flex items-center justify-end gap-2">
      <Button
        onClick={() => {
          router.push(`/p/${slug}`);
        }}
      >
        Preview
      </Button>
    </div>
  );
}
