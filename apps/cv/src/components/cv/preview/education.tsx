import { WorldWireframe } from "@/components/spline/world-wireframe";
import { EducationSchemaValue } from "@/schemas/cv";
import {
  CalendarIcon,
  IoLink,
  IoLocation,
  IoSchool,
  PiCookingPot,
  Separator,
  Timeline,
  TimelineContent,
  TimelineDot,
  TimelineHeading,
  TimelineItem,
  TimelineLine,
} from "@packages/ui";
import { cn } from "@packages/utils";
import Link from "next/link";
import styles from "./styles.module.css";

export const EducationPreview = ({
  educations,
}: {
  educations?: EducationSchemaValue[];
}) => {
  return (
    <section
      className={cn(
        "relative w-full p-16 text-center shadow-xl ring-1 ring-black/5",
      )}
    >
      <h2 className="relative z-10 text-center text-3xl font-semibold text-white">
        EDUCATION
      </h2>

      <div className="relative z-10 m-10 flex items-center justify-center gap-6 text-center text-4xl font-medium text-white">
        <p>Let's see my </p>
        <p
          className={cn(
            " rounded-full bg-gradient-to-l from-amber-500 to-orange-500 px-4 py-2 text-black",
            styles.animate_pulse_30s,
          )}
        >
          education
        </p>
        <p>journey</p>
      </div>
      <div className="relative z-10 flex w-full items-center rounded-xl bg-[#070D27]/5 p-2 outline-1 outline-white backdrop-blur-sm">
        <Timeline positions="center" className=" w-full">
          {educations?.map((education, index) => {
            const status = education.active ? "default" : "done";
            const side = index % 2 === 0 ? "left" : "right";
            return (
              <TimelineItem status={status}>
                <TimelineHeading side={side} className="flex flex-col text-xl">
                  {education.name}
                  <span className="flex items-center gap-2 text-base font-normal text-muted-foreground">
                    <IoLocation className=" text-rose-500 opacity-50" />{" "}
                    {education.address}
                  </span>
                  <span className="flex items-center gap-2 text-base font-normal text-white">
                    <CalendarIcon className="text-emerald-500" />
                    {education.start.toLocaleString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}{" "}
                    -{" "}
                    {education.graduate !== undefined
                      ? education.graduate.toLocaleString("en-US", {
                          month: "short",
                          year: "numeric",
                        })
                      : "Present"}
                  </span>
                  <span className="flex items-center gap-2 text-base font-normal text-white">
                    <IoSchool className="text-blue-500" /> {education.major} -{" "}
                    {education.gpa} / {education.maxGPA} GPA
                  </span>
                  {education.document && (
                    <span className="flex items-center gap-2 text-base font-normal text-white">
                      <IoLink className="text-violet-500 opacity-50" />
                      <Link
                        href={education.document || ""}
                        className="text-muted-foreground underline underline-offset-4 hover:text-white"
                      >
                        Related Document
                      </Link>
                    </span>
                  )}
                </TimelineHeading>
                <TimelineDot status={status} />
                <TimelineLine done={!education.active} />
                <TimelineContent side={side} className="mt-2">
                  <Separator />
                  <ol className=" list-inside list-disc text-left">
                    <p className="flex items-center gap-2 text-white">
                      <span>
                        <PiCookingPot className="text-cyan-500" />
                      </span>
                      My Activities :
                    </p>
                    {education.activities.map((activity) => {
                      return <li>{activity}</li>;
                    })}
                  </ol>

                </TimelineContent>
              </TimelineItem>
            );
          })}
        </Timeline>
      </div>
      <WorldWireframe />
    </section>
  );
};
