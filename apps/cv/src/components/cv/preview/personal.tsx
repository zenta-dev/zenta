import { NebulaParticle } from "@/components/spline/particle";
import { PersonalSchemaValue } from "@/schemas/cv";
import { IoLocation } from "@packages/ui";
import { cn, makeNoun } from "@packages/utils";
import { Birthstone_Bounce, Tourney } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const tourney = Tourney({ subsets: ["latin"], weight: ["100"] });
const birthstoneBounce = Birthstone_Bounce({
  subsets: ["latin"],
  weight: ["500"],
});

export const PersonalPreview = ({
  personal,
}: {
  personal?: PersonalSchemaValue;
}) => {
  return (
    <section className="relative flex h-[calc(100vh-5vh)] w-full flex-col items-center justify-between p-8 py-16">
      <div></div>
      <div
        className={cn("z-10 -mt-32 text-center text-9xl font-thin text-white")}
      >
        <h1 className={cn(tourney.className, "font-thin text-amber-500")}>
          HELLO
        </h1>{" "}
        <div className="mt-8 flex w-full grid-cols-3 items-center justify-center rounded-xl bg-[#070D27]/5 p-2 outline-1 outline-white backdrop-blur-sm">
          <div className="relative flex h-64 min-w-[380px] items-center  justify-center ">
            <h1
              className={cn(
                birthstoneBounce.className,
                "absolute left-8 top-0 -rotate-[32deg] text-7xl tracking-wide",
              )}
            >
              I am
            </h1>{" "}
            <Image
              src={personal?.image || ""}
              alt="Violia"
              className="mx-auto h-[256px] w-[256px] rounded-full object-cover "
              width={256}
              height={256}
            />
          </div>

          <div className="space-y-2 pr-8 text-left text-white">
            <h2 className="text-6xl font-bold">{personal?.name}</h2>
            <div className="flex items-center gap-2 text-2xl">
              i am
              <span className="flex items-center gap-1 font-medium">
                <div className="flex items-center gap-1">
                  <p className="underline decoration-emerald-500 underline-offset-4">
                    {makeNoun(personal?.currentJob || "") + " "}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  - <IoLocation className=" text-rose-500" />
                  <p>{personal?.address}</p>
                </div>
              </span>
            </div>
            <h3 className="font-regular text-2xl">{personal?.description}</h3>
          </div>
        </div>
      </div>
      <div className="z-10 rounded-[12px] bg-white/10 p-3 shadow-lg ring-1 ring-black/5 backdrop-blur-3xl">
        <div className="grid grid-cols-4 gap-3 ">
          <Link
            href={`mailto:${personal?.email}`}
            className="h-12 w-12 transition-all duration-300 ease-in-out hover:scale-125"
          >
            <Image
              alt="Mail icon"
              src="/imgs/icons/mail.png"
              width={48}
              height={48}
            />
          </Link>{" "}
          <Link
            href={`tel:${personal?.phone}`}
            className="h-12 w-12 transition-all duration-300 ease-in-out hover:scale-125"
          >
            <Image
              alt="Phone icon"
              src="/imgs/icons/telephone.png"
              width={48}
              height={48}
            />
          </Link>{" "}
          <Link
            href={personal?.linkedinUrl || ""}
            className="h-12 w-12 transition-all duration-300 ease-in-out hover:scale-125"
          >
            <Image
              alt="Linkedin icon"
              src="/imgs/icons/linkedin.png"
              width={48}
              height={48}
            />
          </Link>{" "}
          <Link
            href={personal?.portfolioUrl || ""}
            className="h-12 w-12 transition-all duration-300 ease-in-out hover:scale-125"
          >
            <Image
              alt="Portfolio icon"
              src="/imgs/icons/browser.png"
              width={48}
              height={48}
            />
          </Link>
        </div>
      </div>
      <NebulaParticle />
    </section>
  );
};
