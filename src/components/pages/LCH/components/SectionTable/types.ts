import { Section } from "@/lib/types";

export type SectionTableProps = {
  section: Section;
  onSectionChange: (section: Section) => void;
};
