import { Button } from "@packages/ui";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-static";

export default function HomePage() {
  return (
    <main>
      <section className="mx-auto flex w-full items-center justify-center bg-background-100 px-10">
        <div className="flex w-full flex-col sm:w-1/2">
          <div className="gap-6 px-12">
            <div className="my-6 grid grid-cols-1 gap-6 px-6">
              <div className="row-span-1">
                <div className="grid grid-cols-1 gap-6">
                  <div className=" text-4xl font-semibold">
                    Crafting Careers, Crafting Futures – Zenta, where every CV
                    is a masterpiece in progress!
                  </div>
                  <div className=" text-2xl font-normal">
                    Get a free review of your CV, in just 30 seconds. Save time
                    and money🌟
                  </div>
                </div>
              </div>
              <div className="row-span-1">
                <Link href="/dash">
                  <Button>Get Started</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col sm:w-1/2">
          <div className="px-12">
            <Image
              src="/imgs/landing/section1.png"
              alt="Homepage Section Image"
              width={500}
              height={500}
            />
          </div>
        </div>
      </section>

      <section className="bg-[#D9DAFD] py-9">
        <div className="grid gap-4">
          <div className="text-center text-3xl font-semibold">
            3 Easy Steps to Generate your CV
          </div>
        </div>

        <div className="my-4 items-center justify-center gap-4 px-10">
          <div className="grid grid-cols-3 gap-4 text-center text-2xl font-medium">
            <div className="flex flex-col items-center px-4">
              <div>
                <Image
                  src="/imgs/landing/section2_PickTemplate.png"
                  alt=""
                  width={375}
                  height={440}
                  className="mb-4"
                />
              </div>

              <div className="gap-4">
                <div>Pick Template</div>
                <div className="font-regular text-center text-xl">
                  We provide many templates that you can adjust by yourself
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center px-4">
              <div>
                <Image
                  src="/imgs/landing/section2_FillForm.png"
                  alt=""
                  width={350}
                  height={200}
                  className="mb-4"
                />
              </div>

              <div className="gap-4">
                <div>Fill the Form</div>
                <div className="font-regular text-center text-xl">
                  Fill the blank space in the form until done
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center px-4">
              <div>
                <Image
                  src="/imgs/landing/section2_Download.png"
                  alt=""
                  width={320}
                  height={200}
                  className="mb-4"
                />
              </div>

              <div className="gap-4">
                <div>Finalized and Download It</div>
                <div className="font-regular text-center text-xl">
                  Finalized and Download It
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-96 my-4 items-center px-96">
          <Link href="/dash">
            <Button className=" flex w-full text-center">Create Now</Button>
          </Link>
        </div>
      </section>

      <section className="bg-background-100 p-8">
        <div className="grid gap-4">
          <div className="text-center text-3xl font-semibold">Our Services</div>
        </div>

        <div className="grid p-8">
          <div className="mx-12 grid grid-cols-2">
            <Image
              src="/imgs/landing/section3_Services1.png"
              alt=""
              width={300}
              height={300}
            />
            <div className="grid">
              <div className="grid grid-cols-1">
                <div className=" text-3xl font-medium">ATS CV-Friendly</div>
                <div className=" text-xl font-normal">
                  Navigate Applicant Tracking System (ATS) seamlessly with our
                  range of templates designed to pass ATS scans. Ensure your
                  resume reaches the right eyes and gets noticed by potential
                  employers.
                </div>
              </div>

              <Link href="/dash">
                <Button>Try Now</Button>
              </Link>
            </div>
          </div>

          <div className="grid p-8">
            <div className="mx-12 grid grid-cols-2">
              <div className="grid">
                <div className="grid grid-cols-1">
                  <div className=" text-3xl font-medium">Customized CV</div>
                  <div className=" text-xl font-normal">
                    Create personalized resumes effortlessly with our diverse
                    range of templates tailored to showcase your unique skills
                    and experience. Stand out from the crowd and catch the
                    attention of employers with ease.
                  </div>
                </div>

                <Link href="/dash">
                  <Button>Customized Now</Button>
                </Link>
              </div>
              <Image
                src="/imgs/landing/section3_Services2.png"
                alt=""
                width={400}
                height={300}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
