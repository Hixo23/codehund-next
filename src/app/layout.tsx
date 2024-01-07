import "@/styles/globals.css";

import { Poppins } from "next/font/google";
import { cookies } from "next/headers";
import { Theme } from "@radix-ui/themes";

import { TRPCReactProvider } from "@/trpc/react";

const poppins = Poppins({
  subsets: ["latin", "devanagari"],
  weight: ["400", "600", "700"],
});

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={` ${poppins.className} min-w-screen flex min-h-screen flex-col overflow-x-hidden bg-background scrollbar scrollbar-track-primary scrollbar-thumb-secondary`}
      >
        <Theme>
          <TRPCReactProvider cookies={cookies().toString()}>
            {children}
          </TRPCReactProvider>
        </Theme>
      </body>
    </html>
  );
}
