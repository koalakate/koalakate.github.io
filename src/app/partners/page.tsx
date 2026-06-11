import { PartnersContent } from "@/components/partners-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partners — Antares",
  description: "Partner with Antares on BI migration. Delivery, technology, and referral partnerships — automation plus your delivery. Become a partner.",
};

export default function PartnersPage() {
  return <PartnersContent />;
}
