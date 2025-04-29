"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import {
  type Section,
  createDiameterLength,
  type ColumnValue,
  Parameter,
} from "@/lib/types";
import { useEffect } from "react";

interface SectionTableProps {
  section: Section;
  onSectionChange: (section: Section) => void;
}

export function SectionTable({ section, onSectionChange }: SectionTableProps) {
  // Обработчик изменения значения параметра
  const handleValueChange = (
    paramKey: string,
    column: "normative" | "plan" | "fact",
    value: string | number
  ) => {
    const updatedSection = { ...section };
    const param = updatedSection.parameters.find((p) => p.key === paramKey);

    if (param && param.values[column].editable) {
      param.values[column].value = value;
      onSectionChange(updatedSection);
    }
  };

  // Обработчик изменения значения диаметра/длины
  const handleDiameterLengthChange = (
    index: number,
    field: "diameter" | "length",
    column: "normative" | "plan" | "fact",
    value: string | number
  ) => {
    const updatedSection = { ...section };
    const diameterLength = updatedSection.diameterLengths[index];

    if (diameterLength && diameterLength[field].values[column].editable) {
      diameterLength[field].values[column].value = value;
      onSectionChange(updatedSection);
    }
  };

  // Добавление новой пары диаметр/длина
  const addDiameterLength = () => {
    const updatedSection = { ...section };
    // @ts-ignore
    updatedSection.diameterLengths.push(
      // @ts-ignore
      createDiameterLength(updatedSection.diameterLengths.length + 1)
    );
    onSectionChange(updatedSection);
  };

  // Обработчик изменения способа выработки
  const handleSelectChange = (value: string) => {
    const updatedSection = { ...section };
    const param = updatedSection.parameters.find(
      (p) => p.key === "exhaustionMethod"
    );

    if (param) {
      param.values.normative.value = value;
      param.values.plan.value = value;
      param.values.fact.value = value;
      onSectionChange(updatedSection);
    }
  };

  // Функция для расчета значений на основе формул
  useEffect(() => {
    // Создаем копию секции для обновления
    const updatedSection = JSON.parse(JSON.stringify(section));
    let hasChanges = false;

    // Расчет общего геометрического объема
    const calculateTotalGeometricVolume = () => {
      const geometricVolume = updatedSection.parameters.find(
        (p: any) => p.key === "geometricVolume"
      );
      if (geometricVolume) {
        const totalGeometricVolume = updatedSection.parameters.find(
          (p: any) => p.key === "totalGeometricVolume"
        );
        if (totalGeometricVolume) {
          // Пример расчета: умножаем на 1000 (из тыс. м³ в м³)
          const normValue =
            Number(geometricVolume.values.normative.value) * 1000;
          const planValue = Number(geometricVolume.values.plan.value) * 1000;
          const factValue = Number(geometricVolume.values.fact.value) * 1000;

          if (
            totalGeometricVolume.values.normative.value !== normValue &&
            !isNaN(normValue) &&
            geometricVolume.values.normative.value
          ) {
            totalGeometricVolume.values.normative.value = normValue;
            hasChanges = true;
          }
          if (
            totalGeometricVolume.values.plan.value !== planValue &&
            !isNaN(planValue) &&
            geometricVolume.values.plan.value
          ) {
            totalGeometricVolume.values.plan.value = planValue;
            hasChanges = true;
          }
          if (
            totalGeometricVolume.values.fact.value !== factValue &&
            !isNaN(factValue) &&
            geometricVolume.values.fact.value
          ) {
            totalGeometricVolume.values.fact.value = factValue;
            hasChanges = true;
          }
        }
      }
    };

    // Расчет среднего давления
    const calculateAveragePressure = () => {
      const startPressure = updatedSection.parameters.find(
        (p: any) => p.key === "excessPressureBeforeDisconnectStart"
      );
      const endPressure = updatedSection.parameters.find(
        (p: any) => p.key === "excessPressureBeforeDisconnectEnd"
      );
      const avgPressure = updatedSection.parameters.find(
        (p: any) => p.key === "averageAbsolutePressureBeforeDisconnect"
      );

      if (startPressure && endPressure && avgPressure) {
        // Пример расчета: среднее значение + 0.1 (для учета атмосферного давления)
        const calculateAvg = (start: any, end: any) => {
          const startNum = Number(start);
          const endNum = Number(end);
          if (isNaN(startNum) || isNaN(endNum)) return "";
          return (startNum + endNum) / 2 + 0.1;
        };

        const normValue = calculateAvg(
          startPressure.values.normative.value,
          endPressure.values.normative.value
        );
        const planValue = calculateAvg(
          startPressure.values.plan.value,
          endPressure.values.plan.value
        );
        const factValue = calculateAvg(
          startPressure.values.fact.value,
          endPressure.values.fact.value
        );

        if (normValue && avgPressure.values.normative.value !== normValue) {
          avgPressure.values.normative.value = normValue;
          hasChanges = true;
        }
        if (planValue && avgPressure.values.plan.value !== planValue) {
          avgPressure.values.plan.value = planValue;
          hasChanges = true;
        }
        if (factValue && avgPressure.values.fact.value !== factValue) {
          avgPressure.values.fact.value = factValue;
          hasChanges = true;
        }
      }
    };

    // Расчет средней температуры
    const calculateAverageTemperature = () => {
      const startTemp = updatedSection.parameters.find(
        (p: any) => p.key === "temperatureBeforeDisconnectStart"
      );
      const endTemp = updatedSection.parameters.find(
        (p: any) => p.key === "temperatureBeforeDisconnectEnd"
      );
      const avgTemp = updatedSection.parameters.find(
        (p: any) => p.key === "averageTemperatureBeforeDisconnect"
      );

      if (startTemp && endTemp && avgTemp) {
        // Пример расчета: среднее значение
        const calculateAvg = (start: any, end: any) => {
          const startNum = Number(start);
          const endNum = Number(end);
          if (isNaN(startNum) || isNaN(endNum)) return "";
          return (startNum + endNum) / 2;
        };

        const normValue = calculateAvg(
          startTemp.values.normative.value,
          endTemp.values.normative.value
        );
        const planValue = calculateAvg(
          startTemp.values.plan.value,
          endTemp.values.plan.value
        );
        const factValue = calculateAvg(
          startTemp.values.fact.value,
          endTemp.values.fact.value
        );

        if (normValue && avgTemp.values.normative.value !== normValue) {
          avgTemp.values.normative.value = normValue;
          hasChanges = true;
        }
        if (planValue && avgTemp.values.plan.value !== planValue) {
          avgTemp.values.plan.value = planValue;
          hasChanges = true;
        }
        if (factValue && avgTemp.values.fact.value !== factValue) {
          avgTemp.values.fact.value = factValue;
          hasChanges = true;
        }
      }
    };

    // Расчет процента выработки газа
    const calculateGasExhaustionPercentage = () => {
      const pressureBefore = updatedSection.parameters.find(
        (p: any) => p.key === "averageAbsolutePressureBeforeDisconnect"
      );
      const pressureAfter = updatedSection.parameters.find(
        (p: Parameter) =>
          p.key === "excessPressureAfterExhaustionWithoutMKSStartEditable"
      );
      const percentage = updatedSection.parameters.find(
        (p: any) => p.key === "gasExhaustionPercentage"
      );

      if (pressureBefore && pressureAfter && percentage) {
        // Пример расчета: (1 - после/до) * 100%
        const calculatePercentage = (before: string, after: string) => {
          const beforeNum = Number(before);
          const afterNum = Number(after);
          if (isNaN(beforeNum) || isNaN(afterNum) || beforeNum === 0) return "";
          return ((1 - (afterNum + 0.1) / beforeNum) * 100).toFixed(2);
        };

        const normValue = calculatePercentage(
          pressureBefore.values.normative.value,
          pressureAfter.values.normative.value
        );
        const planValue = calculatePercentage(
          pressureBefore.values.plan.value,
          pressureAfter.values.plan.value
        );
        const factValue = calculatePercentage(
          pressureBefore.values.fact.value,
          pressureAfter.values.fact.value
        );

        if (normValue && percentage.values.normative.value !== normValue) {
          percentage.values.normative.value = normValue;
          hasChanges = true;
        }
        if (planValue && percentage.values.plan.value !== planValue) {
          percentage.values.plan.value = planValue;
          hasChanges = true;
        }
        if (factValue && percentage.values.fact.value !== factValue) {
          percentage.values.fact.value = factValue;
          hasChanges = true;
        }
      }
    };

    // Выполняем все расчеты
    calculateTotalGeometricVolume();
    calculateAveragePressure();
    calculateAverageTemperature();
    calculateGasExhaustionPercentage();

    // Если были изменения, обновляем секцию
    if (hasChanges) {
      onSectionChange(updatedSection);
    }
  }, [
    // Зависимости для геометрического объема
    section.parameters.find((p) => p.key === "geometricVolume")?.values
      .normative.value,
    section.parameters.find((p) => p.key === "geometricVolume")?.values.plan
      .value,
    section.parameters.find((p) => p.key === "geometricVolume")?.values.fact
      .value,

    // Зависимости для среднего давления
    section.parameters.find(
      (p) => p.key === "excessPressureBeforeDisconnectStart"
    )?.values.normative.value,
    section.parameters.find(
      (p) => p.key === "excessPressureBeforeDisconnectStart"
    )?.values.plan.value,
    section.parameters.find(
      (p) => p.key === "excessPressureBeforeDisconnectStart"
    )?.values.fact.value,
    section.parameters.find(
      (p) => p.key === "excessPressureBeforeDisconnectEnd"
    )?.values.normative.value,
    section.parameters.find(
      (p) => p.key === "excessPressureBeforeDisconnectEnd"
    )?.values.plan.value,
    section.parameters.find(
      (p) => p.key === "excessPressureBeforeDisconnectEnd"
    )?.values.fact.value,

    // Зависимости для средней температуры
    section.parameters.find((p) => p.key === "temperatureBeforeDisconnectStart")
      ?.values.normative.value,
    section.parameters.find((p) => p.key === "temperatureBeforeDisconnectStart")
      ?.values.plan.value,
    section.parameters.find((p) => p.key === "temperatureBeforeDisconnectStart")
      ?.values.fact.value,
    section.parameters.find((p) => p.key === "temperatureBeforeDisconnectEnd")
      ?.values.normative.value,
    section.parameters.find((p) => p.key === "temperatureBeforeDisconnectEnd")
      ?.values.plan.value,
    section.parameters.find((p) => p.key === "temperatureBeforeDisconnectEnd")
      ?.values.fact.value,

    // Зависимости для процента выработки газа
    section.parameters.find(
      (p) => p.key === "averageAbsolutePressureBeforeDisconnect"
    )?.values.normative.value,
    section.parameters.find(
      (p) => p.key === "averageAbsolutePressureBeforeDisconnect"
    )?.values.plan.value,
    section.parameters.find(
      (p) => p.key === "averageAbsolutePressureBeforeDisconnect"
    )?.values.fact.value,
    section.parameters.find(
      (p) => p.key === "excessPressureAfterExhaustionWithoutMKSStartEditable"
    )?.values.normative.value,
    section.parameters.find(
      (p) => p.key === "excessPressureAfterExhaustionWithoutMKSStartEditable"
    )?.values.plan.value,
    section.parameters.find(
      (p) => p.key === "excessPressureAfterExhaustionWithoutMKSStartEditable"
    )?.values.fact.value,
  ]);

  // Функция для рендеринга ячейки в зависимости от редактируемости
  const renderCell = (
    columnValue: ColumnValue,
    onChange?: (value: string | number) => void
  ) => {
    if (columnValue.editable && onChange) {
      return (
        <TableCell className="border">
          <Input
            type={typeof columnValue.value === "number" ? "number" : "text"}
            value={columnValue.value || ""}
            onChange={(e) => {
              const value =
                typeof columnValue.value === "number"
                  ? Number.parseFloat(e.target.value)
                  : e.target.value;
              onChange(value);
            }}
          />
        </TableCell>
      );
    } else {
      return (
        <TableCell className="border bg-gray-100">
          {columnValue.value || ""}
        </TableCell>
      );
    }
  };

  // Функция для рендеринга строки параметра
  const renderParameterRow = (paramKey: string, showName = true) => {
    const param = section.parameters.find((p) => p.key === paramKey);
    if (!param) return null;

    return (
      <TableRow>
        {showName && (
          <TableCell className="font-medium border">{param.name}</TableCell>
        )}
        {showName && <TableCell className="border">{param.unit}</TableCell>}
        {renderCell(param.values.normative, (value) =>
          handleValueChange(paramKey, "normative", value)
        )}
        {renderCell(param.values.plan, (value) =>
          handleValueChange(paramKey, "plan", value)
        )}
        {renderCell(param.values.fact, (value) =>
          handleValueChange(paramKey, "fact", value)
        )}
      </TableRow>
    );
  };

  // Функция для рендеринга двойной строки параметра (с редактируемой и нередактируемой частями)
  const renderDoubleParameterRow = (
    nonEditableKey: string,
    editableKey: string
  ) => {
    const nonEditableParam = section.parameters.find(
      (p) => p.key === nonEditableKey
    );
    const editableParam = section.parameters.find((p) => p.key === editableKey);

    if (!nonEditableParam || !editableParam) return null;

    return (
      <>
        <TableRow>
          <TableCell className="font-medium border" rowSpan={2}>
            {nonEditableParam.name}
          </TableCell>
          <TableCell className="border" rowSpan={2}>
            {nonEditableParam.unit}
          </TableCell>
          {renderCell(nonEditableParam.values.normative)}
          {renderCell(nonEditableParam.values.plan)}
          {renderCell(nonEditableParam.values.fact)}
        </TableRow>
        <TableRow>
          {renderCell(editableParam.values.normative, (value) =>
            handleValueChange(editableKey, "normative", value)
          )}
          {renderCell(editableParam.values.plan, (value) =>
            handleValueChange(editableKey, "plan", value)
          )}
          {renderCell(editableParam.values.fact, (value) =>
            handleValueChange(editableKey, "fact", value)
          )}
        </TableRow>
      </>
    );
  };

  return (
    <div className="overflow-x-auto">
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead rowSpan={2} className="border">
              Параметры
            </TableHead>
            <TableHead rowSpan={2} className="border">
              Ед. измерения
            </TableHead>
            <TableHead colSpan={3} className="text-center border">
              {section.name}
            </TableHead>
          </TableRow>
          <TableRow>
            <TableHead className="border">Норматив</TableHead>
            <TableHead className="border">План</TableHead>
            <TableHead className="border">Факт</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* 1. Дата */}
          {renderParameterRow("date")}

          {/* 2. Атмосферное давление */}
          {renderDoubleParameterRow(
            "atmosphericPressure",
            "atmosphericPressureEditable"
          )}

          {/* 3. Плотность газа */}
          {renderDoubleParameterRow("gasDensity", "gasDensityEditable")}

          {/* 4. Теплота сгорания низшая */}
          {renderDoubleParameterRow(
            "lowerHeatingValue",
            "lowerHeatingValueEditable"
          )}

          {/* 5-6. Диаметр и длина участков */}
          {section.diameterLengths.map((item, index) => (
            <>
              <TableRow key={`diameter-${index}`}>
                <TableCell className="font-medium border">
                  Диаметр участка L{index + 1}
                </TableCell>
                <TableCell className="border">мм</TableCell>
                {renderCell(item.diameter.values.normative, (value) =>
                  handleDiameterLengthChange(
                    index,
                    "diameter",
                    "normative",
                    value
                  )
                )}
                {renderCell(item.diameter.values.plan, (value) =>
                  handleDiameterLengthChange(index, "diameter", "plan", value)
                )}
                {renderCell(item.diameter.values.fact, (value) =>
                  handleDiameterLengthChange(index, "diameter", "fact", value)
                )}
              </TableRow>
              <TableRow key={`length-${index}`}>
                <TableCell className="font-medium border">
                  Длина участка L{index + 1}
                </TableCell>
                <TableCell className="border">км</TableCell>
                {renderCell(item.length.values.normative, (value) =>
                  handleDiameterLengthChange(
                    index,
                    "length",
                    "normative",
                    value
                  )
                )}
                {renderCell(item.length.values.plan, (value) =>
                  handleDiameterLengthChange(index, "length", "plan", value)
                )}
                {renderCell(item.length.values.fact, (value) =>
                  handleDiameterLengthChange(index, "length", "fact", value)
                )}
              </TableRow>
            </>
          ))}

          {/* Кнопка добавления диаметра и длины */}
          <TableRow>
            <TableCell colSpan={5} className="border">
              <Button
                variant="outline"
                size="sm"
                onClick={addDiameterLength}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Добавить диаметр и длину участка
              </Button>
            </TableCell>
          </TableRow>

          {/* 7. Объём геометрический */}
          {renderParameterRow("geometricVolume")}

          {/* 8. Итого геометрический объём участка */}
          {renderParameterRow("totalGeometricVolume")}

          {/* 9. Избыточное давление газа до отключения участка в начале участка */}
          {renderParameterRow("excessPressureBeforeDisconnectStart")}

          {/* 10. Температура газа до отключения участка в начале участка */}
          {renderParameterRow("temperatureBeforeDisconnectStart")}

          {/* 11. Избыточное давление газа до отключения участка в конце участка */}
          {renderParameterRow("excessPressureBeforeDisconnectEnd")}

          {/* 12. Температура газа до отключения участка в конце участка */}
          {renderParameterRow("temperatureBeforeDisconnectEnd")}

          {/* 13. Среднее абсолютное давление газа до отключения участка */}
          {renderParameterRow("averageAbsolutePressureBeforeDisconnect")}

          {/* 14. Температура газа на участке до отключения средняя */}
          {renderParameterRow("averageTemperatureBeforeDisconnect")}

          {/* 15. Коэффициент сжимаемости до отключения */}
          {renderParameterRow("compressibilityFactorBeforeDisconnect")}

          {/* 16. Способ выработки без МКС */}
          <TableRow>
            <TableCell className="font-medium border">
              Способ выработки без МКС (ГРС, перепуск....)
            </TableCell>
            <TableCell className="border">-</TableCell>
            <TableCell className="border" colSpan={3}>
              <Select
                value={
                  (section.parameters.find((p) => p.key === "exhaustionMethod")
                    ?.values.normative.value as string) || ""
                }
                onValueChange={handleSelectChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите способ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ГРС">ГРС</SelectItem>
                  <SelectItem value="перепуск">Перепуск</SelectItem>
                  <SelectItem value="муфты">Муфты</SelectItem>
                  <SelectItem value="МКС">МКС</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
          </TableRow>

          {/* 17. Избыточное давление газа после выработки без МКС учатска в начале участка */}
          {renderDoubleParameterRow(
            "excessPressureAfterExhaustionWithoutMKSStart",
            "excessPressureAfterExhaustionWithoutMKSStartEditable"
          )}

          {/* 18. Температура газа после выработки без МКС учатска в начале участка */}
          {renderDoubleParameterRow(
            "temperatureAfterExhaustionWithoutMKSStart",
            "temperatureAfterExhaustionWithoutMKSStartEditable"
          )}

          {/* 19. Избыточное давление газа после выработки без МКС участка в конце участка */}
          {renderDoubleParameterRow(
            "excessPressureAfterExhaustionWithoutMKSEnd",
            "excessPressureAfterExhaustionWithoutMKSEndEditable"
          )}

          {/* 20. Температура газа после выработки без МКС учатска в конце участка */}
          {renderDoubleParameterRow(
            "temperatureAfterExhaustionWithoutMKSEnd",
            "temperatureAfterExhaustionWithoutMKSEndEditable"
          )}

          {/* 21. Среднее абсолютное давление газа после выработки без МКС */}
          {renderParameterRow(
            "averageAbsolutePressureAfterExhaustionWithoutMKS"
          )}

          {/* 22. Температура газа на участке средняя после выработки без МКС */}
          {renderParameterRow("averageTemperatureAfterExhaustionWithoutMKS")}

          {/* 23. Коэффициент сжимаемости после выработки без МКС */}
          {renderDoubleParameterRow(
            "compressibilityFactorAfterExhaustionWithoutMKS",
            "compressibilityFactorAfterExhaustionWithoutMKSEditable"
          )}

          {/* 24. Избыточное давление газа после выработки с МКС учатска в начале участка */}
          {renderDoubleParameterRow(
            "excessPressureAfterExhaustionWithMKSStart",
            "excessPressureAfterExhaustionWithMKSStartEditable"
          )}

          {/* 25. Температура газа после выработки с МКС учатска в начале участка */}
          {renderDoubleParameterRow(
            "temperatureAfterExhaustionWithMKSStart",
            "temperatureAfterExhaustionWithMKSStartEditable"
          )}

          {/* 26. Избыточное давление газа после выработки с МКС участка в конце участка */}
          {renderDoubleParameterRow(
            "excessPressureAfterExhaustionWithMKSEnd",
            "excessPressureAfterExhaustionWithMKSEndEditable"
          )}

          {/* 27. Температура газа после выработки с МКС учатска в конце участка */}
          {renderDoubleParameterRow(
            "temperatureAfterExhaustionWithMKSEnd",
            "temperatureAfterExhaustionWithMKSEndEditable"
          )}

          {/* 28. Среднее абсолютное давление газа после выработки с МКС */}
          {renderParameterRow("averageAbsolutePressureAfterExhaustionWithMKS")}

          {/* 29. Температура газа на участке средняя после выработки с МКС */}
          {renderParameterRow("averageTemperatureAfterExhaustionWithMKS")}

          {/* 30. Коэффициент сжимаемости после выработки с МКС */}
          {renderDoubleParameterRow(
            "compressibilityFactorAfterExhaustionWithMKS",
            "compressibilityFactorAfterExhaustionWithMKSEditable"
          )}

          {/* 31. Избыточное давление газа до стравливания в начале участка */}
          {renderParameterRow("excessPressureBeforeVenting")}

          {/* 32. Температура газа до стравливания в начале участка */}
          {renderParameterRow("temperatureBeforeVenting")}

          {/* 33. Избыточное давление газа до стравливания в конце участка */}
          {renderParameterRow("excessPressureBeforeVentingEnd")}

          {/* 34. Температура газа до стравливания в конце участка */}
          {renderParameterRow("temperatureBeforeVentingEnd")}

          {/* 35. Среднее абсолютное давление газа до стравливания */}
          {renderParameterRow("averageAbsolutePressureBeforeVenting")}

          {/* 36. Температура газа на участке до стравливания средняя */}
          {renderParameterRow("averageTemperatureBeforeVenting")}

          {/* 37. Коэффициент сжимаемости до стравливания */}
          {renderParameterRow("compressibilityFactorBeforeVenting")}

          {/* 38. Избыточное давление газа после стравливания в начале участка */}
          {renderParameterRow("excessPressureAfterVentingStart")}

          {/* 39. Температура газа после стравливания в начале участка */}
          {renderParameterRow("temperatureAfterVentingStart")}

          {/* 40. Избыточное давление газа после страливания в конце участка */}
          {renderParameterRow("excessPressureAfterVentingEnd")}

          {/* 41. Температура газа после стравливания в конце участка */}
          {renderParameterRow("temperatureAfterVentingEnd")}

          {/* 42. Среднее абсолютное давление газа после стравливания */}
          {renderParameterRow("averageAbsolutePressureAfterVenting")}

          {/* 43. Температура газа на участке после стравливания средняя */}
          {renderParameterRow("averageTemperatureAfterVenting")}

          {/* 44. Коэффициент сжимаемости после стравливания */}
          {renderParameterRow("compressibilityFactorAfterVenting")}

          {/* 45. Расчет ТГ МКС: */}
          {renderParameterRow("mksCalculation")}

          {/* 46. Нормативный коэф. расхода ТГ МКС при сохранении газа из выводимого участка (0,012) */}
          {renderParameterRow("normativeMksCoefficient")}

          {/* 47. Кол-во МКС */}
          {renderParameterRow("mksCount")}

          {/* 48. Объём газа, сохраняемого МКС */}
          {renderParameterRow("gasSavedByMks")}

          {/* 49. Объём газа ТГ МКС */}
          {renderParameterRow("gasMksVolumeCubicMeters")}
          {renderParameterRow("gasMksVolumeFuelEquivalent", false)}
          {renderParameterRow("gasMksVolumeKg", false)}

          {/* 50. Объём газа, опорожняемого из участка */}
          {renderParameterRow("gasEmptiedFromSectionCubicMeters")}
          {renderParameterRow("gasEmptiedFromSectionFuelEquivalent", false)}
          {renderParameterRow("gasEmptiedFromSectionKg", false)}

          {/* 51. Количество продувок при проведении работ */}
          {renderParameterRow("purgeCount")}

          {/* 52. Объём газа, расходуемого для удаления газовоздушной смеси по участкам */}
          {renderParameterRow("gasForRemovingMixtureCubicMeters")}
          {renderParameterRow("gasForRemovingMixtureFuelEquivalent", false)}
          {renderParameterRow("gasForRemovingMixtureKg", false)}

          {/* 53. Суммарный расход газа по участкм */}
          {renderParameterRow("totalGasConsumptionCubicMeters")}
          {renderParameterRow("totalGasConsumptionFuelEquivalent", false)}
          {renderParameterRow("totalGasConsumptionKg", false)}

          {/* 54. ИТОГО, норматив */}
          {renderParameterRow("totalNormativeCubicMeters")}
          {renderParameterRow("totalNormativeFuelEquivalent", false)}
          {renderParameterRow("totalNormativeKg", false)}

          {/* 55. ИТОГО, план */}
          {renderParameterRow("totalPlanCubicMeters")}
          {renderParameterRow("totalPlanFuelEquivalent", false)}
          {renderParameterRow("totalPlanKg", false)}

          {/* 56. ИТОГО, факт */}
          {renderParameterRow("totalFactCubicMeters")}
          {renderParameterRow("totalFactFuelEquivalent", false)}
          {renderParameterRow("totalFactKg", false)}

          {/* 57. Объём выработанного газа БЕЗ включения МКС */}
          {renderParameterRow("gasExhaustedWithoutMKSCubicMeters")}
          {renderParameterRow("gasExhaustedWithoutMKSFuelEquivalent", false)}
          {renderParameterRow("gasExhaustedWithoutMKSKg", false)}

          {/* 58. Объём выработанного газа С помощью МКС */}
          {renderParameterRow("gasExhaustedWithMKSCubicMeters")}
          {renderParameterRow("gasExhaustedWithMKSFuelEquivalent", false)}
          {renderParameterRow("gasExhaustedWithMKSKg", false)}

          {/* 59. ИТОГО выработано БЕЗ выключения МКС, норматив */}
          {renderParameterRow("totalExhaustedWithoutMKSNormativeCubicMeters")}
          {renderParameterRow(
            "totalExhaustedWithoutMKSNormativeFuelEquivalent",
            false
          )}
          {renderParameterRow("totalExhaustedWithoutMKSNormativeKg", false)}

          {/* 60. ИТОГО выработано С помощью МКС, норматив */}
          {renderParameterRow("totalExhaustedWithMKSNormativeCubicMeters")}
          {renderParameterRow(
            "totalExhaustedWithMKSNormativeFuelEquivalent",
            false
          )}
          {renderParameterRow("totalExhaustedWithMKSNormativeKg", false)}

          {/* 61. ИТОГО выработано БЕЗ включения МКС, план */}
          {renderParameterRow("totalExhaustedWithoutMKSPlanCubicMeters")}
          {renderParameterRow(
            "totalExhaustedWithoutMKSPlanFuelEquivalent",
            false
          )}
          {renderParameterRow("totalExhaustedWithoutMKSPlanKg", false)}

          {/* 62. ИТОГО выработано С помощью МКС, план */}
          {renderParameterRow("totalExhaustedWithMKSPlanCubicMeters")}
          {renderParameterRow("totalExhaustedWithMKSPlanFuelEquivalent", false)}
          {renderParameterRow("totalExhaustedWithMKSPlanKg", false)}

          {/* 63. ИТОГО выработано БЕЗ включения МКС, факт */}
          {renderParameterRow("totalExhaustedWithoutMKSFactCubicMeters")}
          {renderParameterRow(
            "totalExhaustedWithoutMKSFactFuelEquivalent",
            false
          )}
          {renderParameterRow("totalExhaustedWithoutMKSFactKg", false)}

          {/* 64. ИТОГО выработано С помощью МКС, факт */}
          {renderParameterRow("totalExhaustedWithMKSFactCubicMeters")}
          {renderParameterRow("totalExhaustedWithMKSFactFuelEquivalent", false)}
          {renderParameterRow("totalExhaustedWithMKSFactKg", false)}

          {/* 65. ИТОГО выработано, норматив */}
          {renderParameterRow("totalExhaustedNormativeCubicMeters")}
          {renderParameterRow("totalExhaustedNormativeFuelEquivalent", false)}
          {renderParameterRow("totalExhaustedNormativeKg", false)}

          {/* 66. ИТОГО выработано, план */}
          {renderParameterRow("totalExhaustedPlanCubicMeters")}
          {renderParameterRow("totalExhaustedPlanFuelEquivalent", false)}
          {renderParameterRow("totalExhaustedPlanKg", false)}

          {/* 67. ИТОГО выработано, факт */}
          {renderParameterRow("totalExhaustedFactCubicMeters")}
          {renderParameterRow("totalExhaustedFactFuelEquivalent", false)}
          {renderParameterRow("totalExhaustedFactKg", false)}

          {/* 68. ИТОГО Объем газа, опорожняемого из участка, норматив */}
          {renderParameterRow("totalGasEmptiedNormativeCubicMeters")}
          {renderParameterRow("totalGasEmptiedNormativeFuelEquivalent", false)}
          {renderParameterRow("totalGasEmptiedNormativeKg", false)}

          {/* 69. ИТОГО Объем газа, опорожняемого из участка, план */}
          {renderParameterRow("totalGasEmptiedPlanCubicMeters")}
          {renderParameterRow("totalGasEmptiedPlanFuelEquivalent", false)}
          {renderParameterRow("totalGasEmptiedPlanKg", false)}

          {/* 70. ИТОГО Объем газа, опорожняемого из участка, факт */}
          {renderParameterRow("totalGasEmptiedFactCubicMeters")}
          {renderParameterRow("totalGasEmptiedFactFuelEquivalent", false)}
          {renderParameterRow("totalGasEmptiedFactKg", false)}

          {/* 71. ИТОГО Объем газа, расходуемого для удаления газовоздушной смеси по участкам, норматив */}
          {renderParameterRow("totalGasForMixtureRemovalNormativeCubicMeters")}
          {renderParameterRow(
            "totalGasForMixtureRemovalNormativeFuelEquivalent",
            false
          )}
          {renderParameterRow("totalGasForMixtureRemovalNormativeKg", false)}

          {/* 72. ИТОГО Объем газа, расходуемого для удаления газовоздушной смеси по участкам, план */}
          {renderParameterRow("totalGasForMixtureRemovalPlanCubicMeters")}
          {renderParameterRow(
            "totalGasForMixtureRemovalPlanFuelEquivalent",
            false
          )}
          {renderParameterRow("totalGasForMixtureRemovalPlanKg", false)}

          {/* 73. ИТОГО Объем газа, расходуемого для удаления газовоздушной смеси по участкам, факт */}
          {renderParameterRow("totalGasForMixtureRemovalFactCubicMeters")}
          {renderParameterRow(
            "totalGasForMixtureRemovalFactFuelEquivalent",
            false
          )}
          {renderParameterRow("totalGasForMixtureRemovalFactKg", false)}

          {/* 74. ИТОГО Объем ТГ МКС, норматив */}
          {renderParameterRow("totalMksGasNormativeCubicMeters")}
          {renderParameterRow("totalMksGasNormativeFuelEquivalent", false)}
          {renderParameterRow("totalMksGasNormativeKg", false)}

          {/* 75. ИТОГО Объем ТГ МКС, план */}
          {renderParameterRow("totalMksGasPlanCubicMeters")}
          {renderParameterRow("totalMksGasPlanFuelEquivalent", false)}
          {renderParameterRow("totalMksGasPlanKg", false)}

          {/* 76. ИТОГО Объем ТГ МКС, факт */}
          {renderParameterRow("totalMksGasFactCubicMeters")}
          {renderParameterRow("totalMksGasFactFuelEquivalent", false)}
          {renderParameterRow("totalMksGasFactKg", false)}

          {/* 77. Объем стравлено, при Р<1,0 МПа */}
          {renderParameterRow("ventedGasLowPressureCubicMeters")}
          {renderParameterRow("ventedGasLowPressureFuelEquivalent", false)}
          {renderParameterRow("ventedGasLowPressureKg", false)}

          {/* 78. ИТОГО Объем стравлено, при Р<1,0 МПа, норматив */}
          {renderParameterRow("totalVentedGasLowPressureNormativeCubicMeters")}
          {renderParameterRow(
            "totalVentedGasLowPressureNormativeFuelEquivalent",
            false
          )}
          {renderParameterRow("totalVentedGasLowPressureNormativeKg", false)}

          {/* 79. ИТОГО Объем стравлено, при Р<1,0 МПа, план */}
          {renderParameterRow("totalVentedGasLowPressurePlanCubicMeters")}
          {renderParameterRow(
            "totalVentedGasLowPressurePlanFuelEquivalent",
            false
          )}
          {renderParameterRow("totalVentedGasLowPressurePlanKg", false)}

          {/* 80. ИТОГО Объем стравлено, при Р<1,0 МПа, факт */}
          {renderParameterRow("totalVentedGasLowPressureFactCubicMeters")}
          {renderParameterRow(
            "totalVentedGasLowPressureFactFuelEquivalent",
            false
          )}
          {renderParameterRow("totalVentedGasLowPressureFactKg", false)}

          {/* 81. Перед проведением ремонтных работ, за исключением объема ТП, при Р<1 МПа */}
          {renderParameterRow(
            "gasBeforeRepairExcludingTPLowPressureCubicMeters"
          )}
          {renderParameterRow(
            "gasBeforeRepairExcludingTPLowPressureFuelEquivalent",
            false
          )}
          {renderParameterRow("gasBeforeRepairExcludingTPLowPressureKg", false)}

          {/* 82. ИТОГО Перед проведением ремонтных работ, за исключением объема ТП, при Р<1 МПа, норма */}
          {renderParameterRow(
            "totalGasBeforeRepairExcludingTPLowPressureNormativeCubicMeters"
          )}
          {renderParameterRow(
            "totalGasBeforeRepairExcludingTPLowPressureNormativeFuelEquivalent",
            false
          )}
          {renderParameterRow(
            "totalGasBeforeRepairExcludingTPLowPressureNormativeKg",
            false
          )}

          {/* 83. ИТОГО Перед проведением ремонтных работ, за исключением объема ТП, при Р<1 МПа, план */}
          {renderParameterRow(
            "totalGasBeforeRepairExcludingTPLowPressurePlanCubicMeters"
          )}
          {renderParameterRow(
            "totalGasBeforeRepairExcludingTPLowPressurePlanFuelEquivalent",
            false
          )}
          {renderParameterRow(
            "totalGasBeforeRepairExcludingTPLowPressurePlanKg",
            false
          )}

          {/* 84. ИТОГО Перед проведением ремонтных работ, за исключением объема ТП, при Р<1 МПа, факт */}
          {renderParameterRow(
            "totalGasBeforeRepairExcludingTPLowPressureFactCubicMeters"
          )}
          {renderParameterRow(
            "totalGasBeforeRepairExcludingTPLowPressureFactFuelEquivalent",
            false
          )}
          {renderParameterRow(
            "totalGasBeforeRepairExcludingTPLowPressureFactKg",
            false
          )}

          {/* 85. % Выработки газа (без учета продувки) */}
          {renderParameterRow("gasExhaustionPercentage")}
        </TableBody>
      </Table>
    </div>
  );
}
