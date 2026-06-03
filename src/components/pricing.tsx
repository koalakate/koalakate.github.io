import { GradientHeading } from "@/components/ui/gradient-heading";
import {
  TextureCard,
  TextureCardContent,
  TextureCardHeader,
  TextureCardTitle,
  TextureSeparator,
} from "@/components/ui/texture-card";

const tiers = [
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
    cta: {
      text: "Get in touch",
      href: "mailto:hello@getantares.io?subject=Converter License",
    },
    primary: true,
    featured: true,
  },
  {
    label: "Full service",
    title: "End-to-End Migration",
    price: "Custom",
    description:
      "Full professional delivery. Strategy, conversion, testing, deployment, and change management.",
    features: [
      "Everything in Converter",
      "Dedicated migration team",
      "Custom migration strategy",
      "Change management support",
      "Post-migration optimization",
    ],
    cta: {
      text: "Contact us",
      href: "mailto:hello@getantares.io?subject=End-to-End Migration",
    },
    primary: false,
    featured: false,
  },
];

export function Pricing() {
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
                <p className="text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-neutral-400 mb-2">
                  {tier.label}
                </p>
                <TextureCardTitle className="!pl-0 !text-xl">
                  {tier.title}
                </TextureCardTitle>
                <p className="text-2xl font-bold text-[#3B82F6] mt-2 mb-5">
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
                      <span className="absolute left-0 text-green-500 font-semibold">
                        ✓
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
                {/* mt-auto aligns all buttons to the same bottom position */}
                <div className="mt-auto pt-8">
                  <a
                    href={tier.cta.href}
                    className={`flex items-center justify-center w-full font-semibold py-3 px-6 rounded transition-all ${
                      tier.primary
                        ? "bg-[#3B82F6] hover:bg-[#2563EB] text-white"
                        : "bg-transparent border-[1.5px] border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white"
                    }`}
                  >
                    {tier.cta.text}
                  </a>
                </div>
              </TextureCardContent>
            </TextureCard>
          ))}
        </div>
      </div>
    </section>
  );
}
