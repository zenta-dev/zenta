import { Button } from "@packages/ui";

export default function HomePage() {
  return (
    <main>
      <section className="grid grid-cols-2 gap-4 bg-background-100 p-8">
        <div className="grid gap-4">
          <div className="text-4xl font-semibold">
            Crafting Careers, Crafting Futures – Zenta, where every CV is a
            masterpiece in progress!
          </div>
          <div  className="text-2xl font-normal">
            Get a free review of your CV, in just 30 seconds. Save time and
            money🌟
          </div >
          <Button>Get Started</Button>
        </div>
      </section>

      <section className="bg-background-blue-500 p-8">
        <div className="grid gap-4">
          <h1 className="text-center text-3xl font-semibold">
            3 Easy Steps to Generate your CV
          </h1>
        </div>

        <div className="m-2 grid grid-cols-3 gap-4 text-center text-2xl font-medium">
          <h1>
            Pick Template
            <h2 className="font-regular text-xl">
              We provide many template that can adjust by yourself
            </h2>
          </h1>

          <h1>
            Fill the Form{" "}
            <h2 className="font-regular text-xl">
              Fill the blank space in the form until done{" "}
            </h2>
          </h1>

          <h1>
            Finalized and Download It{" "}
            <h2 className="font-regular text-xl">
              Fine-tune the details and download your CV{" "}
            </h2>
          </h1>
        </div>
        <Button>Create Now</Button>
      </section>

      <section className="bg-background-100 p-8">
        <div className="grid gap-4">
          <h1 className="text-center text-3xl font-semibold">Our Services</h1>
        </div>

        <div className="grid gap-4 p-8">
          <div className="grid gap-4">
            <h1 className="text-2xl font-medium">ATS CV-Friendly</h1>
            <h2 className="text-xl font-normal">
              Navigate Applicant Tracking Sysstem (ATS) seamlessly with our
              range of templates designed to pass ATS scans. Ensure your resume
              reaches the right eyes and gets noticed by potential employers.
            </h2>
            <Button>Try Now</Button>
          </div>

          <div className="grid gap-4">
            <h1 className="text-2xl font-medium">Customized CV</h1>
            <h2 className="text-xl font-normal">
              Create personalized resumes effortlessly with our diverse range of
              templates tailored to showcase your unique skills and experience.
              Stand out from the crowd and catch the attention of employers with
              ease.
            </h2>
            <Button>Customized Now</Button>
          </div>

          <div className="grid gap-4">
            <h1 className="text-2xl font-medium">Resume Assistant</h1>
            <h2 className="text-xl font-normal">
              Elevate your CV score effortlessly with our Resume Assistant,
              guiding you with tailored suggestions to optimize your resume for
              maximum impact and visibility to potential employers.
            </h2>
            <Button>Get Started</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
