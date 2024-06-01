import { cn } from "@packages/utils";
import Link from "next/link";
import { FaEnvelope, FaGlobe, FaLinkedin, FaPhone } from "react-icons/fa";
import styles from "./styles.module.css";

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

        <div className="flex grid-cols-3 items-center justify-center space-x-4">
          <div className="space-y-2 text-left text-white">
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

          <div className="relative flex h-64 w-full items-center justify-center">
            <img
              src="../images/Violia.png"
              alt="Violia"
              className="mx-auto h-full w-auto object-cover"
            />
          </div>

          <div className="grid-cols-1 grid-rows-4 text-black">
            <Link href="mailto:violiaruana@gmail.com" passHref>
              <div className="m-9 w-fit cursor-pointer rounded-full border border-zinc-500 bg-zinc-500 p-2 text-3xl">
                <FaEnvelope />
              </div>
            </Link>

            <Link href="tel:+6285234258863" passHref>
              <div className="m-9 w-fit cursor-pointer rounded-full border border-zinc-500 bg-zinc-500 p-2 text-3xl">
                <FaPhone />
              </div>
            </Link>

            <Link href="https://www.linkedin.com/in/violia-ruana/" passHref>
              <div className="m-9 w-fit cursor-pointer rounded-full border border-zinc-500 bg-zinc-500 p-2 text-3xl">
                <FaLinkedin />
              </div>
            </Link>

            <Link href="https://github.com/zenta-dev/zenta/tree/main" passHref>
              <div className="m-9 w-fit cursor-pointer rounded-full border border-zinc-500 bg-zinc-500 p-2 text-3xl">
                <FaGlobe />
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section
        className={cn(
          "relative h-screen bg-cover bg-center bg-no-repeat p-8 text-center",
          styles.linear_gradient_bg_1,
        )}
      >
        <div className="text-center text-2xl font-semibold text-white">
          EDUCATION
        </div>

        <div className="grid-cols-2 items-center text-center">
          <div className="m-10 space-x-4 text-center text-4xl font-medium text-white">
            <a>Let's see my </a>
            <a
              className={cn(
                "h-16 max-w-fit rounded-full pb-2 pl-4 pr-4 pt-2",
                styles.linear_gradient_bg_2,
              )}
            >
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

              <div className="rounded-lg bg-[#070D27] p-4">
                <div className="text-2xl font-semibold">
                  Undegraduate Student in University State of Surabaya -
                  Surabaya, Indonesia
                </div>
                <div className="text-xl font-medium">
                  Informatics Engineering, GPA : 3.82 / 4.00{" "}
                </div>
                <div className="p-4">
                  <li className="font-regular text-xl">
                    Relevant Subjects : Basic Programming, Software Engineering,
                    Databases, Software Project Management, Software Analysis
                    and Design, Data Structures, and Artificial Intelligence.
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
            <a
              className={cn(
                "h-16 max-w-fit rounded-full pb-2 pl-4 pr-4 pt-2",
                styles.linear_gradient_bg_2,
              )}
            >
              recent work experiences
            </a>
          </div>
        </div>

        <div className="flex justify-center p-6 sm:p-10">
          <div className="relative grid h-fit gap-10 pl-6 after:absolute after:inset-y-[-36px] after:left-0 after:w-px after:bg-yellow-500 ">
            <div className="relative grid  text-left text-sm text-white">
              <div className="absolute left-0 top-0 z-10 aspect-square w-3 translate-x-[-29.5px] rounded-full bg-red-600" />
              <div className="absolute left-0 top-0 z-10 aspect-square w-fit translate-x-0 text-black">
                <div className="rounded-full bg-white p-2">
                  Jan 2022 - Apr 2023
                </div>
              </div>

              <div className=" rounded-lg bg-[#070D27] p-4">
                <div className="text-2xl font-semibold">
                  Marketing in Bima Nusantara Company - Jakarta, Indonesia
                </div>
                <div className="p-4">
                  <li className="font-regular text-xl">
                    Design and implement innovative marketing strategies for the
                    properties offered. Develop and implement effective
                    marketing campaigns to achieve sales targets. Interact with
                    potential buyers and customers to understand their needs.
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
                  May 2023 - Apr 2023
                </div>
              </div>
              <div className="relative grid  text-left text-sm text-white">
                <div className="absolute left-0 top-0 z-10 aspect-square w-3 translate-x-[-29.5px] rounded-full bg-red-600" />
                <div className=" rounded-lg bg-[#070D27] p-4">
                  <div className="text-2xl font-semibold">
                    Marketing in Bima Nusantara Company - Jakarta, Indonesia
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

      <section className="bg-[#0F0716] p-12">
        <div className="text-center text-2xl font-semibold text-white">
          ORGANIZATIONAL
        </div>

        <div className="grid-cols-2 items-center text-center">
          <div className="m-10 space-x-4 text-center text-4xl font-medium text-white">
            <a>Showcasing all of my </a>
            <a
              className={cn(
                "h-16 max-w-fit rounded-full pb-2 pl-4 pr-4 pt-2",
                styles.linear_gradient_bg_2,
              )}
            >
              diverse contribution
            </a>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2">
            <div className="justify-left flex  pl-20 pr-20">
              <img
                src="../images/Sertifikat_Panitia_PKKMB_FT_2023.jpg"
                alt=""
                width="607"
                height="430"
                className={cn("rounded-lg", styles.shadow_custom)}
              />
            </div>

            <div className="relative grid text-left text-sm text-white">
              <div>
                <div className="text-2xl font-semibold">
                  Secretarial Division Staff in PKKMB Fakultas Teknik 2022 (Aug
                  2022)
                </div>
                <div className="p-4">
                  <li className="font-regular text-xl">
                    Responsible for processing new student data for group
                    division.
                  </li>
                  <li className="font-regular text-xl">
                    Handle attendance for everyone involved in the event, such
                    as the committee, new students, and invited guests.
                  </li>
                  <li className="font-regular text-xl">
                    Create certificates intended for new students involved.
                  </li>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2">
            <div className="relative grid text-left text-sm text-white">
              <div>
                <div className="text-2xl font-semibold">
                  Secretarial Division Staff in Ameliorer 2022 (Aug 2022 - Jan
                  2023)
                </div>
                <div className="p-4">
                  <li className="font-regular text-xl">
                    Responsible for processing new student data for group
                    division.
                  </li>
                  <li className="font-regular text-xl">
                    Handle attendance for everyone involved in the event, such
                    as the committee, new students, and invited guests.
                  </li>
                  <li className="font-regular text-xl">
                    Create certificates intended for new students involved.
                  </li>
                </div>
              </div>
            </div>

            <div className="justify-left flex  pl-20 pr-20">
              <img
                src="../images/Sertifikat_Panitia_XProject_8.0.png"
                alt=""
                width="607"
                height="430"
                className={cn("rounded-lg", styles.shadow_custom)}
              />
            </div>
          </div>
        </div>
      </section>

      <section
        className="p-18 relative h-screen bg-cover bg-center bg-no-repeat text-center"
        style={{ backgroundImage: "url('/BG Porto Section 1.png')" }}
      >
        <div className="text-center text-2xl font-semibold text-white">
          SKILLS, ACHIEVEMENTS & OTHER EXPERIENCES
        </div>

        <div className="grid-cols-2 items-center text-center">
          <div className="m-10 space-x-4 text-center text-4xl font-medium text-white">
            <a>Exploring selection of my </a>
            <a
              className={cn(
                "h-16 max-w-fit rounded-full pb-2 pl-4 pr-4 pt-2",
                styles.linear_gradient_bg_2,
              )}
            >
              diverse creation
            </a>
          </div>
        </div>

        <div className="relative flex items-center justify-center gap-16 pl-16 pr-36">
          <div className="absolute left-[50%] top-[-18%] z-10 translate-x-[-50%] transform">
            <img
              src="../images/Union.png"
              alt="Yellow Element"
              width="80"
              height="70"
              className=""
            />
            <div className="absolute left-[50%] top-[30%] z-10 translate-x-[-50%] transform text-center text-3xl font-semibold text-black">
              2
            </div>
          </div>

          <div className="relative flex w-full flex-col items-center rounded-lg bg-[#070D27] p-4 text-left text-sm text-white">
            <div>
              <div className="text-2xl font-semibold">
                UI/UX Design Competition (May 2023)
              </div>
              <div className="text-xl font-medium">
                Achievements - Held by Dicoding
              </div>
              <div className="p-4">
                <li className="font-regular text-xl">
                  Won the competition and got the first place.
                </li>
                <li className="font-regular text-xl">
                  Created a UI/UX design for an entrepreneur website.
                </li>
              </div>
            </div>
            <button
              className={cn(
                "h-9 w-fit rounded-full pb-2 pl-4 pr-4 pt-2",
                styles.linear_gradient_bg_2,
              )}
            >
              See Details
            </button>
          </div>

          <div className="absolute left-[3.5%] top-[-18%] z-10 translate-x-[-50%] transform">
            <img
              src="../images/Union.png"
              alt="Yellow Element"
              width="80"
              height="70"
              className=""
            />
            <div className="absolute left-[50%] top-[30%] z-10 translate-x-[-50%] transform text-center text-3xl font-semibold text-black">
              1
            </div>
          </div>
          <div className="relative flex w-full flex-col items-center rounded-lg bg-[#070D27] p-4 text-left text-sm text-white">
            <div>
              <div className="text-2xl font-semibold">
                Mobile App Calculator (Nov - Dec 2023)
              </div>
              <div className="text-xl font-medium">
                Project - Final Exam in College
              </div>
              <div className="p-4">
                <li className="font-regular text-xl">
                  Create UI in neumorphism design
                </li>
                <li className="font-regular text-xl">
                  Develop the logic correctly
                </li>
              </div>
            </div>
            <button
              className={cn(
                "h-9 w-fit rounded-full pb-2 pl-4 pr-4 pt-2",
                styles.linear_gradient_bg_2,
              )}
            >
              See Details
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
