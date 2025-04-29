import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { createDefaultSection, Section } from "@/lib/types";
import { SectionTable } from "./components";

export const LCH = () => {
  const [sections, setSections] = useState<Section[]>([
    createDefaultSection("Участок Приморское ЛПУМГ"),
  ]);
  const [activeTab, setActiveTab] = useState("section-0");

  const addNewSection = () => {
    const newSectionId = `section-${sections.length}`;
    setSections([
      ...sections,
      createDefaultSection(`Участок ${sections.length + 1}`),
    ]);
    setActiveTab(newSectionId);
  };

  return (
    <div className="container mx-auto mt-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Участки</h2>
        <Button onClick={addNewSection}>
          <Plus className="h-4 w-4 mr-2" />
          Добавить участок
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4 flex flex-wrap">
          {sections.map((section, index) => (
            <TabsTrigger key={`section-${index}`} value={`section-${index}`}>
              {section.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {sections.map((section, index) => (
          <TabsContent key={`section-${index}`} value={`section-${index}`}>
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-medium mb-4">{section.name}</h3>
              <SectionTable
                section={section}
                onSectionChange={(updatedSection) => {
                  const newSections = [...sections];
                  newSections[index] = updatedSection;
                  setSections(newSections);
                }}
              />
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
