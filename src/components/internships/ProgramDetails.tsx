import InfoGrid from "@/components/shared/InfoGrid";
import type { Program } from "@/lib/programs";

export default function ProgramDetails({ program }: { program: Program }) {
  return (
    <InfoGrid
      title="Program details"
      items={[
        { label: "Duration", value: program.duration },
        { label: "Format", value: program.format },
        { label: "Area", value: program.area },
        { label: "Level", value: program.level },
      ]}
    />
  );
}
