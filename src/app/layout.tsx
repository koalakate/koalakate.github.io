import type { Metadata } from "next";
import "./globals.css";
import { LogoIntroWrapper } from "@/components/ui/logo-intro-wrapper";

export const metadata: Metadata = {
  title: "Antares — BI Migration Platform",
  description:
    "Analyze risk. Automate conversion. Migrate with confidence. Tableau to Power BI, Databricks AI/BI, and SAS VA — 70% faster.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body
        className="min-h-full flex flex-col"
        style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
      >
        <LogoIntroWrapper />
        {children}
      </body>
    </html>
  );
}
