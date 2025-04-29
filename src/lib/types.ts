export interface ColumnValue {
  value: string | number;
  editable: boolean;
  // Для вычисляемых значений
  formula?: string;
}

export interface ParameterValues {
  normative: ColumnValue;
  plan: ColumnValue;
  fact: ColumnValue;
}

export interface Parameter {
  key: string;
  name: string;
  unit: string;
  values: ParameterValues;
}

export interface DiameterLength {
  diameter: {
    values: ParameterValues;
  };
  length: {
    values: ParameterValues;
  };
}

export interface Section {
  name: string;
  parameters: Parameter[];
  diameterLengths: DiameterLength[];
}

// Функция для создания значения колонки
function createColumnValue(
  value: string | number = "",
  editable = true,
  formula?: string
): ColumnValue {
  return {
    value,
    editable,
    formula,
  };
}

// Функция для создания значений параметра
function createParameterValues(
  normativeEditable = true,
  planEditable = false,
  factEditable = true,
  normativeValue: string | number = "",
  planValue: string | number = "",
  factValue: string | number = "",
  normativeFormula?: string,
  planFormula?: string,
  factFormula?: string
): ParameterValues {
  return {
    normative: createColumnValue(
      normativeValue,
      normativeEditable,
      normativeFormula
    ),
    plan: createColumnValue(planValue, planEditable, planFormula),
    fact: createColumnValue(factValue, factEditable, factFormula),
  };
}

export function createDefaultSection(name: string): Section {
  return {
    name,
    parameters: [
      {
        key: "date",
        name: "Дата",
        unit: "ДД",
        values: createParameterValues(true, false, true),
      },
      {
        key: "atmosphericPressure",
        name: "Атмосферное давление",
        unit: "мм.рт.ст.",
        values: createParameterValues(false, false, false, 760, 760, 760),
      },
      {
        key: "atmosphericPressureEditable",
        name: "Атмосферное давление (редактируемое)",
        unit: "мм.рт.ст.",
        values: createParameterValues(true, false, true, 760, 760, 760),
      },
      {
        key: "gasDensity",
        name: "Плотность газа",
        unit: "кг/м³",
        values: createParameterValues(false, false, false, 0.7, 0.7, 0.7),
      },
      {
        key: "gasDensityEditable",
        name: "Плотность газа (редактируемое)",
        unit: "кг/м³",
        values: createParameterValues(true, false, true, 0.7, 0.7, 0.7),
      },
      {
        key: "lowerHeatingValue",
        name: "Теплота сгорания низшая",
        unit: "ккал/м³",
        values: createParameterValues(false, false, false, 8000, 8000, 8000),
      },
      {
        key: "lowerHeatingValueEditable",
        name: "Теплота сгорания низшая (редактируемое)",
        unit: "ккал/м³",
        values: createParameterValues(true, false, true, 8000, 8000, 8000),
      },
      {
        key: "geometricVolume",
        name: "Объём геометрический",
        unit: "тыс. м³",
        values: createParameterValues(true, false, true),
      },
      {
        key: "totalGeometricVolume",
        name: "Итого геометрический объём участка",
        unit: "м³",
        values: createParameterValues(
          false,
          false,
          false,
          "",
          "",
          "",
          "calculateTotalGeometricVolume",
          "calculateTotalGeometricVolume",
          "calculateTotalGeometricVolume"
        ),
      },
      {
        key: "excessPressureBeforeDisconnectStart",
        name: "Избыточное давление газа до отключения участка в начале участка",
        unit: "МПа",
        values: createParameterValues(true, false, true),
      },
      {
        key: "temperatureBeforeDisconnectStart",
        name: "Температура газа до отключения участка в начале участка",
        unit: "К",
        values: createParameterValues(true, false, true),
      },
      {
        key: "excessPressureBeforeDisconnectEnd",
        name: "Избыточное давление газа до отключения участка в конце участка",
        unit: "МПа",
        values: createParameterValues(true, false, true),
      },
      {
        key: "temperatureBeforeDisconnectEnd",
        name: "Температура газа до отключения участка в конце участка",
        unit: "К",
        values: createParameterValues(true, false, true),
      },
      {
        key: "averageAbsolutePressureBeforeDisconnect",
        name: "Среднее абсолютное давление газа до отключения участка",
        unit: "МПа",
        values: createParameterValues(
          false,
          false,
          false,
          "",
          "",
          "",
          "calculateAveragePressure",
          "calculateAveragePressure",
          "calculateAveragePressure"
        ),
      },
      {
        key: "averageTemperatureBeforeDisconnect",
        name: "Температура газа на участке до отключения средняя",
        unit: "К",
        values: createParameterValues(
          false,
          false,
          false,
          "",
          "",
          "",
          "calculateAverageTemperature",
          "calculateAverageTemperature",
          "calculateAverageTemperature"
        ),
      },
      {
        key: "compressibilityFactorBeforeDisconnect",
        name: "Коэффициент сжимаемости до отключения",
        unit: "-",
        values: createParameterValues(true, false, true),
      },
      {
        key: "exhaustionMethod",
        name: "Способ выработки без МКС (ГРС, перепуск....)",
        unit: "-",
        values: createParameterValues(true, false, true),
      },
      {
        key: "excessPressureAfterExhaustionWithoutMKSStart",
        name: "Избыточное давление газа после выработки без МКС учатска в начале участка",
        unit: "МПа",
        values: createParameterValues(false, false, false),
      },
      {
        key: "excessPressureAfterExhaustionWithoutMKSStartEditable",
        name: "Избыточное давление газа после выработки без МКС учатска в начале участка (редактируемое)",
        unit: "МПа",
        values: createParameterValues(true, false, true),
      },
      {
        key: "excessPressureAfterExhaustionWithoutMKSEnd",
        name: "Избыточное давление газа после выработки без МКС участка в конце участка",
        unit: "МПа",
        values: createParameterValues(false, false, false),
      },
      {
        key: "excessPressureAfterExhaustionWithoutMKSEndEditable",
        name: "Избыточное давление газа после выработки без МКС участка в конце участка (редактируемое)",
        unit: "МПа",
        values: createParameterValues(true, false, true),
      },
      {
        key: "temperatureAfterExhaustionWithoutMKSStart",
        name: "Температура газа после выработки без МКС учатска в начале участка",
        unit: "К",
        values: createParameterValues(false, false, false),
      },
      {
        key: "temperatureAfterExhaustionWithoutMKSStartEditable",
        name: "Температура газа после выработки без МКС учатска в начале участка (редактируемое)",
        unit: "К",
        values: createParameterValues(true, false, true),
      },
      {
        key: "temperatureAfterExhaustionWithoutMKSEnd",
        name: "Температура газа после выработки без МКС учатска в конце участка",
        unit: "К",
        values: createParameterValues(false, false, false),
      },
      {
        key: "temperatureAfterExhaustionWithoutMKSEndEditable",
        name: "Температура газа после выработки без МКС учатска в конце участка (редактируемое)",
        unit: "К",
        values: createParameterValues(true, false, true),
      },
      {
        key: "averageAbsolutePressureAfterExhaustionWithoutMKS",
        name: "Среднее абсолютное давление газа после выработки без МКС",
        unit: "МПа",
        values: createParameterValues(false, false, false),
      },
      {
        key: "averageTemperatureAfterExhaustionWithoutMKS",
        name: "Температура газа на участке средняя после выработки без МКС",
        unit: "К",
        values: createParameterValues(false, false, false),
      },
      {
        key: "compressibilityFactorAfterExhaustionWithoutMKS",
        name: "Коэффициент сжимаемости после выработки без МКС",
        unit: "-",
        values: createParameterValues(false, false, false),
      },
      {
        key: "compressibilityFactorAfterExhaustionWithoutMKSEditable",
        name: "Коэффициент сжимаемости после выработки без МКС (редактируемое)",
        unit: "-",
        values: createParameterValues(true, false, true),
      },
      {
        key: "excessPressureAfterExhaustionWithMKSStart",
        name: "Избыточное давление газа после выработки с МКС учатска в начале участка",
        unit: "МПа",
        values: createParameterValues(false, false, false),
      },
      {
        key: "excessPressureAfterExhaustionWithMKSStartEditable",
        name: "Избыточное давление газа после выработки с МКС учатска в начале участка (редактируемое)",
        unit: "МПа",
        values: createParameterValues(true, false, true),
      },
      {
        key: "temperatureAfterExhaustionWithMKSStart",
        name: "Температура газа после выработки с МКС учатска в начале участка",
        unit: "К",
        values: createParameterValues(false, false, false),
      },
      {
        key: "temperatureAfterExhaustionWithMKSStartEditable",
        name: "Температура газа после выработки с МКС учатска в начале участка (редактируемое)",
        unit: "К",
        values: createParameterValues(true, false, true),
      },
      {
        key: "excessPressureAfterExhaustionWithMKSEnd",
        name: "Избыточное давление газа после выработки с МКС участка в конце участка",
        unit: "МПа",
        values: createParameterValues(false, false, false),
      },
      {
        key: "excessPressureAfterExhaustionWithMKSEndEditable",
        name: "Избыточное давление газа после выработки с МКС участка в конце участка (редактируемое)",
        unit: "МПа",
        values: createParameterValues(true, false, true),
      },
      {
        key: "temperatureAfterExhaustionWithMKSEnd",
        name: "Температура газа после выработки с МКС учатска в конце участка",
        unit: "К",
        values: createParameterValues(false, false, false),
      },
      {
        key: "temperatureAfterExhaustionWithMKSEndEditable",
        name: "Температура газа после выработки с МКС учатска в конце участка (редактируемое)",
        unit: "К",
        values: createParameterValues(true, false, true),
      },
      {
        key: "averageAbsolutePressureAfterExhaustionWithMKS",
        name: "Среднее абсолютное давление газа после выработки с МКС",
        unit: "МПа",
        values: createParameterValues(false, false, false),
      },
      {
        key: "averageTemperatureAfterExhaustionWithMKS",
        name: "Температура газа на участке средняя после выработки с МКС",
        unit: "К",
        values: createParameterValues(false, false, false),
      },
      {
        key: "compressibilityFactorAfterExhaustionWithMKS",
        name: "Коэффициент сжимаемости после выработки с МКС",
        unit: "-",
        values: createParameterValues(false, false, false),
      },
      {
        key: "compressibilityFactorAfterExhaustionWithMKSEditable",
        name: "Коэффициент сжимаемости после выработки с МКС (редактируемое)",
        unit: "-",
        values: createParameterValues(true, false, true),
      },
      {
        key: "excessPressureBeforeVenting",
        name: "Избыточное давление газа до стравливания в начале участка",
        unit: "МПа",
        values: createParameterValues(false, false, false),
      },
      {
        key: "temperatureBeforeVenting",
        name: "Температура газа до стравливания в начале участка",
        unit: "К",
        values: createParameterValues(false, false, false),
      },
      {
        key: "excessPressureBeforeVentingEnd",
        name: "Избыточное давление газа до стравливания в конце участка",
        unit: "МПа",
        values: createParameterValues(false, false, false),
      },
      {
        key: "temperatureBeforeVentingEnd",
        name: "Температура газа до стравливания в конце участка",
        unit: "К",
        values: createParameterValues(false, false, false),
      },
      {
        key: "averageAbsolutePressureBeforeVenting",
        name: "Среднее абсолютное давление газа до стравливания",
        unit: "МПа",
        values: createParameterValues(false, false, false),
      },
      {
        key: "averageTemperatureBeforeVenting",
        name: "Температура газа на участке до стравливания средняя",
        unit: "К",
        values: createParameterValues(false, false, false),
      },
      {
        key: "compressibilityFactorBeforeVenting",
        name: "Коэффициент сжимаемости до стравливания",
        unit: "-",
        values: createParameterValues(false, false, false),
      },
      {
        key: "excessPressureAfterVentingStart",
        name: "Избыточное давление газа после стравливания в начале участка",
        unit: "МПа",
        values: createParameterValues(true, false, true),
      },
      {
        key: "temperatureAfterVentingStart",
        name: "Температура газа после стравливания в начале участка",
        unit: "К",
        values: createParameterValues(true, false, true),
      },
      {
        key: "excessPressureAfterVentingEnd",
        name: "Избыточное давление газа после страливания в конце участка",
        unit: "МПа",
        values: createParameterValues(true, false, true),
      },
      {
        key: "temperatureAfterVentingEnd",
        name: "Температура газа после стравливания в конце участка",
        unit: "К",
        values: createParameterValues(true, false, true),
      },
      {
        key: "averageAbsolutePressureAfterVenting",
        name: "Среднее абсолютное давление газа после стравливания",
        unit: "МПа",
        values: createParameterValues(false, false, false),
      },
      {
        key: "averageTemperatureAfterVenting",
        name: "Температура газа на участке после стравливания средняя",
        unit: "К",
        values: createParameterValues(false, false, false),
      },
      {
        key: "compressibilityFactorAfterVenting",
        name: "Коэффициент сжимаемости после стравливания",
        unit: "-",
        values: createParameterValues(true, false, true),
      },
      {
        key: "mksCalculation",
        name: "Расчет ТГ МКС:",
        unit: "-",
        values: createParameterValues(false, false, false),
      },
      {
        key: "normativeMksCoefficient",
        name: "Нормативный коэф. расхода ТГ МКС при сохранении газа из выводимого участка (0,012)",
        unit: "-",
        values: createParameterValues(
          false,
          false,
          false,
          "0.012",
          "0.012",
          "0.012"
        ),
      },
      {
        key: "mksCount",
        name: "Кол-во МКС",
        unit: "ед.",
        values: createParameterValues(true, false, true),
      },
      {
        key: "gasSavedByMks",
        name: "Объём газа, сохраняемого МКС",
        unit: "м³",
        values: createParameterValues(false, false, false),
      },
      {
        key: "gasMksVolumeCubicMeters",
        name: "Объём газа ТГ МКС (м³)",
        unit: "м³",
        values: createParameterValues(true, false, true),
      },
      {
        key: "gasMksVolumeFuelEquivalent",
        name: "Объём газа ТГ МКС (кг.у.т.)",
        unit: "кг.у.т.",
        values: createParameterValues(true, false, true),
      },
      {
        key: "gasMksVolumeKg",
        name: "Объём газа ТГ МКС (кг)",
        unit: "кг",
        values: createParameterValues(true, false, true),
      },
      {
        key: "gasEmptiedFromSectionCubicMeters",
        name: "Объём газа, опорожняемого из участка (м³)",
        unit: "м³",
        values: createParameterValues(false, false, false),
      },
      {
        key: "gasEmptiedFromSectionFuelEquivalent",
        name: "Объём газа, опорожняемого из участка (кг.у.т.)",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "gasEmptiedFromSectionKg",
        name: "Объём газа, опорожняемого из участка (кг)",
        unit: "кг",
        values: createParameterValues(false, false, false),
      },
      {
        key: "purgeCount",
        name: "Количество продувок при проведении работ",
        unit: "шт.",
        values: createParameterValues(true, false, true),
      },
      {
        key: "gasForRemovingMixtureCubicMeters",
        name: "Объём газа, расходуемого для удаления газовоздушной смеси по участкам (м³)",
        unit: "м³",
        values: createParameterValues(false, false, false),
      },
      {
        key: "gasForRemovingMixtureFuelEquivalent",
        name: "Объём газа, расходуемого для удаления газовоздушной смеси по участкам (кг.у.т.)",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "gasForRemovingMixtureKg",
        name: "Объём газа, расходуемого для удаления газовоздушной смеси по участкам (кг)",
        unit: "кг",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalGasConsumptionCubicMeters",
        name: "Суммарный расход газа по участкм (м³)",
        unit: "м³",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalGasConsumptionFuelEquivalent",
        name: "Суммарный расход газа по участкм (кг.у.т.)",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalGasConsumptionKg",
        name: "Суммарный расход газа по участкм (кг)",
        unit: "кг",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalNormativeCubicMeters",
        name: "ИТОГО, норматив (м³)",
        unit: "м³",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalNormativeFuelEquivalent",
        name: "ИТОГО, норматив (кг.у.т.)",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalNormativeKg",
        name: "ИТОГО, норматив (кг)",
        unit: "кг",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalPlanCubicMeters",
        name: "ИТОГО, план (м³)",
        unit: "м³",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalPlanFuelEquivalent",
        name: "ИТОГО, план (кг.у.т.)",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalPlanKg",
        name: "ИТОГО, план (кг)",
        unit: "кг",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalFactCubicMeters",
        name: "ИТОГО, факт (м³)",
        unit: "м³",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalFactFuelEquivalent",
        name: "ИТОГО, факт (кг.у.т.)",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalFactKg",
        name: "ИТОГО, факт (кг)",
        unit: "кг",
        values: createParameterValues(false, false, false),
      },
      // Продолжение всех остальных параметров из списка
      {
        key: "gasExhaustedWithoutMKSCubicMeters",
        name: "Объём выработанного газа БЕЗ включения МКС (м³)",
        unit: "м³",
        values: createParameterValues(false, false, false),
      },
      {
        key: "gasExhaustedWithoutMKSFuelEquivalent",
        name: "Объём выработанного газа БЕЗ включения МКС (кг.у.т.)",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "gasExhaustedWithoutMKSKg",
        name: "Объём выработанного газа БЕЗ включения МКС (кг)",
        unit: "кг",
        values: createParameterValues(false, false, false),
      },
      {
        key: "gasExhaustedWithMKSCubicMeters",
        name: "Объём выработанного газа С помощью МКС (м³)",
        unit: "м³",
        values: createParameterValues(false, false, false),
      },
      {
        key: "gasExhaustedWithMKSFuelEquivalent",
        name: "Объём выработанного газа С помощью МКС (кг.у.т.)",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "gasExhaustedWithMKSKg",
        name: "Объём выработанного газа С помощью МКС (кг)",
        unit: "кг",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalExhaustedWithoutMKSNormativeCubicMeters",
        name: "ИТОГО выработано БЕЗ выключения МКС, норматив (м³)",
        unit: "м³",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalExhaustedWithoutMKSNormativeFuelEquivalent",
        name: "ИТОГО выработано БЕЗ выключения МКС, норматив (кг.у.т.)",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalExhaustedWithoutMKSNormativeKg",
        name: "ИТОГО выработано БЕЗ выключения МКС, норматив (кг)",
        unit: "кг",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalExhaustedWithMKSNormativeCubicMeters",
        name: "ИТОГО выработано С помощью МКС, норматив (м³)",
        unit: "м³",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalExhaustedWithMKSNormativeFuelEquivalent",
        name: "ИТОГО выработано С помощью МКС, норматив (кг.у.т.)",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalExhaustedWithMKSNormativeKg",
        name: "ИТОГО выработано С помощью МКС, норматив (кг)",
        unit: "кг",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalExhaustedWithoutMKSPlanCubicMeters",
        name: "ИТОГО выработано БЕЗ включения МКС, план (м³)",
        unit: "м³",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalExhaustedWithoutMKSPlanFuelEquivalent",
        name: "ИТОГО выработано БЕЗ включения МКС, план (кг.у.т.)",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalExhaustedWithoutMKSPlanKg",
        name: "ИТОГО выработано БЕЗ включения МКС, план (кг)",
        unit: "кг",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalExhaustedWithMKSPlanCubicMeters",
        name: "ИТОГО выработано С помощью МКС, план (м³)",
        unit: "м³",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalExhaustedWithMKSPlanFuelEquivalent",
        name: "ИТОГО выработано С помощью МКС, план (кг.у.т.)",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalExhaustedWithMKSPlanKg",
        name: "ИТОГО выработано С помощью МКС, план (кг)",
        unit: "кг",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalExhaustedWithoutMKSFactCubicMeters",
        name: "ИТОГО выработано БЕЗ включения МКС, факт (м³)",
        unit: "м³",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalExhaustedWithoutMKSFactFuelEquivalent",
        name: "ИТОГО выработано БЕЗ включения МКС, факт (кг.у.т.)",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalExhaustedWithoutMKSFactKg",
        name: "ИТОГО выработано БЕЗ включения МКС, факт (кг)",
        unit: "кг",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalExhaustedWithMKSFactCubicMeters",
        name: "ИТОГО выработано С помощью МКС, факт (м³)",
        unit: "м³",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalExhaustedWithMKSFactFuelEquivalent",
        name: "ИТОГО выработано С помощью МКС, факт (кг.у.т.)",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalExhaustedWithMKSFactKg",
        name: "ИТОГО выработано С помощью МКС, факт (кг)",
        unit: "кг",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalExhaustedNormativeCubicMeters",
        name: "ИТОГО выработано, норматив (м³)",
        unit: "м³",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalExhaustedNormativeFuelEquivalent",
        name: "ИТОГО выработано, норматив (кг.у.т.)",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalExhaustedNormativeKg",
        name: "ИТОГО выработано, норматив (кг)",
        unit: "кг",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalExhaustedPlanCubicMeters",
        name: "ИТОГО выработано, план (м³)",
        unit: "м³",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalExhaustedPlanFuelEquivalent",
        name: "ИТОГО выработано, план (кг.у.т.)",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalExhaustedPlanKg",
        name: "ИТОГО выработано, план (кг)",
        unit: "кг",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalExhaustedFactCubicMeters",
        name: "ИТОГО выработано, факт (м³)",
        unit: "м³",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalExhaustedFactFuelEquivalent",
        name: "ИТОГО выработано, факт (кг.у.т.)",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalExhaustedFactKg",
        name: "ИТОГО выработано, факт (кг)",
        unit: "кг",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalGasEmptiedNormativeCubicMeters",
        name: "ИТОГО Объем газа, опорожняемого из участка, норматив (м³)",
        unit: "м³",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalGasEmptiedNormativeFuelEquivalent",
        name: "ИТОГО Объем газа, опорожняемого из участка, норматив (кг.у.т.)",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalGasEmptiedNormativeKg",
        name: "ИТОГО Объем газа, опорожняемого из участка, норматив (кг)",
        unit: "кг",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalGasEmptiedPlanCubicMeters",
        name: "ИТОГО Объем газа, опорожняемого из участка, план (м³)",
        unit: "м³",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalGasEmptiedPlanFuelEquivalent",
        name: "ИТОГО Объем газа, опорожняемого из участка, план (кг.у.т.)",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalGasEmptiedPlanKg",
        name: "ИТОГО Объем газа, опорожняемого из участка, план (кг)",
        unit: "кг",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalGasEmptiedFactCubicMeters",
        name: "ИТОГО Объем газа, опорожняемого из участка, факт (м³)",
        unit: "м³",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalGasEmptiedFactFuelEquivalent",
        name: "ИТОГО Объем газа, опорожняемого из участка, факт (кг.у.т.)",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalGasEmptiedFactKg",
        name: "ИТОГО Объем газа, опорожняемого из участка, факт (кг)",
        unit: "кг",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalGasForMixtureRemovalNormativeCubicMeters",
        name: "ИТОГО Объем газа, расходуемого для удаления газовоздушной смеси по участкам, норматив (м³)",
        unit: "м³",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalGasForMixtureRemovalNormativeFuelEquivalent",
        name: "ИТОГО Объем газа, расходуемого для удаления газовоздушной смеси по участкам, норматив (кг.у.т.)",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalGasForMixtureRemovalNormativeKg",
        name: "ИТОГО Объем газа, расходуемого для удаления газовоздушной смеси по участкам, норматив (кг)",
        unit: "кг",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalGasForMixtureRemovalPlanCubicMeters",
        name: "ИТОГО Объем газа, расходуемого для удаления газовоздушной смеси по участкам, план (м³)",
        unit: "м³",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalGasForMixtureRemovalPlanFuelEquivalent",
        name: "ИТОГО Объем газа, расходуемого для удаления газовоздушной смеси по участкам, план (кг.у.т.)",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalGasForMixtureRemovalPlanKg",
        name: "ИТОГО Объем газа, расходуемого для удаления газовоздушной смеси по участкам, план (кг)",
        unit: "кг",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalGasForMixtureRemovalFactCubicMeters",
        name: "ИТОГО Объем газа, расходуемого для удаления газовоздушной смеси по участкам, факт (м³)",
        unit: "м³",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalGasForMixtureRemovalFactFuelEquivalent",
        name: "ИТОГО Объем газа, расходуемого для удаления газовоздушной смеси по участкам, факт (кг.у.т.)",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalGasForMixtureRemovalFactKg",
        name: "ИТОГО Объем газа, расходуемого для удаления газовоздушной смеси по участкам, факт (кг)",
        unit: "кг",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalMksGasNormativeCubicMeters",
        name: "ИТОГО Объем ТГ МКС, норматив (м³)",
        unit: "м³",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalMksGasNormativeFuelEquivalent",
        name: "ИТОГО Объем ТГ МКС, норматив (кг.у.т.)",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalMksGasNormativeKg",
        name: "ИТОГО Объем ТГ МКС, норматив (кг)",
        unit: "кг",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalMksGasPlanCubicMeters",
        name: "ИТОГО Объем ТГ МКС, план (м³)",
        unit: "м³",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalMksGasPlanFuelEquivalent",
        name: "ИТОГО Объем ТГ МКС, план (кг.у.т.)",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalMksGasPlanKg",
        name: "ИТОГО Объем ТГ МКС, план (кг)",
        unit: "кг",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalMksGasFactCubicMeters",
        name: "ИТОГО Объем ТГ МКС, факт (м³)",
        unit: "м³",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalMksGasFactFuelEquivalent",
        name: "ИТОГО Объем ТГ МКС, факт (кг.у.т.)",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalMksGasFactKg",
        name: "ИТОГО Объем ТГ МКС, факт (кг)",
        unit: "кг",
        values: createParameterValues(false, false, false),
      },
      {
        key: "ventedGasLowPressureCubicMeters",
        name: "Объем стравлено, при Р<1,0 МПа (м³)",
        unit: "м³",
        values: createParameterValues(false, false, false),
      },
      {
        key: "ventedGasLowPressureFuelEquivalent",
        name: "Объем стравлено, при Р<1,0 МПа (кг.у.т.)",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "ventedGasLowPressureKg",
        name: "Объем стравлено, при Р<1,0 МПа (кг)",
        unit: "кг",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalVentedGasLowPressureNormativeCubicMeters",
        name: "ИТОГО Объем стравлено, при Р<1,0 МПа, норматив (м³)",
        unit: "м³",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalVentedGasLowPressureNormativeFuelEquivalent",
        name: "ИТОГО Объем стравлено, при Р<1,0 МПа, норматив (кг.у.т.)",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalVentedGasLowPressureNormativeKg",
        name: "ИТОГО Объем стравлено, при Р<1,0 МПа, норматив (кг)",
        unit: "кг",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalVentedGasLowPressurePlanCubicMeters",
        name: "ИТОГО Объем стравлено, при Р<1,0 МПа, план (м³)",
        unit: "м³",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalVentedGasLowPressurePlanFuelEquivalent",
        name: "ИТОГО Объем стравлено, при Р<1,0 МПа, план (кг.у.т.)",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalVentedGasLowPressurePlanKg",
        name: "ИТОГО Объем стравлено, при Р<1,0 МПа, план (кг)",
        unit: "кг",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalVentedGasLowPressureFactCubicMeters",
        name: "ИТОГО Объем стравлено, при Р<1,0 МПа, факт (м³)",
        unit: "м³",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalVentedGasLowPressureFactFuelEquivalent",
        name: "ИТОГО Объем стравлено, при Р<1,0 МПа, факт (кг.у.т.)",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalVentedGasLowPressureFactKg",
        name: "ИТОГО Объем стравлено, при Р<1,0 МПа, факт (кг)",
        unit: "кг",
        values: createParameterValues(false, false, false),
      },
      {
        key: "gasBeforeRepairExcludingTPLowPressureCubicMeters",
        name: "Перед проведением ремонтных работ, за исключением объема ТП, при Р<1 МПа (м³)",
        unit: "м³",
        values: createParameterValues(false, false, false),
      },
      {
        key: "gasBeforeRepairExcludingTPLowPressureFuelEquivalent",
        name: "Перед проведением ремонтных работ, за исключением объема ТП, при Р<1 МПа (кг.у.т.)",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "gasBeforeRepairExcludingTPLowPressureKg",
        name: "Перед проведением ремонтных работ, за исключением объема ТП, при Р<1 МПа (кг)",
        unit: "кг",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalGasBeforeRepairExcludingTPLowPressureNormativeCubicMeters",
        name: "ИТОГО Перед проведением ремонтных работ, за исключением объема ТП, при Р<1 МПа, норма (м³)",
        unit: "м³",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalGasBeforeRepairExcludingTPLowPressureNormativeFuelEquivalent",
        name: "ИТОГО Перед проведением ремонтных работ, за исключением объема ТП, при Р<1 МПа, норма (кг.у.т.)",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalGasBeforeRepairExcludingTPLowPressureNormativeKg",
        name: "ИТОГО Перед проведением ремонтных работ, за исключением объема ТП, при Р<1 МПа, норма (кг)",
        unit: "кг",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalGasBeforeRepairExcludingTPLowPressurePlanCubicMeters",
        name: "ИТОГО Перед проведением ремонтных работ, за исключением объема ТП, при Р<1 МПа, план (м³)",
        unit: "м³",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalGasBeforeRepairExcludingTPLowPressurePlanFuelEquivalent",
        name: "ИТОГО Перед проведением ремонтных работ, за исключением объема ТП, при Р<1 МПа, план (кг.у.т.)",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalGasBeforeRepairExcludingTPLowPressurePlanKg",
        name: "ИТОГО Перед проведением ремонтных работ, за исключением объема ТП, при Р<1 МПа, план (кг)",
        unit: "кг",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalGasBeforeRepairExcludingTPLowPressureFactCubicMeters",
        name: "ИТОГО Перед проведением ремонтных работ, за исключением объема ТП, при Р<1 МПа, факт (м³)",
        unit: "м³",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalGasBeforeRepairExcludingTPLowPressureFactFuelEquivalent",
        name: "ИТОГО Перед проведением ремонтных работ, за исключением объема ТП, при Р<1 МПа, факт (кг.у.т.)",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalGasBeforeRepairExcludingTPLowPressureFactKg",
        name: "ИТОГО Перед проведением ремонтных работ, за исключением объема ТП, при Р<1 МПа, факт (кг)",
        unit: "кг",
        values: createParameterValues(false, false, false),
      },
      {
        key: "gasExhaustionPercentage",
        name: "% Выработки газа (без учета продувки)",
        unit: "%",
        values: createParameterValues(
          false,
          false,
          false,
          "",
          "",
          "",
          "calculateGasExhaustionPercentage",
          "calculateGasExhaustionPercentage",
          "calculateGasExhaustionPercentage"
        ),
      },
      // Здесь можно добавить остальные параметры
    ],
    diameterLengths: [createDiameterLength()],
  };
}

export function createDiameterLength(): DiameterLength {
  return {
    diameter: {
      values: {
        normative: createColumnValue("", true),
        plan: createColumnValue("", false),
        fact: createColumnValue("", true),
      },
    },
    length: {
      values: {
        normative: createColumnValue("", true),
        plan: createColumnValue("", false),
        fact: createColumnValue("", true),
      },
    },
  };
}
