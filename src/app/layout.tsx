import type { Metadata } from "next";
import "./globals.css";
import { LogoIntroWrapper } from "@/components/ui/logo-intro-wrapper";
import { ContactModalProvider } from "@/lib/contact-modal-context";
import { ContactModal } from "@/components/ui/contact-modal";

export const metadata: Metadata = {
  title: "Antares — BI Migration Platform",
  description:
    "Analyze risk. Automate conversion. Migrate with confidence. Tableau to Power BI, Databricks AI/BI, and SAS VA — in weeks, not years.",
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
        <ContactModalProvider>
          <LogoIntroWrapper />
          {children}
          <ContactModal />
        </ContactModalProvider>
      </body>
    </html>
  );
}
