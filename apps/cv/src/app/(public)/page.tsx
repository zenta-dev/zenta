import { Button } from "@packages/ui";

export const dynamic = "force-static";

export default function HomePage() {
  return (
    <main>
      <section>
        <div className="grid grid-cols-2 items-center bg-background-100 pl-10 pr-10">
          <div className="grid pl-12 pr-12">
            <div className="pb-6  text-4xl font-semibold">
              Crafting Careers, Crafting Futures – Zenta, where every CV is a
              masterpiece in progress!
            </div>
            <div className="pb-6  text-2xl font-normal">
              Get a free review of your CV, in just 30 seconds. Save time and
              money🌟
            </div>
            <Button>Get Started</Button>
          </div>

          <div className="flex items-center justify-center pl-20 pr-20">
            <img
              src="../images/Homepage_Section1.png"
              alt="Homepage Section Image"
              width="500"
              height="500"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#D9DAFD] pl-10 pr-10">
        <div className="grid gap-4">
          <div className="pt-10 text-center text-3xl font-semibold">
            3 Easy Steps to Generate your CV
          </div>
        </div>

        <div className="m-2 grid grid-cols-3 gap-4 p-8 text-center text-2xl font-medium">
          <div className="flex flex-col items-center p-4">
            <img
              src="../images/Homepage_Section2_PickTemplate.png"
              alt=""
              width="375"
              height="440"
              className="mb-4"
            />
            <div>Pick Template</div>
            <div className="font-regular text-center text-xl">
              We provide many templates that you can adjust by yourself
            </div>
          </div>

          <div className="flex flex-col items-center p-4">
            <img
              src="../images/Homepage_Section2_FillForm.png"
              alt=""
              width="350"
              height="200"
              className="mb-4"
            />
            <div>Fill the Form</div>
            <div className="font-regular text-center text-xl">
              Fill the blank space in the form until done
            </div>
          </div>

          <div className="flex flex-col items-center p-4">
            <img
              src="../images/Homepage_Section2_Download.png"
              alt=""
              width="320"
              height="200"
              className="mb-4"
            />
            <div>Finalized and Download It</div>
            <div className="font-regular text-center text-xl">
              Fine-tune the details and download your CV
            </div>
          </div>
          <Button className="flex items-center">Create Now</Button>
        </div>
      </section>

      <section className="bg-background-100 p-8">
        <div className="grid gap-4">
          <div className="text-center text-3xl font-semibold">Our Services</div>
        </div>

        <div className="grid p-8">
          <div className="grid grid-cols-2 pl-28 pr-28">
            <img
              src="../images/Homepage_Section3_Services1.png"
              alt=""
              width="300"
              height="300"
            />
            <div className="grid gap-4">
              <div className="text-2xl font-medium">ATS CV-Friendly</div>
              <div className="text-xl font-normal">
                Navigate Applicant Tracking System (ATS) seamlessly with our
                range of templates designed to pass ATS scans. Ensure your
                resume reaches the right eyes and gets noticed by potential
                employers.
              </div>
              <Button>Try Now</Button>
            </div>
          </div>

          <div className="grid">
            <div className="grid grid-cols-2 ">
              <div className="grid items-center">
                <div className="text-2xl font-medium">Customized CV</div>
                <div className="text-xl font-normal">
                  Create personalized resumes effortlessly with our diverse
                  range of templates tailored to showcase your unique skills and
                  experience. Stand out from the crowd and catch the attention
                  of employers with ease.
                </div>
                <Button>Customized Now</Button>
              </div>
              <img
                src="../images/Homepage_Section3_Services2.png"
                alt=""
                width="450"
                height="300"
              />
            </div>
          </div>

          <div className="grid gap-4 p-8">
            <div className="grid grid-cols-2">
              <img
                src="../images/Homepage_Section3_Services3.png"
                alt=""
                width="361"
                height="369"
              />

              <div className="grid gap-4">
                <div className="text-2xl font-medium">Resume Assistant</div>
                <div className="text-xl font-normal">
                  Elevate your CV score effortlessly with our Resume Assistant,
                  guiding you with tailored suggestions to optimize your resume
                  for maximum impact and visibility to potential employers.
                </div>
                <Button>Get Started</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
