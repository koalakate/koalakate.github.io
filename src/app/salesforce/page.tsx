import { VendorLanding } from "@/components/vendor-landing";
import { getVendor } from "@/lib/vendors";
import type { Metadata } from "next";

const vendor = getVendor("salesforce")!;

export const metadata: Metadata = {
  title: vendor.metaTitle,
  description: vendor.metaDescription,
};

export default function SalesforcePage() {
  return <VendorLanding vendor={vendor} />;
}
