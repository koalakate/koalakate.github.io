import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { MigrationPaths } from "@/components/migration-paths";
import { Analyzer } from "@/components/analyzer";
import { Converter } from "@/components/converter";
import { Services } from "@/components/services";
import { Pricing } from "@/components/pricing";
import { Guides } from "@/components/guides";
import { Cta } from "@/components/cta";
import { Footer } from "@/components/footer";
import { TextureOverlay } from "@/components/ui/texture-overlay";

export default function Home() {
  return (
    <>
      <TextureOverlay texture="noise" opacity={0.035} className="z-50" />
      <Nav />
      <main>
        <Hero />
        <Divider />
        <MigrationPaths />
        <Divider />
        <Analyzer />
        <Divider />
        <Converter />
        <Divider />
        <Services />
        <Divider />
        <Pricing />
        <Divider />
        <Guides />
        <Divider />
        <Cta />
      </main>
      <Footer />
    </>
  );
}

function Divider() {
  return <hr className="border-t border-neutral-200" />;
}

