import { Window } from "@/components/spline/window";
import { OrganizationSchemaValue } from "@/schemas/cv";
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
import { cn, sanitizeGDriveURL } from "@packages/utils";
import Link from "next/link";
import styles from "./styles.module.css";

export const OrganizationPreview = ({
  organizations,
}: {
  organizations?: OrganizationSchemaValue[];
}) => {
  return (
    <section
      className={cn(
        "relative h-min w-full p-16 text-center shadow-xl ring-1 ring-black/5",
      )}
    >
      <h2 className="relative z-10 text-center text-3xl font-semibold text-white">
        ORGANIZATIONAL
      </h2>

      <div className="relative z-10 m-10 flex items-center justify-center gap-6 text-center text-4xl font-medium  ">
        <p>Showcasing all of my</p>
        <p
          className={cn(
            "rounded-full bg-gradient-to-l from-amber-500 to-orange-500 px-4 py-2 text-black",
            styles.animate_pulse_30s,
          )}
        >
          diverse contribution
        </p>
      </div>
      <div className="relative z-10 flex w-full items-center rounded-xl bg-[#070D27]/5 p-2 outline-1 outline-white backdrop-blur-xl">
        <Timeline positions="center" className=" w-full">
          {organizations?.map((organization, index) => {
            const status = organization.active ? "default" : "done";
            const side = index % 2 === 0 ? "left" : "right";
            return (
              <TimelineItem status={status}>
                <TimelineHeading side={side} className="flex flex-col text-xl">
                  {organization.name}
                  <span className="flex items-center gap-2 text-base font-normal text-muted-foreground">
                    <IoLocation className=" text-rose-500 opacity-50" />
                    {organization.address}
                  </span>
                  <span className="flex items-center gap-2 text-base font-normal text-white">
                    <CalendarIcon className="text-emerald-500" />
                    {organization.start.toLocaleString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                    -
                    {organization.end !== undefined
                      ? organization.end.toLocaleString("en-US", {
                          month: "short",
                          year: "numeric",
                        })
                      : "Present"}
                  </span>
                  <span className="flex items-center gap-2 text-base font-normal text-white">
                    <MdLaptop className="text-blue-500" /> {organization.role}
                  </span>
                </TimelineHeading>
                <TimelineDot status={status} />
                <TimelineLine done={!organization.active} />
                <TimelineContent side={side} className="mt-2">
                  <Separator className="my-2" />
                  <ol className="list-inside list-disc text-left">
                    <p className="flex items-center gap-2 text-white">
                      <span>
                        <PiCookingPot className="text-cyan-500" />
                      </span>
                      My Activities :
                    </p>
                    {organization.achievements.map((achievement) => {
                      return <li>{achievement}</li>;
                    })}
                  </ol>
                  <Separator className="my-2" />
                  {organization.document && (
                    <span className="my-2 flex items-center gap-2 text-base font-normal text-white">
                      <IoLink className="text-violet-500" />
                      <Link
                        href={organization.document || ""}
                        className="underline underline-offset-4 hover:text-white"
                      >
                        Related Document :
                      </Link>
                    </span>
                  )}
                  {organization.document && (
                    <iframe
                      src={sanitizeGDriveURL(organization.document)}
                      className="h-96 w-full"
                    />
                  )}
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </Timeline>
      </div>
      <Window />
    </section>
  );
};
