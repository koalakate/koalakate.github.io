import { VendorLanding } from "@/components/vendor-landing";
import { getVendor } from "@/lib/vendors";
import type { Metadata } from "next";

const vendor = getVendor("databricks")!;

export const metadata: Metadata = {
  title: vendor.metaTitle,
  description: vendor.metaDescription,
};

export default function DatabricksPage() {
  return <VendorLanding vendor={vendor} />;
}
