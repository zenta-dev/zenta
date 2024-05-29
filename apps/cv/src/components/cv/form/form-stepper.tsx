"use client";

import { usePDF } from "@/provider/pdf-provider";
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
import { useRouter } from "next/navigation";
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

export const FormStepper = () => {
  return (
    <div className="flex w-full flex-col gap-4">
      <Stepper
        variant="circle-alt"
        initialStep={0}
        steps={STEPPER_ITEMS}
        onClickStep={(step, setStep) => setStep(step)}
      >
        {STEPPER_ITEMS.map((stepProps, index) => {
          if (index === 0) {
            return (
              <Step key={stepProps.label} {...stepProps}>
                <Card>
                  <CardHeader>
                    <CardTitle>{stepProps.title}</CardTitle>
                    <CardDescription>{stepProps.desc}</CardDescription>
                  </CardHeader>
                  <Separator className="mx-auto mb-4 w-[calc(50vw-4vw)]" />
                  <CardContent>
                    <PersonalForm />
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
                  <Separator className="mx-auto mb-4 w-[calc(50vw-4vw)]" />
                  <CardContent>
                    <EducationForm />
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
                  <Separator className="mx-auto mb-4 w-[calc(50vw-4vw)]" />
                  <CardContent>
                    <ExperienceForm />
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
                  <Separator className="mx-auto mb-4 w-[calc(50vw-4vw)]" />
                  <CardContent>
                    <OrganizationForm />
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
                <Separator className="mx-auto mb-4 w-[calc(50vw-4vw)]" />
                <CardContent>
                  <OtherForm />
                </CardContent>
              </Card>
            </Step>
          );
        })}
        <StepperFooter />
      </Stepper>
    </div>
  );
};

function StepperFooter() {
  const { initialData } = usePDF();
  const { slug } = initialData;

  const { activeStep, steps } = useStepper();
  const router = useRouter();

  if (activeStep !== steps.length || !slug) {
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
