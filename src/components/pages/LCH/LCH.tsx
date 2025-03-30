"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const LCH = () => {
  const [activeTab, setActiveTab] = useState("page1");

  // Data for the first table (MKS parameters)
  const [mksData, setMksData] = useState([
    {
      id: 1,
      name: "Коэффициент сжимаемости после выработки без МКС",
      unit: "-",
      normative: "0,997",
      plan: "0,9970",
      fact: "0,9970",
      isEditable: false,
    },
    {
      id: 2,
      name: "Избыточное давление газа после выработки с МКС участка в начале участка",
      unit: "МПа",
      normative: "0,00",
      plan: "0,00",
      fact: "0,00",
      isEditable: true,
    },
    {
      id: 3,
      name: "Температура газа после выработки с МКС участка в начале участка",
      unit: "К",
      normative: "274,00",
      plan: "274,00",
      fact: "274,00",
      isEditable: true,
    },
    {
      id: 4,
      name: "Избыточное давление газа после выработки с МКС участка в конце участка",
      unit: "МПа",
      normative: "0,00",
      plan: "0,00",
      fact: "0,00",
      isEditable: true,
    },
    {
      id: 5,
      name: "Температура газа после выработки с МКС участка в конце участка",
      unit: "К",
      normative: "274,00",
      plan: "274,00",
      fact: "274,00",
      isEditable: true,
    },
    {
      id: 6,
      name: "Среднее абсолютное давление газа после выработки с МКС",
      unit: "МПа",
      normative: "0,10",
      plan: "0,10",
      fact: "0,10",
      isEditable: true,
    },
    {
      id: 7,
      name: "Температура газа на участке средняя после выработки с МКС",
      unit: "К",
      normative: "274,00",
      plan: "274,00",
      fact: "274,00",
      isEditable: true,
    },
    {
      id: 8,
      name: "Коэффициент сжимаемости после выработки с МКС",
      unit: "-",
      normative: "0,997",
      plan: "0,9970",
      fact: "0,9970",
      isEditable: false,
    },
    {
      id: 9,
      name: "Избыточное давление газа до стравливания в начале участка",
      unit: "МПа",
      normative: "0,00",
      plan: "0,00",
      fact: "0,00",
      isEditable: true,
    },
    {
      id: 10,
      name: "Температура газа до стравливания в начале участка",
      unit: "К",
      normative: "274,00",
      plan: "274,00",
      fact: "274,00",
      isEditable: true,
    },
    {
      id: 11,
      name: "Избыточное давление газа до стравливания в конце участка",
      unit: "МПа",
      normative: "0,00",
      plan: "0,00",
      fact: "0,00",
      isEditable: true,
    },
    {
      id: 12,
      name: "Температура газа до стравливания в конце участка",
      unit: "К",
      normative: "274,00",
      plan: "274,00",
      fact: "274,00",
      isEditable: true,
    },
    {
      id: 13,
      name: "Среднее абсолютное давление газа до стравливания",
      unit: "МПа",
      normative: "0,10",
      plan: "0,10",
      fact: "0,10",
      isEditable: true,
    },
    {
      id: 14,
      name: "Температура газа на участке до стравливания средняя",
      unit: "К",
      normative: "274,00",
      plan: "274,00",
      fact: "274,00",
      isEditable: true,
    },
    {
      id: 15,
      name: "Коэффициент сжимаемости до стравливания",
      unit: "-",
      normative: "0,997",
      plan: "0,9970",
      fact: "0,9970",
      isEditable: false,
    },
  ]);

  // Data for the second table (Parameters page)
  const [parametersData, setParametersData] = useState([
    {
      id: 1,
      name: "Дат��",
      unit: "дд",
      normative: "",
      plan: "",
      fact: "",
      isEditable: false,
    },
    {
      id: 2,
      name: "Атмосферное давление",
      unit: "мм рт.ст.",
      normative: "745",
      plan: "745",
      fact: "745",
      isEditable: false,
    },
    {
      id: 3,
      name: "Плотность газа",
      unit: "кг/м³",
      normative: "0,757",
      plan: "0,757",
      fact: "0,757",
      isEditable: false,
    },
    {
      id: 4,
      name: "Теплота сгорания низшая",
      unit: "ккал/м³",
      normative: "8,594",
      plan: "8,594",
      fact: "8,594",
      isEditable: false,
    },
    {
      id: 5,
      name: "Диаметр участка (D1)",
      unit: "мм",
      normative: "150",
      plan: "150",
      fact: "150",
      isEditable: true,
    },
    {
      id: 6,
      name: "Длина участка (L1)",
      unit: "км",
      normative: "0,007",
      plan: "0,007",
      fact: "0,007",
      isEditable: true,
    },
    {
      id: 7,
      name: "Диаметр участка (D2)",
      unit: "мм",
      normative: "200",
      plan: "200",
      fact: "200",
      isEditable: true,
    },
    {
      id: 8,
      name: "Длина участка (L2)",
      unit: "км",
      normative: "1,900",
      plan: "1,900",
      fact: "1,900",
      isEditable: true,
    },
    {
      id: 9,
      name: "Диаметр участка (D3)",
      unit: "мм",
      normative: "",
      plan: "",
      fact: "0,000",
      isEditable: true,
    },
    {
      id: 10,
      name: "Длина участка (L3)",
      unit: "км",
      normative: "",
      plan: "",
      fact: "0,000",
      isEditable: true,
    },
    {
      id: 11,
      name: "Объем геометрический",
      unit: "тыс м³",
      normative: "",
      plan: "",
      fact: "",
      isEditable: false,
    },
    {
      id: 12,
      name: "Итого геометрический объем участка",
      unit: "",
      normative: "60",
      plan: "60",
      fact: "60",
      isEditable: false,
    },
  ]);

  // Data for the third table (Gas volumes)
  const [volumesData, setVolumesData] = useState([
    {
      id: 1,
      name: "Расчет ТГ МКС:",
      unit: "-",
      normative: "0,012",
      plan: "0,012",
      fact: "0,012",
      isEditable: false,
    },
    {
      id: 2,
      name: "Коэффициент расхода ТГ МКС при соединении газа из выходного участка (0,012)",
      unit: "-",
      normative: "0,012",
      plan: "0,012",
      fact: "0,012",
      isEditable: false,
    },
    {
      id: 3,
      name: "Кол-во МКС",
      unit: "шт",
      normative: "0",
      plan: "0",
      fact: "0",
      isEditable: true,
    },
    {
      id: 4,
      name: "Объем газа, содержащегося МКС",
      unit: "м³",
      normative: "0",
      plan: "0",
      fact: "0",
      isEditable: true,
    },
    {
      id: 5,
      name: "Объем газа ТГ МКС",
      unit: "м³/тыс.т/кг",
      normative: "0",
      plan: "0",
      fact: "0",
      isEditable: true,
      multipleUnits: true,
    },
    {
      id: 6,
      name: "Объем газа, вырабатываемого из участка",
      unit: "м³/тыс.т/кг",
      normative: "0",
      plan: "0",
      fact: "0",
      isEditable: true,
      multipleUnits: true,
    },
    {
      id: 7,
      name: "Количество продувок при проведении работ",
      unit: "шт",
      normative: "0",
      plan: "0",
      fact: "0",
      isEditable: true,
    },
    {
      id: 8,
      name: "Объем газа, расходуемого для удаления газовоздушной смеси по участкам",
      unit: "м³/тыс.т/кг",
      normative: "180/231/136",
      plan: "180/231/136",
      fact: "180/231/136",
      isEditable: true,
      multipleUnits: true,
    },
    {
      id: 9,
      name: "Суммарный расход газа по участкам",
      unit: "м³/тыс.т/кг",
      normative: "231",
      plan: "231",
      fact: "231",
      isEditable: true,
      multipleUnits: true,
    },
    {
      id: 10,
      name: "ИТОГО норматив",
      unit: "м³/тыс.т/кг",
      normative: "180/231/136",
      plan: "",
      fact: "",
      isEditable: false,
      multipleUnits: true,
    },
    {
      id: 11,
      name: "ИТОГО план",
      unit: "м³/тыс.т/кг",
      normative: "",
      plan: "180/231/136",
      fact: "",
      isEditable: false,
      multipleUnits: true,
    },
    {
      id: 12,
      name: "ИТОГО факт",
      unit: "м³/тыс.т/кг",
      normative: "",
      plan: "",
      fact: "180/231/136",
      isEditable: false,
      multipleUnits: true,
    },
  ]);

  // Data for the fourth table (Gas bleeding act)
  const [bleedingData, setBleedingData] = useState<any>({
    normative: Array(21).fill("0"),
    plan: Array(21).fill("0"),
    fact: Array(21).fill("0"),
  });

  // Handle changes to MKS data
  const handleMksDataChange = (id: any, field: any, value: any) => {
    setMksData(
      mksData.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  // Handle changes to parameters data
  const handleParametersDataChange = (id: any, field: any, value: any) => {
    setParametersData(
      parametersData.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  // Handle changes to volumes data
  const handleVolumesDataChange = (id: any, field: any, value: any) => {
    setVolumesData(
      volumesData.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  // Handle changes to bleeding data
  const handleBleedingDataChange = (type: any, index: any, value: any) => {
    setBleedingData({
      ...bleedingData,
      [type]: bleedingData[type].map((item: any, i: any) =>
        i === index ? value : item
      ),
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <a
          href="#"
          className="bg-blue-900 text-white px-4 py-2 block text-center font-bold"
        >
          На главную
        </a>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
        <TabsList className="w-full">
          <TabsTrigger value="page1" className="flex-1">
            Страница 1
          </TabsTrigger>
          <TabsTrigger value="page2" className="flex-1">
            Страница 2
          </TabsTrigger>
          <TabsTrigger value="page3" className="flex-1">
            Страница 3
          </TabsTrigger>
          <TabsTrigger value="page4" className="flex-1">
            АКТ
          </TabsTrigger>
        </TabsList>

        {/* Page 1 - MKS Parameters */}
        <TabsContent value="page1">
          <Card className="border-2 border-gray-300">
            <CardContent className="p-0">
              <Table className="border-collapse">
                <TableHeader>
                  <TableRow>
                    <TableHead className="border border-gray-300 text-center font-bold p-2 bg-gray-100 w-1/2">
                      Показатель
                    </TableHead>
                    <TableHead className="border border-gray-300 text-center font-bold p-2 bg-gray-100 w-16">
                      Ед.изм
                    </TableHead>
                    <TableHead className="border border-gray-300 text-center font-bold p-2 bg-gray-100">
                      <span className="text-red-600">Норматив</span>
                    </TableHead>
                    <TableHead className="border border-gray-300 text-center font-bold p-2 bg-gray-100">
                      <span className="text-green-600">План</span>
                    </TableHead>
                    <TableHead className="border border-gray-300 text-center font-bold p-2 bg-gray-100">
                      <span className="text-blue-600">Факт</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mksData.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="border border-gray-300 p-2">
                        <span className={row.isEditable ? "text-blue-600" : ""}>
                          {row.name}
                        </span>
                      </TableCell>
                      <TableCell className="border border-gray-300 p-2 text-center">
                        {row.unit}
                      </TableCell>
                      <TableCell className="border border-gray-300 p-1 text-center">
                        {row.isEditable ? (
                          <input
                            type="text"
                            value={row.normative}
                            onChange={(e) =>
                              handleMksDataChange(
                                row.id,
                                "normative",
                                e.target.value
                              )
                            }
                            className="w-full text-center text-red-600 bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-red-300 p-1"
                          />
                        ) : (
                          <span className="text-red-600">{row.normative}</span>
                        )}
                      </TableCell>
                      <TableCell className="border border-gray-300 p-1 text-center">
                        {row.isEditable ? (
                          <input
                            type="text"
                            value={row.plan}
                            onChange={(e) =>
                              handleMksDataChange(
                                row.id,
                                "plan",
                                e.target.value
                              )
                            }
                            className="w-full text-center text-green-600 bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-green-300 p-1"
                          />
                        ) : (
                          <span className="text-green-600">{row.plan}</span>
                        )}
                      </TableCell>
                      <TableCell className="border border-gray-300 p-1 text-center">
                        {row.isEditable ? (
                          <input
                            type="text"
                            value={row.fact}
                            onChange={(e) =>
                              handleMksDataChange(
                                row.id,
                                "fact",
                                e.target.value
                              )
                            }
                            className="w-full text-center text-blue-600 bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-blue-300 p-1"
                          />
                        ) : (
                          <span className="text-blue-600">{row.fact}</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Page 2 - Parameters */}
        <TabsContent value="page2">
          <Card className="border-2 border-gray-300">
            <CardHeader className="bg-gray-100 border-b-2 border-gray-300 p-2">
              <CardTitle className="text-center text-lg">
                <div className="text-blue-600">
                  Расчетные ГРС на участке от АУ 12127 до коллектора АУ 2 (ГРС
                  Дальнереченск)
                </div>
                <div className="font-normal text-base mt-1">Параметры</div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table className="border-collapse">
                <TableHeader>
                  <TableRow>
                    <TableHead className="border border-gray-300 text-center font-bold p-2 bg-gray-100 w-1/2">
                      Параметры
                    </TableHead>
                    <TableHead className="border border-gray-300 text-center font-bold p-2 bg-gray-100 w-16">
                      Ед.изм
                    </TableHead>
                    <TableHead className="border border-gray-300 text-center font-bold p-2 bg-gray-100">
                      <span className="text-red-600">Норматив</span>
                    </TableHead>
                    <TableHead className="border border-gray-300 text-center font-bold p-2 bg-gray-100">
                      <span className="text-green-600">План</span>
                    </TableHead>
                    <TableHead className="border border-gray-300 text-center font-bold p-2 bg-gray-100">
                      <span className="text-blue-600">Факт</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {parametersData.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="border border-gray-300 p-2">
                        <span className={row.isEditable ? "text-blue-600" : ""}>
                          {row.name}
                        </span>
                      </TableCell>
                      <TableCell className="border border-gray-300 p-2 text-center text-blue-600">
                        {row.unit}
                      </TableCell>
                      <TableCell className="border border-gray-300 p-1 text-center">
                        {row.isEditable ? (
                          <input
                            type="text"
                            value={row.normative}
                            onChange={(e) =>
                              handleParametersDataChange(
                                row.id,
                                "normative",
                                e.target.value
                              )
                            }
                            className="w-full text-center text-red-600 bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-red-300 p-1"
                          />
                        ) : (
                          <span className="text-red-600">{row.normative}</span>
                        )}
                      </TableCell>
                      <TableCell className="border border-gray-300 p-1 text-center">
                        {row.isEditable ? (
                          <input
                            type="text"
                            value={row.plan}
                            onChange={(e) =>
                              handleParametersDataChange(
                                row.id,
                                "plan",
                                e.target.value
                              )
                            }
                            className="w-full text-center text-green-600 bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-green-300 p-1"
                          />
                        ) : (
                          <span className="text-green-600">{row.plan}</span>
                        )}
                      </TableCell>
                      <TableCell className="border border-gray-300 p-1 text-center">
                        {row.isEditable ? (
                          <input
                            type="text"
                            value={row.fact}
                            onChange={(e) =>
                              handleParametersDataChange(
                                row.id,
                                "fact",
                                e.target.value
                              )
                            }
                            className="w-full text-center text-blue-600 bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-blue-300 p-1"
                          />
                        ) : (
                          <span className="text-blue-600">{row.fact}</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Page 3 - Volumes */}
        <TabsContent value="page3">
          <Card className="border-2 border-gray-300">
            <CardHeader className="bg-gray-100 border-b-2 border-gray-300 p-2">
              <CardTitle className="text-center text-lg">
                <div className="font-normal text-base">Страница 3</div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table className="border-collapse">
                <TableHeader>
                  <TableRow>
                    <TableHead className="border border-gray-300 text-center font-bold p-2 bg-gray-100 w-1/2">
                      Показатель
                    </TableHead>
                    <TableHead className="border border-gray-300 text-center font-bold p-2 bg-gray-100 w-16">
                      Ед.изм
                    </TableHead>
                    <TableHead className="border border-gray-300 text-center font-bold p-2 bg-gray-100">
                      <span className="text-red-600">Норматив</span>
                    </TableHead>
                    <TableHead className="border border-gray-300 text-center font-bold p-2 bg-gray-100">
                      <span className="text-green-600">План</span>
                    </TableHead>
                    <TableHead className="border border-gray-300 text-center font-bold p-2 bg-gray-100">
                      <span className="text-blue-600">Факт</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {volumesData.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="border border-gray-300 p-2">
                        <span className={row.isEditable ? "text-blue-600" : ""}>
                          {row.name}
                        </span>
                      </TableCell>
                      <TableCell className="border border-gray-300 p-2 text-center">
                        {row.multipleUnits ? (
                          <div className="grid grid-rows-3 gap-1">
                            <div className="text-blue-600">м³</div>
                            <div className="text-blue-600">тыс.т</div>
                            <div className="text-blue-600">кг</div>
                          </div>
                        ) : (
                          <span className="text-blue-600">{row.unit}</span>
                        )}
                      </TableCell>
                      <TableCell className="border border-gray-300 p-1 text-center">
                        {row.isEditable ? (
                          <input
                            type="text"
                            value={row.normative}
                            onChange={(e) =>
                              handleVolumesDataChange(
                                row.id,
                                "normative",
                                e.target.value
                              )
                            }
                            className="w-full text-center text-red-600 bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-red-300 p-1"
                          />
                        ) : (
                          <span className="text-red-600">{row.normative}</span>
                        )}
                      </TableCell>
                      <TableCell className="border border-gray-300 p-1 text-center">
                        {row.isEditable ? (
                          <input
                            type="text"
                            value={row.plan}
                            onChange={(e) =>
                              handleVolumesDataChange(
                                row.id,
                                "plan",
                                e.target.value
                              )
                            }
                            className="w-full text-center text-green-600 bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-green-300 p-1"
                          />
                        ) : (
                          <span className="text-green-600">{row.plan}</span>
                        )}
                      </TableCell>
                      <TableCell className="border border-gray-300 p-1 text-center">
                        {row.isEditable ? (
                          <input
                            type="text"
                            value={row.fact}
                            onChange={(e) =>
                              handleVolumesDataChange(
                                row.id,
                                "fact",
                                e.target.value
                              )
                            }
                            className="w-full text-center text-blue-600 bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-blue-300 p-1"
                          />
                        ) : (
                          <span className="text-blue-600">{row.fact}</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Page 4 - Gas Bleeding Act */}
        <TabsContent value="page4">
          <Card className="border-2 border-gray-300">
            <CardHeader className="bg-red-100 border-b-2 border-gray-300 p-2">
              <CardTitle className="text-center text-2xl text-red-600 font-bold">
                АКТ на стравливание газа
              </CardTitle>
              <div className="text-center text-sm mt-2">
                филиалом ООО 'Газпром трансгаз Томск' Приморское ЛПУ МГ(МГ)
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table className="border-collapse w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead
                        className="border border-gray-300 text-center font-bold p-2 bg-gray-100"
                        rowSpan={2}
                      >
                        Атрибут
                      </TableHead>
                      <TableHead
                        className="border border-gray-300 text-center font-bold p-2 bg-gray-100"
                        rowSpan={2}
                      >
                        ЕИ
                      </TableHead>
                      <TableHead
                        className="border border-gray-300 text-center font-bold p-2 bg-gray-100"
                        colSpan={21}
                      >
                        Ввод по месяцам
                      </TableHead>
                    </TableRow>
                    <TableRow>
                      {Array.from({ length: 21 }, (_, i) => (
                        <TableHead
                          key={i}
                          className="border border-gray-300 text-center font-bold p-2 bg-gray-100"
                        >
                          {i + 1}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell
                        className="border border-gray-300 p-2 text-red-600 font-bold"
                        colSpan={2}
                      >
                        Ежесуточный расход газа - НОРМА
                      </TableCell>
                      {bleedingData.normative.map((value: any, index: any) => (
                        <TableCell
                          key={index}
                          className="border border-gray-300 p-1 text-center"
                        >
                          <input
                            type="text"
                            value={value}
                            onChange={(e) =>
                              handleBleedingDataChange(
                                "normative",
                                index,
                                e.target.value
                              )
                            }
                            className="w-full text-center text-red-600 bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-red-300 p-1"
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell
                        className="border border-gray-300 p-2 text-green-600 font-bold"
                        colSpan={2}
                      >
                        Ежесуточный расход газа - ПЛАН
                      </TableCell>
                      {bleedingData.plan.map((value: any, index: any) => (
                        <TableCell
                          key={index}
                          className="border border-gray-300 p-1 text-center"
                        >
                          <input
                            type="text"
                            value={value}
                            onChange={(e) =>
                              handleBleedingDataChange(
                                "plan",
                                index,
                                e.target.value
                              )
                            }
                            className="w-full text-center text-green-600 bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-green-300 p-1"
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell
                        className="border border-gray-300 p-2 text-blue-600 font-bold"
                        colSpan={2}
                      >
                        Ежесуточный расход газа - ФАКТ
                      </TableCell>
                      {bleedingData.fact.map((value: any, index: any) => (
                        <TableCell
                          key={index}
                          className="border border-gray-300 p-1 text-center"
                        >
                          <input
                            type="text"
                            value={value}
                            onChange={(e) =>
                              handleBleedingDataChange(
                                "fact",
                                index,
                                e.target.value
                              )
                            }
                            className="w-full text-center text-blue-600 bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-blue-300 p-1"
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <div className="mt-4 p-2 border border-gray-300">
                <p className="text-sm">
                  <span className="font-bold">Примечание:</span> 1) при
                  отсутствии процесса выработки газа с помощью МОБИЛЬНОЙ КС
                  избыточное давление газа по окончанию МОБИЛЬНОЙ КС должно быть
                  равно избыточному давлению до стравливания
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
