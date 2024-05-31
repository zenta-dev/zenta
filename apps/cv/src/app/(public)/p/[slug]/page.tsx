import Link from "next/link";
import { FaEnvelope, FaGlobe, FaLinkedin, FaPhone } from "react-icons/fa";

type Props = {
  params: {
    slug: string;
  };
};

export default function PreviewPage({ params }: Props) {
  return (
    <main>
      <section
        className="relative h-screen bg-cover bg-center bg-no-repeat p-8 text-center"
        style={{ backgroundImage: "url('/BG Porto Section 1.png')" }}
      >
        <div
          className="text-center text-9xl font-thin text-white"
          style={{ fontFamily: "Tourney" }}
        >
          HELLO
        </div>

        <div className="ml-9 mr-9 flex grid-cols-3 items-center justify-center gap-4">
          <div className="gap-2 space-y-9 text-left font-thin text-white">
            <div className="text-6xl font-bold">
              VIOLIA RUANA NUR’AINI SAGITA
            </div>

            <div className="text-2xl font-medium">
              Kusuma Bangsa Street, East Jakarta, Indonesia
            </div>

            <div className="font-regular text-2xl">
              Hi, I am an undergraduate Student Majoring in Informatics
              Engineering at State University of Surabaya. Highly motivated in
              Software Development Experienced in Website Programming, Front End
              Developer, and UI/UX Design. Able to use HTML, CSS, JavaScript,
              TypeScript, MySQL, Bootstrap, Figma, and PostgreSQL.
            </div>
          </div>

          <div className="h-96 w-96 rounded-full border border-[#D9DAFD] bg-[#D9DAFD] p-2"></div>

          <div className="grid-cols-1 grid-rows-4 gap-9 p-9 text-black">
            <Link href="mailto:violiaruana@gmail.com" passHref>
              <div className="w-fit cursor-pointer rounded-full border border-zinc-500 bg-zinc-500 p-3 text-3xl">
                <FaEnvelope />
              </div>
            </Link>

            <Link href="tel:+6285234258863" passHref>
              <div className="w-fit cursor-pointer rounded-full border border-zinc-500 bg-zinc-500 p-3 text-3xl">
                <FaPhone />
              </div>
            </Link>

            <Link href="https://www.linkedin.com/in/violia-ruana/" passHref>
              <div className="w-fit cursor-pointer rounded-full border border-zinc-500 bg-zinc-500 p-3 text-3xl">
                <FaLinkedin />
              </div>
            </Link>

            <Link href="https://github.com/zenta-dev/zenta/tree/main" passHref>
              <div className="w-fit cursor-pointer rounded-full border border-zinc-500 bg-zinc-500 p-3 text-3xl">
                <FaGlobe />
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="linear-gradient-bg-1 relative h-screen bg-cover bg-center bg-no-repeat p-8 text-center">
        <div className="text-center text-2xl font-semibold text-white">
          EDUCATION
        </div>

        <div className="grid-cols-2 items-center text-center">
          <div className="m-10 space-x-4 text-center text-4xl font-medium text-white">
            <a>Let's see my </a>
            <a className="linear-gradient-bg-2 h-16 max-w-fit rounded-full pb-2 pl-4 pr-4 pt-2">
              education journey
            </a>
          </div>
        </div>

        <div className="flex justify-center p-6 sm:p-10">
          <div className="relative grid h-fit gap-10 pl-6 after:absolute after:inset-y-[-36px] after:left-0 after:w-px after:bg-yellow-500 ">
            <div className="relative grid  text-left text-sm text-white">
              <div className="absolute left-0 top-0 z-10 aspect-square w-3 translate-x-[-29.5px] rounded-full bg-red-600" />
              <div className="absolute left-0 top-0 z-10 aspect-square w-fit translate-x-0 text-black">
                <div className="rounded-full bg-white p-2">Aug 2021 - Now</div>
              </div>

              <div className=" rounded-lg bg-[#070D27] p-4">
                <div className="text-2xl font-semibold">
                  Student in Senior High School of 5 Surabaya - Surabaya,
                  Indonesia
                </div>
                <div className="text-xl font-medium">
                  Mathematic and Science, GPA : 93.73 / 100.00
                </div>
                <div className="p-4">
                  <li className="font-regular text-xl">
                    Design and implement innovative marketing strategies for the
                    properties offered.
                  </li>
                  <li className="font-regular text-xl">
                    Develop and implement effective marketing campaigns to
                    achieve sales targets.
                  </li>
                  <li className="font-regular text-xl">
                    Interact with potential buyers and customers to understand
                    their needs.
                  </li>
                </div>
              </div>

              <div className="absolute left-0 top-0 z-10 aspect-square w-fit translate-x-0 text-black">
                <div className="rounded-full bg-white p-2">
                  Jul 2019 - May 2021
                </div>
              </div>
              <div className="relative grid  text-left text-sm text-white">
                <div className="absolute left-0 top-0 z-10 aspect-square w-3 translate-x-[-29.5px] rounded-full bg-red-600" />
                <div className=" rounded-lg bg-[#070D27] p-4">
                  <div className="text-2xl font-semibold">
                    Student in Senior High School of 5 Surabaya - Surabaya,
                    Indonesia
                  </div>
                  <div className="text-xl font-medium">
                    Mathematic and Science, GPA : 93.73 / 100.00
                  </div>
                  <div className="p-4">
                    <li className="font-regular text-xl">
                      Design and implement innovative marketing strategies for
                      the properties offered.
                    </li>
                    <li className="font-regular text-xl">
                      Develop and implement effective marketing campaigns to
                      achieve sales targets.
                    </li>
                    <li className="font-regular text-xl">
                      Interact with potential buyers and customers to understand
                      their needs.
                    </li>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="relative h-screen bg-cover bg-center bg-no-repeat p-8 text-center"
        style={{ backgroundImage: "url('/BG Porto Section 1.png')" }}
      >
        <div className="text-center text-2xl font-semibold text-white">
          PROFESSIONAL
        </div>

        <div className="grid-cols-2 items-center text-center">
          <div className="m-10 space-x-4 text-center text-4xl font-medium text-white">
            <a>Take a look at my </a>
            <a className="linear-gradient-bg-2 h-16 max-w-fit rounded-full pb-2 pl-4 pr-4 pt-2">
              recent work experiences
            </a>
          </div>
        </div>

        <div className="flex justify-center p-6 sm:p-10">
          <div className="relative grid h-fit gap-10 pl-6 after:absolute after:inset-y-[-36px] after:left-0 after:w-px after:bg-yellow-500 ">
            <div className="relative grid  text-left text-sm text-white">
              <div className="absolute left-0 top-0 z-10 aspect-square w-3 translate-x-[-29.5px] rounded-full bg-red-600" />
              <div className="absolute left-0 top-0 z-10 aspect-square w-fit translate-x-0 text-black">
                <div className="rounded-full bg-white p-2">Aug 2021 - Now</div>
              </div>

              <div className=" rounded-lg bg-[#070D27] p-4">
                <div className="text-2xl font-semibold">
                  Student in Senior High School of 5 Surabaya - Surabaya,
                  Indonesia
                </div>
                <div className="text-xl font-medium">
                  Mathematic and Science, GPA : 93.73 / 100.00
                </div>
                <div className="p-4">
                  <li className="font-regular text-xl">
                    Design and implement innovative marketing strategies for the
                    properties offered.
                  </li>
                  <li className="font-regular text-xl">
                    Develop and implement effective marketing campaigns to
                    achieve sales targets.
                  </li>
                  <li className="font-regular text-xl">
                    Interact with potential buyers and customers to understand
                    their needs.
                  </li>
                </div>
              </div>

              <div className="absolute left-0 top-0 z-10 aspect-square w-fit translate-x-0 text-black">
                <div className="rounded-full bg-white p-2">
                  Jul 2019 - May 2021
                </div>
              </div>
              <div className="relative grid  text-left text-sm text-white">
                <div className="absolute left-0 top-0 z-10 aspect-square w-3 translate-x-[-29.5px] rounded-full bg-red-600" />
                <div className=" rounded-lg bg-[#070D27] p-4">
                  <div className="text-2xl font-semibold">
                    Student in Senior High School of 5 Surabaya - Surabaya,
                    Indonesia
                  </div>
                  <div className="text-xl font-medium">
                    Mathematic and Science, GPA : 93.73 / 100.00
                  </div>
                  <div className="p-4">
                    <li className="font-regular text-xl">
                      Design and implement innovative marketing strategies for
                      the properties offered.
                    </li>
                    <li className="font-regular text-xl">
                      Develop and implement effective marketing campaigns to
                      achieve sales targets.
                    </li>
                    <li className="font-regular text-xl">
                      Interact with potential buyers and customers to understand
                      their needs.
                    </li>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section></section>
    </main>
  );
}
