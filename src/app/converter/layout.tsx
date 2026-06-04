import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Converter — Antares",
  description: "Automated BI dashboard conversion. 70% less manual work.",
};

export default function ConverterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
