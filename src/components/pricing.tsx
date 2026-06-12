"use client";

import { GradientHeading } from "@/components/ui/gradient-heading";
import { CtaButton } from "@/components/ui/cta-button";
import { useContactModal } from "@/lib/contact-modal-context";
import {
  TextureCard,
  TextureCardContent,
  TextureCardTitle,
} from "@/components/ui/texture-card";

type Tier = {
  label: string;
  title: string;
  price: string;
  description: string;
  features: string[];
  // `modal: true` opens the contact form; otherwise the button is a link.
  cta: { text: string; href: string } | { text: string; modal: true };
  primary: boolean;
  featured: boolean;
};

const tiers: Tier[] = [
  {
    label: "Start here",
    title: "Analyzer",
    price: "Free",
    description:
      "Complete estate visibility before you commit to anything.",
    features: [
      "Readiness scores for every workbook",
      "Complexity & risk analysis",
      "Usage analytics & prioritization",
      "Effort estimation & timeline",
      "Dependency mapping",
    ],
    cta: { text: "Run the Analyzer", href: "https://try.getantares.io" },
    primary: true,
    featured: false,
  },
  {
    label: "Scale",
    title: "Antares Converter License",
    price: "License",
    description:
      "Automated conversion at scale. Turn workbooks into production-ready targets in clicks.",
    features: [
      "Everything in Analyzer",
      "One-click dashboard conversion",
      "Smart Tableau-to-DAX mapping",
      "Layout & design preservation",
      "Validation against source data",
    ],
    cta: { text: "Get in Touch", modal: true },
    primary: false,
    featured: true,
  },
  {
    label: "Full service",
    title: "End-to-End Migration",
    price: "Custom",
    description:
      "Full-service migration with our delivery partners — strategy, conversion, testing, deployment, and change management.",
    features: [
      "Everything in Converter",
      "Dedicated partner delivery team",
      "Custom migration strategy",
      "Change management & training",
      "Post-migration optimization",
    ],
    cta: { text: "Get in Touch", modal: true },
    primary: false,
    featured: false,
  },
];

export function Pricing() {
  const { openModal } = useContactModal();
  return (
    <section id="pricing" className="py-14 lg:py-[120px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <p className="text-xs font-medium tracking-[0.08em] uppercase text-neutral-500 mb-6">
          Engagement Model
        </p>
        <GradientHeading size="lg" weight="bold">
          Start free. Scale with confidence.
        </GradientHeading>
        <p className="text-[clamp(1.1rem,2.5vw,1.5rem)] font-medium text-neutral-500 leading-[1.5] tracking-[-0.01em] max-w-[520px] mt-4">
          Begin with a free analysis. Expand to automated conversion or full
          professional delivery when you&apos;re ready.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
          {tiers.map((tier) => (
            <TextureCard key={tier.title}>
              <TextureCardContent className="p-8 lg:p-10 flex flex-col flex-1">
                <p className="text-xs font-medium uppercase tracking-[0.08em] text-neutral-500 mb-2">
                  {tier.label}
                </p>
                <TextureCardTitle className="!pl-0 !text-xl">
                  {tier.title}
                </TextureCardTitle>
                <p className="text-2xl font-bold text-brand mt-2 mb-5">
                  {tier.price}
                </p>
                <p className="text-[0.9rem] text-neutral-500 mb-6">
                  {tier.description}
                </p>
                <ul className="flex flex-col gap-2">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="text-[0.9rem] text-neutral-600 pl-5 relative"
                    >
                      <span aria-hidden="true" className="absolute left-0 text-green-500 font-semibold">
                        ✓
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
                {/* mt-auto aligns all buttons to the same bottom position */}
                <div className="mt-auto pt-8">
                  {"modal" in tier.cta ? (
                    <CtaButton
                      onClick={openModal}
                      variant={tier.primary ? "primary" : "secondary"}
                      className="w-full px-6"
                    >
                      {tier.cta.text}
                    </CtaButton>
                  ) : (
                    <CtaButton
                      href={tier.cta.href}
                      variant={tier.primary ? "primary" : "secondary"}
                      className="w-full px-6"
                    >
                      {tier.cta.text}
                    </CtaButton>
                  )}
                </div>
              </TextureCardContent>
            </TextureCard>
          ))}
        </div>
      </div>
    </section>
  );
}
