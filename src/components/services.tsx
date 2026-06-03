import { GradientHeading } from "@/components/ui/gradient-heading";

const services = [
  {
    title: "Migration Strategy",
    description:
      "Map out your journey with a custom, risk-free transition roadmap.",
  },
  {
    title: "Change Management",
    description:
      "Empower your team to adopt new workflows with confidence and ease.",
  },
  {
    title: "Full Project Execution",
    description:
      "Let our experts handle the technical heavy lifting from start to finish.",
  },
  {
    title: "Post-Migration",
    description:
      "Maximize long-term efficiency with continuous performance tuning.",
  },
];

export function Services() {
  return (
    <section id="services" className="py-14 lg:py-[120px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <p className="text-xs font-medium tracking-[0.08em] uppercase text-neutral-500 mb-6">
          Professional Services
        </p>
        <GradientHeading size="lg" weight="bold">
          End-to-end migration consulting
        </GradientHeading>
        <p className="text-[clamp(1.1rem,2.5vw,1.5rem)] font-medium text-neutral-500 leading-[1.5] tracking-[-0.01em] max-w-[560px] mt-4">
          Need more than software? Our migration experts deliver comprehensive
          support to ensure project success.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[2px] bg-neutral-200 border border-neutral-200 rounded-xl overflow-hidden mt-12">
          {services.map((service) => (
            <div key={service.title} className="bg-white p-7 lg:p-9">
              <h3 className="text-[1.05rem] font-bold text-neutral-900 tracking-[-0.01em] leading-[1.3] mb-3">
                {service.title}
              </h3>
              <p className="text-[0.9rem] leading-[1.55] text-neutral-500">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
