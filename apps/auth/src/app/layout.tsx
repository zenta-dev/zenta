import { env } from "@/env";
import { createAuthServer, getServerSession } from "@packages/supabase";
import { cn, Header, ThemeProvider, Toaster } from "@packages/ui";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const res = await getServerSession({ cookies: cookies() });

  const handleLogout = async () => {
    "use server";
    const sb = createAuthServer({ cookies: cookies() });
    await sb.auth.signOut();
    redirect("/");
  };

  return (
    <html lang="en">
      <body className={cn(inter.className, "h-screen")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
        >
          <Header name="auth" data={res?.user} handleLogout={handleLogout} />
          {children}
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: env.NEXT_PUBLIC_APP_NAME,
    description:
      "Securely log in to the Zenta app with our robust authentication portal. Fast, reliable, and designed to protect your data at every step. Access all Zenta features with ease.",
  };
}
