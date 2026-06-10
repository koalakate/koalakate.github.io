const partners = [
  {
    id: "t1a",
    name: "T1A",
    tag: "Delivery & engineering",
    logo: "/t1a-logo.svg",
    description:
      "End-to-end BI migration delivery — strategy, project management, and custom engineering.",
    url: "", // TODO: T1A website
  },
  {
    id: "obv",
    name: "OBV",
    tag: "Change management",
    logo: "/obv.png",
    description:
      "Change management, training, and post-migration adoption for enterprise BI teams.",
    url: "", // TODO: OBV website
  },
];

export function Partners() {
  return (
    <section id="partners" className="py-14 lg:py-[120px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <p className="text-xs font-medium tracking-[0.08em] uppercase text-neutral-500 mb-6">
          Partners
        </p>
        <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-neutral-950 tracking-[-0.03em] leading-[1.1]">
          Need full-service delivery?
        </h2>
        <p className="text-[clamp(1rem,2.5vw,1.25rem)] font-medium text-neutral-500 leading-[1.55] tracking-[-0.01em] max-w-[560px] mt-4">
          Antares automates the technical conversion — our delivery partners handle
          end-to-end project management, change management, and custom work.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-12">
          {partners.map((partner) => {
            const content = (
              <>
                <div className="flex items-center gap-4 mb-5">
                  <div className="flex items-center justify-center h-12 px-4 rounded-lg bg-neutral-900 shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={partner.logo} alt={`${partner.name} logo`} className="h-5 w-auto" />
                  </div>
                  <p className="text-xs font-medium uppercase tracking-[0.06em] text-neutral-400">
                    {partner.tag}
                  </p>
                </div>
                <p className="text-[0.9rem] leading-[1.55] text-neutral-500">
                  {partner.description}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                  Visit {partner.name}&apos;s site
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
              </>
            );

            const cardClass =
              "group block bg-white border border-neutral-200 rounded-xl p-8 shadow-[0_8px_40px_rgba(0,0,0,0.05)] transition-all";

            return partner.url ? (
              <a
                key={partner.id}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${cardClass} hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-[0_12px_48px_rgba(0,0,0,0.09)]`}
              >
                {content}
              </a>
            ) : (
              <div key={partner.id} className={cardClass}>
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
