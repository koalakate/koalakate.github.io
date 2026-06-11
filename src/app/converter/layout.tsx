import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Converter — Antares",
  description: "Automated BI dashboard conversion. Days, not weeks.",
};

export default function ConverterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
