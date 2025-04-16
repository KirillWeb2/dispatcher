"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SelectMonth, SelectDepartment } from "./components";

export const InitialData = () => {
  // Initial data for the first table
  const [mainData, setMainData] = useState([
    {
      id: 1,
      name: "Атмосферное давление",
      unit: "мм рт.ст.",
      normative: "745",
      plan: "745",
      fact: "745",
      note: "",
    },
    {
      id: 2,
      name: "Плотность",
      unit: "кг/м³",
      normative: "0,7573",
      plan: "0,7573",
      fact: "0,7573",
      note: "Ввод нормативных и плановых значений по паспортам качества газа за аналогичный месяц прошлого года.",
    },
    {
      id: 3,
      name: "Теплота сгорания низшая",
      unit: "ккал/м³",
      normative: "8,594",
      plan: "8,594",
      fact: "8,594",
      note: "Ввод факта по паспорту качества газа за отчетный месяц.",
    },
    {
      id: 4,
      name: "Содержание азота в газе",
      unit: "мол.доля %",
      normative: "0,18%",
      plan: "0,18%",
      fact: "0,18%",
      note: "",
    },
    {
      id: 5,
      name: "Содержание CO2 в газе",
      unit: "мол.доля %",
      normative: "1,52%",
      plan: "1,52%",
      fact: "1,52%",
      note: "",
    },
  ]);

  // Component data
  const [componentData, setComponentData] = useState([
    {
      id: 1,
      name: "Метан",
      formula: "CH4",
      normative: "0,9054",
      plan: "0,9054",
      fact: "0,9054",
    },
    {
      id: 2,
      name: "Этан",
      formula: "C2H6",
      normative: "0,0485",
      plan: "0,0485",
      fact: "0,0485",
    },
    {
      id: 3,
      name: "Пропан",
      formula: "C3H8",
      normative: "0,0189",
      plan: "0,0189",
      fact: "0,0189",
    },
    {
      id: 4,
      name: "Бутан",
      formula: "C4H10",
      normative: "0,0043",
      plan: "0,0043",
      fact: "0,0043",
    },
    {
      id: 5,
      name: "и-Бутан",
      formula: "C4H10",
      normative: "0,0035",
      plan: "0,0035",
      fact: "0,0035",
    },
    {
      id: 6,
      name: "Пентан",
      formula: "C5H12",
      normative: "0,0007",
      plan: "0,0007",
      fact: "0,0007",
    },
    {
      id: 7,
      name: "н-Пентан",
      formula: "C5H12",
      normative: "0,0010",
      plan: "0,0010",
      fact: "0,0010",
    },
    {
      id: 8,
      name: "Гексан",
      formula: "C6H14",
      normative: "0,0007",
      plan: "0,0007",
      fact: "0,0007",
    },
    {
      id: 9,
      name: "Азот",
      formula: "N2",
      normative: "0,0018",
      plan: "0,0018",
      fact: "0,0018",
    },
    {
      id: 10,
      name: "Двуокись углерода",
      formula: "CO2",
      normative: "0,0152",
      plan: "0,0152",
      fact: "0,0152",
    },
    {
      id: 11,
      name: "Гелий",
      formula: "He",
      normative: "0,0001",
      plan: "0,0001",
      fact: "0,0001",
    },
    {
      id: 12,
      name: "Водород",
      formula: "H2",
      normative: "0,0001",
      plan: "0,0001",
      fact: "0,0001",
    },
    {
      id: 13,
      name: "Сумма компонентов (должна = 1)",
      formula: "",
      normative: "1,0000",
      plan: "1,0000",
      fact: "1,0000",
    },
  ]);

  // Handle changes to main data
  const handleMainDataChange = (id: any, field: any, value: any) => {
    setMainData(
      mainData.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  // Handle changes to component data
  const handleComponentDataChange = (id: any, field: any, value: any) => {
    setComponentData(
      componentData.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="border-2 border-gray-300">
        <CardHeader className="bg-gray-100 border-b-2 border-gray-300 p-2">
          <CardTitle className="text-center text-lg mb-4">
            1. Исходные данные для заполнения (вводить обязательно) [СХ и ООП]
          </CardTitle>
          <div className="flex justify-center items-center gap-4">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-medium">Филиал:</span>
              <div className="w-full max-w-xs">
                <SelectDepartment />
              </div>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-medium whitespace-nowrap">
                Месяц/год:
              </span>

              <div className="w-full max-w-xs">
                <SelectMonth />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table className="border-collapse">
            <TableHeader>
              <TableRow>
                <TableHead className="border border-gray-300 text-center font-bold p-2 bg-gray-100">
                  Показатель
                </TableHead>
                <TableHead className="border border-gray-300 text-center font-bold p-2 bg-gray-100">
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
                <TableHead className="border border-gray-300 text-center font-bold p-2 bg-gray-100">
                  Примечание
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mainData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="border border-gray-300 p-2">
                    {row.name}
                  </TableCell>
                  <TableCell
                    className="border border-gray-300 p-2 text-center"
                    dangerouslySetInnerHTML={{ __html: row.unit }}
                  ></TableCell>
                  <TableCell className="border border-gray-300 p-1 text-center">
                    <input
                      type="text"
                      value={row.normative}
                      onChange={(e) =>
                        handleMainDataChange(
                          row.id,
                          "normative",
                          e.target.value
                        )
                      }
                      className="w-full text-center text-red-600 bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-red-300 p-1"
                    />
                  </TableCell>
                  <TableCell className="border border-gray-300 p-1 text-center">
                    <input
                      type="text"
                      value={row.plan}
                      onChange={(e) =>
                        handleMainDataChange(row.id, "plan", e.target.value)
                      }
                      className="w-full text-center text-green-600 bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-green-300 p-1"
                    />
                  </TableCell>
                  <TableCell className="border border-gray-300 p-1 text-center">
                    <input
                      type="text"
                      value={row.fact}
                      onChange={(e) =>
                        handleMainDataChange(row.id, "fact", e.target.value)
                      }
                      className="w-full text-center text-blue-600 bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-blue-300 p-1"
                    />
                  </TableCell>
                  <TableCell
                    className="border border-gray-300 p-2"
                    dangerouslySetInnerHTML={{
                      __html: row.note
                        .replace(
                          /нормативных/g,
                          '<span class="text-red-600">нормативных</span>'
                        )
                        .replace(
                          /плановых/g,
                          '<span class="text-green-600">плановых</span>'
                        )
                        .replace(
                          /факта/g,
                          '<span class="text-blue-600">факта</span>'
                        ),
                    }}
                  ></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-4 p-2 border border-gray-300">
            <p>
              Данные Ср.мес. Т воз (по СНиП 23-01-99 таблица 3), °С и
              продолжительность периода со средней суточной температурой воздуха
              &lt; 8 °С (по СНиП 23-01-99 таблица 1, столбец 11, стр)
            </p>
            <p className="text-red-600 font-bold mt-2">
              !!! НЕОБХОДИМО ЗАНЕСТИ ДАННЫЕ, ИНАЧЕ Kср* СЧИТАТЬСЯ НЕ БУДЕТ !!!
            </p>
          </div>

          <div>
            <div className="text-center p-2 border border-gray-300 bg-gray-100">
              <div className="font-bold">Компонентный состав</div>
              <div className="text-sm">(по паспорту)</div>
            </div>
            <Table className="border-collapse">
              <TableHeader>
                <TableRow>
                  <TableHead
                    rowSpan={2}
                    className="border border-gray-300 text-center font-bold p-2 bg-gray-100"
                  >
                    Наименование
                  </TableHead>
                  <TableHead
                    rowSpan={2}
                    className="border border-gray-300 text-center font-bold p-2 bg-gray-100"
                  >
                    Формула
                  </TableHead>
                  <TableHead
                    colSpan={3}
                    className="border border-gray-300 text-center font-bold p-2 bg-gray-100"
                  >
                    <div className="grid grid-cols-3">
                      <div className="text-red-600">Норматив</div>
                      <div className="text-green-600">План</div>
                      <div className="text-blue-600">Факт</div>
                    </div>
                  </TableHead>
                  <TableHead
                    rowSpan={2}
                    className="border border-gray-300 text-center font-bold p-2 bg-gray-100"
                  >
                    Примечание
                  </TableHead>
                </TableRow>
                <TableRow>
                  <TableHead className="border border-gray-300 text-center font-bold p-2 bg-gray-100">
                    <div className="text-red-600">Мольная доля</div>
                  </TableHead>
                  <TableHead className="border border-gray-300 text-center font-bold p-2 bg-gray-100">
                    <div className="text-green-600">Мольная доля</div>
                  </TableHead>
                  <TableHead className="border border-gray-300 text-center font-bold p-2 bg-gray-100">
                    <div className="text-blue-600">Мольная доля</div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {componentData.map((row, index) => (
                  <TableRow
                    key={row.id}
                    className={
                      index === componentData.length - 1
                        ? "bg-gray-100 font-bold"
                        : ""
                    }
                  >
                    <TableCell
                      className="border border-gray-300 p-2"
                      colSpan={row.formula ? 1 : 2}
                    >
                      {row.name}
                    </TableCell>
                    {row.formula && (
                      <TableCell className="border border-gray-300 p-2 text-center">
                        {row.formula}
                      </TableCell>
                    )}
                    <TableCell className="border border-gray-300 p-1 text-center">
                      <input
                        type="text"
                        value={row.normative}
                        onChange={(e) =>
                          handleComponentDataChange(
                            row.id,
                            "normative",
                            e.target.value
                          )
                        }
                        className="w-full text-center text-red-600 bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-red-300 p-1"
                      />
                    </TableCell>
                    <TableCell className="border border-gray-300 p-1 text-center">
                      <input
                        type="text"
                        value={row.plan}
                        onChange={(e) =>
                          handleComponentDataChange(
                            row.id,
                            "plan",
                            e.target.value
                          )
                        }
                        className="w-full text-center text-green-600 bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-green-300 p-1"
                      />
                    </TableCell>
                    <TableCell className="border border-gray-300 p-1 text-center">
                      <input
                        type="text"
                        value={row.fact}
                        onChange={(e) =>
                          handleComponentDataChange(
                            row.id,
                            "fact",
                            e.target.value
                          )
                        }
                        className="w-full text-center text-blue-600 bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-blue-300 p-1"
                      />
                    </TableCell>
                    {index < 10 ? (
                      <TableCell
                        rowSpan={index === 0 ? 10 : 0}
                        className={`border border-gray-300 p-2 align-top break-words whitespace-break-spaces ${
                          index === 0 ? "" : "hidden"
                        }`}
                      >
                        Ввод <span className="text-red-600">нормативных</span> и{" "}
                        <span className="text-green-600">плановых</span>{" "}
                        значений по паспортам качества газа за аналогичный месяц
                        прошлого года. Ввод{" "}
                        <span className="text-blue-600">факта</span> по паспорту
                        качества газа за отчетный месяц.
                      </TableCell>
                    ) : (
                      <TableCell className="border border-gray-300 p-2">
                        {index === componentData.length - 1
                          ? "* в расчетности рассчитывается по ГОСТ 30319.3"
                          : ""}
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
