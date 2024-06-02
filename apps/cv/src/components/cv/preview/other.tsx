import { Creative } from "@/components/spline/creative";
import { OtherSchemaValue } from "@/schemas/cv";
import { CalendarIcon } from "@packages/ui";
import { cn, intMonthToString } from "@packages/utils";
import Image from "next/image";
import styles from "./styles.module.css";

export const OtherPreview = ({ others }: { others?: OtherSchemaValue[] }) => {
  return (
    <section
      className={cn(
        "relative flex h-full w-full flex-col items-center p-16 text-center shadow-xl ring-1 ring-black/5",
      )}
    >
      <div className="relative z-10 m-10 flex flex-col items-center justify-center gap-6 text-center text-4xl font-medium ">
        <h2 className="relative z-10 text-center text-3xl font-semibold text-white">
          SKILLS, ACHIEVEMENTS & OTHER EXPERIENCES
        </h2>
        <p className="flex items-center gap-6">
          Exploring selection of my
          <span
            className={cn(
              "rounded-full bg-gradient-to-l from-violet-500 to-blue-500 px-4 py-2 text-black",
              styles.animate_pulse_30s,
            )}
          >
            diverse creation
          </span>
        </p>
      </div>
      <div className="relative z-10 flex w-full items-center rounded-xl bg-[#070D27]/5 p-2 ">
        <div className="grid grid-cols-3 gap-16">
          {others?.map((other, index) => {
            return (
              <div
                key={index}
                className="relative flex flex-col items-start gap-4 rounded-xl bg-violet-700/30 py-4 pl-16 pr-8 outline-1 outline-white backdrop-blur-xl"
              >
                <div className="absolute -top-8 left-3.5 z-10 translate-x-[-50%] transform  ">
                  <Image
                    src="/imgs/Union.png"
                    alt="Yellow Element"
                    width={64}
                    height={64}
                    className=""
                  />
                  <div className="absolute left-[50%] top-[25%] z-10 translate-x-[-50%] transform text-center text-3xl font-semibold text-black">
                    <span className="text-black">{index + 1}</span>
                  </div>
                </div>
                <h3 className=" text-xl font-semibold text-white">
                  {other.name} -{" "}
                  <span className="text-base font-normal text-white">
                    {other.category.charAt(0).toUpperCase() +
                      other.category.slice(1)}
                  </span>
                </h3>
                {other.month !== 0 && other.year !== 0 && (
                  <span className="flex items-center gap-2  text-base font-normal text-white">
                    <CalendarIcon className="text-emerald-500" />
                    {intMonthToString(other.month || 0)} {other.year || ""}
                  </span>
                )}
                <p className="text-start text-muted-foreground">
                  {other.description}
                </p>
                <ol className="list-inside list-disc text-left">
                  {other.achievements.map((achievement) => {
                    return <li>{achievement}</li>;
                  })}
                </ol>
              </div>
            );
          })}
        </div>
      </div>
      <div></div>
      <Creative />
    </section>
  );
};
