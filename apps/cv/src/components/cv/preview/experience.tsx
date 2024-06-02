import { Cube } from "@/components/spline/cube";
import { ExperienceSchemaValue } from "@/schemas/cv";
import {
  CalendarIcon,
  IoLink,
  IoLocation,
  MdLaptop,
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

export const ExperiencePreview = ({
  experiences,
}: {
  experiences?: ExperienceSchemaValue[];
}) => {
  return (
    <section
      className={cn(
        "relative h-min w-full p-16 text-center shadow-xl ring-1 ring-black/5",
      )}
    >
      <h2 className="relative z-10 text-center text-3xl font-semibold text-white">
        PROFESSIONAL
      </h2>

      <div className="relative z-10 m-10 flex items-center justify-center gap-6 text-center text-4xl font-medium  ">
        <p>Take a look at my</p>
        <p
          className={cn(
            "rounded-full bg-gradient-to-l from-violet-500 to-blue-500 px-4 py-2 text-black",
            styles.animate_pulse_30s,
          )}
        >
          recent work
        </p>
        <p>experiences</p>
      </div>
      <div className="relative z-10 flex w-full items-center rounded-xl bg-[#070D27]/5 p-2 outline-1 outline-white backdrop-blur-xl">
        <Timeline positions="center" className=" w-full">
          {experiences?.map((experience, index) => {
            const status = experience.active ? "default" : "done";
            const side = index % 2 === 0 ? "left" : "right";
            return (
              <TimelineItem status={status}>
                <TimelineHeading side={side} className="flex flex-col text-xl">
                  {experience.name}
                  <span className="flex items-center gap-2 text-base font-normal text-muted-foreground">
                    <IoLocation className=" text-rose-500 opacity-50" />{" "}
                    {experience.address}
                  </span>
                  <span className="flex items-center gap-2 text-base font-normal text-white">
                    <CalendarIcon className="text-emerald-500" />
                    {experience.start.toLocaleString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}{" "}
                    -{" "}
                    {experience.end !== undefined
                      ? experience.end.toLocaleString("en-US", {
                          month: "short",
                          year: "numeric",
                        })
                      : "Present"}
                  </span>
                  <span className="flex items-center gap-2 text-base font-normal text-white">
                    <MdLaptop className="text-blue-500" /> {experience.role}
                  </span>
                  {experience.document && (
                    <span className="flex items-center gap-2 text-base font-normal text-white">
                      <IoLink className="text-violet-500 opacity-50" />
                      <Link
                        href={experience.document || ""}
                        className="text-muted-foreground underline underline-offset-4 hover:text-white"
                      >
                        Related Document
                      </Link>
                    </span>
                  )}
                </TimelineHeading>
                <TimelineDot status={status} />
                <TimelineLine done={!experience.active} />
                <TimelineContent side={side} className="mt-2">
                  <Separator />
                  <ol className="list-inside list-disc text-left">
                    <p className="flex items-center gap-2 text-white">
                      <span>
                        <PiCookingPot className="text-cyan-500" />
                      </span>
                      My Activities :
                    </p>
                    {experience.achievements.map((achievement) => {
                      return <li>{achievement}</li>;
                    })}
                  </ol>
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </Timeline>
      </div>
      <Cube />
    </section>
  );
};
