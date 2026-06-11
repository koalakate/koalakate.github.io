import { VendorLanding } from "@/components/vendor-landing";
import { getVendor } from "@/lib/vendors";
import type { Metadata } from "next";

const vendor = getVendor("microsoft")!;

export const metadata: Metadata = {
  title: vendor.metaTitle,
  description: vendor.metaDescription,
};

export default function MicrosoftPage() {
  return <VendorLanding vendor={vendor} />;
}
