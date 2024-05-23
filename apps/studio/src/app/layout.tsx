import { env } from "@/env";
import { TRPCReactProvider } from "@/trpc/react";
import { createAuthServer, getServerSession } from "@packages/supabase";
import { Header, ThemeProvider, Toaster } from "@packages/ui";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<JSX.Element> {
  const res = await getServerSession({ cookies: cookies() });

  const handleLogout = async () => {
    "use server";
    const sb = createAuthServer({ cookies: cookies() });
    await sb.auth.signOut();
  };

  return (
    <html lang="en">
      <body className={montserrat.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
        >
          <TRPCReactProvider>
            <Header
              name="studio"
              data={res?.user}
              handleLogout={handleLogout}
              className="max-w-full"
            />
            {children}
            <Toaster richColors />
          </TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: env.NEXT_PUBLIC_APP_NAME,
    description:
      "Effortlessly manage and create blog posts with the Zenta blog platform. Engage your audience and expand your online presence with our fast, reliable tools designed for growth and interaction.",
  };
}
