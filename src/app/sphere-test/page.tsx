import { AsciiSphere } from "@/components/ui/ascii-sphere";

export default function SphereTest() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center gap-16">
      <AsciiSphere
        className="w-[780px] h-[780px]"
        radius={320}
        nPoints={1600}
        fontSize={15}
      />
    </div>
  );
}
