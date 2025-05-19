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
        values: createParameterValues(true, false, true, 4, 4, 4),
      },
      {
        key: "atmosphericPressure",
        name: "Атмосферное давление",
        unit: "мм.рт.ст.",
        values: createParameterValues(false, false, false, 745, 745, 745),
      },
      {
        key: "atmosphericPressureEditable",
        name: "Атмосферное давление (редактируемое)",
        unit: "мм.рт.ст.",
        values: createParameterValues(true, false, true, 0, 745, 745),
      },
      {
        key: "gasDensity",
        name: "Плотность газа",
        unit: "кг/м³",
        values: createParameterValues(false, false, false, 0.753, 0.753, 0.753),
      },
      {
        key: "gasDensityEditable",
        name: "Плотность газа (редактируемое)",
        unit: "кг/м³",
        values: createParameterValues(true, false, true, 0, 0, 0),
      },
      {
        key: "lowerHeatingValue",
        name: "Теплота сгорания низшая",
        unit: "ккал/м³",
        values: createParameterValues(false, false, false, 8558, 8558, 8558),
      },
      {
        key: "lowerHeatingValueEditable",
        name: "Теплота сгорания низшая (редактируемое)",
        unit: "ккал/м³",
        values: createParameterValues(true, false, true, 0, 0, 0),
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
        values: createParameterValues(false, false, false, 19635, 19635, 19635),
      },
      {
        key: "excessPressureBeforeDisconnectStart",
        name: "Избыточное давление газа до отключения участка в начале участка",
        unit: "МПа",
        values: createParameterValues(true, false, true, 5.33, 5.33, 5.33),
      },
      {
        key: "temperatureBeforeDisconnectStart",
        name: "Температура газа до отключения участка в начале участка",
        unit: "К",
        values: createParameterValues(true, false, true, 276, 276, 276),
      },
      {
        key: "excessPressureBeforeDisconnectEnd",
        name: "Избыточное давление газа до отключения участка в конце участка",
        unit: "МПа",
        values: createParameterValues(true, false, true, 5.33, 5.33, 5.33),
      },
      {
        key: "temperatureBeforeDisconnectEnd",
        name: "Температура газа до отключения участка в конце участка",
        unit: "К",
        values: createParameterValues(true, false, true, 276, 276, 276),
      },
      {
        key: "averageAbsolutePressureBeforeDisconnect",
        name: "Среднее абсолютное давление газа до отключения участка",
        unit: "МПа",
        values: createParameterValues(false, false, false, 5.43, 5.43, 5.43),
      },
      {
        key: "averageTemperatureBeforeDisconnect",
        name: "Температура газа на участке до отключения средняя",
        unit: "К",
        values: createParameterValues(false, false, false, 276, 276, 276),
      },
      {
        key: "compressibilityFactorBeforeDisconnect",
        name: "Коэффициент сжимаемости до отключения",
        unit: "-",
        values: createParameterValues(
          true,
          false,
          true,
          0.8399,
          0.8399,
          0.8399
        ),
      },
      {
        key: "exhaustionMethod",
        name: "Способ выработки без МКС (ГРС, перепуск....)",
        unit: "-",
        values: createParameterValues(true, false, true, "ГРС", "ГРС", "ГРС"),
      },
      {
        key: "excessPressureAfterExhaustionWithoutMKSStart",
        name: "Избыточное давление газа после выработки без МКС учатска в начале участка",
        unit: "МПа",
        values: createParameterValues(false, false, false, 1.28, 1.27, 1.27),
      },
      {
        key: "excessPressureAfterExhaustionWithoutMKSStartEditable",
        name: "Избыточное давление газа после выработки без МКС учатска в начале участка (редактируемое)",
        unit: "МПа",
        values: createParameterValues(true, false, true, 1.28, 1.27, 1.27),
      },
      {
        key: "temperatureAfterExhaustionWithoutMKSStart",
        name: "Температура газа после выработки без МКС учатска в начале участка",
        unit: "К",
        values: createParameterValues(false, false, false, 280, 280, 280),
      },
      {
        key: "temperatureAfterExhaustionWithoutMKSStartEditable",
        name: "Температура газа после выработки без МКС учатска в начале участка (редактируемое)",
        unit: "К",
        values: createParameterValues(true, false, true, 280, 280, 280),
      },
      {
        key: "temperatureAfterExhaustionWithoutMKSEnd",
        name: "Температура газа после выработки без МКС учатска в конце участка",
        unit: "К",
        values: createParameterValues(false, false, false, 1.27, 1.27, 1.27),
      },
      {
        key: "temperatureAfterExhaustionWithoutMKSEndEditable",
        name: "Температура газа после выработки без МКС учатска в конце участка (редактируемое)",
        unit: "К",
        values: createParameterValues(true, false, true, 1.27, 1.27, 1.27),
      },
      {
        key: "temperatureAfterExhaustionWithoutMKSEnd",
        name: "Температура газа после выработки без МКС учатска в конце участка",
        unit: "К",
        values: createParameterValues(false, false, false, 280, 280, 280),
      },
      {
        key: "temperatureAfterExhaustionWithoutMKSEndEditable",
        name: "Температура газа после выработки без МКС учатска в конце участка (редактируемое)",
        unit: "К",
        values: createParameterValues(true, false, true, 280, 280, 280),
      },
      {
        key: "averageAbsolutePressureAfterExhaustionWithoutMKS",
        name: "Среднее абсолютное давление газа после выработки без МКС",
        unit: "МПа",
        values: createParameterValues(false, false, false, 1.37, 1.37, 1.37),
      },
      {
        key: "averageTemperatureAfterExhaustionWithoutMKS",
        name: "Температура газа на участке средняя после выработки без МКС",
        unit: "К",
        values: createParameterValues(false, false, false, 280, 280, 280),
      },
      {
        key: "compressibilityFactorAfterExhaustionWithoutMKS",
        name: "Коэффициент сжимаемости после выработки без МКС",
        unit: "-",
        values: createParameterValues(
          false,
          false,
          false,
          0.9619,
          0.9619,
          0.9619
        ),
      },
      {
        key: "compressibilityFactorAfterExhaustionWithoutMKSEditable",
        name: "Коэффициент сжимаемости после выработки без МКС (редактируемое)",
        unit: "-",
        values: createParameterValues(
          true,
          false,
          true,
          0.9619,
          0.9619,
          0.9619
        ),
      },
      {
        key: "excessPressureAfterExhaustionWithMKSStart",
        name: "Избыточное давление газа после выработки с МКС учатска в начале участка",
        unit: "МПа",
        values: createParameterValues(false, false, false, 1.28, 1.27, 1.27),
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
        values: createParameterValues(false, false, false, 280, 280, 280),
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
        values: createParameterValues(false, false, false, 1.27, 1.27, 1.27),
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
        values: createParameterValues(false, false, false, 280, 280, 280),
      },
      {
        key: "temperatureAfterExhaustionWithMKSEndEditable",
        name: "Температура газа после выработки с МКС учатска в конце участка (редактируемое)",
        unit: "К",
        values: createParameterValues(true, false, true),
      },
      // {
      //   key: "averageAbsolutePressureAfterExhaustionWithMKS",
      //   name: "Среднее абсолютное давление газа после выработки с МКС",
      //   unit: "МПа",
      //   values: createParameterValues(false, false, false),
      // },
      // {
      //   key: "averageTemperatureAfterExhaustionWithMKS",
      //   name: "Температура газа на участке средняя после выработки с МКС",
      //   unit: "К",
      //   values: createParameterValues(false, false, false),
      // },
      {
        key: "compressibilityFactorAfterExhaustionWithMKS",
        name: "Коэффициент сжимаемости после выработки с МКС",
        unit: "-",
        values: createParameterValues(
          false,
          false,
          false,
          0.9619,
          0.9619,
          0.9619
        ),
      },
      {
        key: "compressibilityFactorAfterExhaustionWithMKSEditable",
        name: "Коэффициент сжимаемости после выработки с МКС (редактируемое)",
        unit: "-",
        values: createParameterValues(true, false, true),
      },
      // {
      //   key: "excessPressureBeforeVenting",
      //   name: "Избыточное давление газа до стравливания в начале участка",
      //   unit: "МПа",
      //   values: createParameterValues(false, false, false),
      // },
      // {
      //   key: "temperatureBeforeVenting",
      //   name: "Температура газа до стравливания в начале участка",
      //   unit: "К",
      //   values: createParameterValues(false, false, false),
      // },
      // {
      //   key: "excessPressureBeforeVentingEnd",
      //   name: "Избыточное давление газа до стравливания в конце участка",
      //   unit: "МПа",
      //   values: createParameterValues(false, false, false),
      // },
      // {
      //   key: "temperatureBeforeVentingEnd",
      //   name: "Температура газа до стравливания в конце участка",
      //   unit: "К",
      //   values: createParameterValues(false, false, false),
      // },
      // {
      //   key: "averageAbsolutePressureBeforeVenting",
      //   name: "Среднее абсолютное давление газа до стравливания",
      //   unit: "МПа",
      //   values: createParameterValues(false, false, false),
      // },
      // {
      //   key: "averageTemperatureBeforeVenting",
      //   name: "Температура газа на участке до стравливания средняя",
      //   unit: "К",
      //   values: createParameterValues(false, false, false),
      // },
      // {
      //   key: "compressibilityFactorBeforeVenting",
      //   name: "Коэффициент сжимаемости до стравливания",
      //   unit: "-",
      //   values: createParameterValues(false, false, false),
      // },
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
        values: createParameterValues(true, false, true, 280, 280, 280),
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
        values: createParameterValues(true, false, true, 280, 280, 280),
      },
      {
        key: "averageAbsolutePressureAfterVenting",
        name: "Среднее абсолютное давление газа после стравливания",
        unit: "МПа",
        values: createParameterValues(false, false, false, 0.1, 0.1, 0.1),
      },
      {
        key: "averageTemperatureAfterVenting",
        name: "Температура газа на участке после стравливания средняя",
        unit: "К",
        values: createParameterValues(false, false, false, 280, 280, 280),
      },
      {
        key: "compressibilityFactorAfterVenting",
        name: "Коэффициент сжимаемости после стравливания",
        unit: "-",
        values: createParameterValues(
          true,
          false,
          true,
          0.9972,
          0.9972,
          0.9972
        ),
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
      // {
      //   key: "gasEmptiedFromSectionCubicMeters",
      //   name: "Объём газа, опорожняемого из участка (м³)",
      //   unit: "м³",
      //   values: createParameterValues(false, false, false),
      // },
      // {
      //   key: "gasEmptiedFromSectionFuelEquivalent",
      //   name: "Объём газа, опорожняемого из участка (кг.у.т.)",
      //   unit: "кг.у.т.",
      //   values: createParameterValues(false, false, false),
      // },
      // {
      //   key: "gasEmptiedFromSectionKg",
      //   name: "Объём газа, опорожняемого из участка (кг)",
      //   unit: "кг",
      //   values: createParameterValues(false, false, false),
      // },
      {
        key: "purgeCount",
        name: "Количество продувок при проведении работ",
        unit: "шт.",
        values: createParameterValues(true, false, true, 1, 1, 1),
      },
      // {
      //   key: "gasForRemovingMixtureCubicMeters",
      //   name: "Объём газа, расходуемого для удаления газовоздушной смеси по участкам (м³)",
      //   unit: "м³",
      //   values: createParameterValues(false, false, false),
      // },
      // {
      //   key: "gasForRemovingMixtureFuelEquivalent",
      //   name: "Объём газа, расходуемого для удаления газовоздушной смеси по участкам (кг.у.т.)",
      //   unit: "кг.у.т.",
      //   values: createParameterValues(false, false, false),
      // },
      // {
      //   key: "gasForRemovingMixtureKg",
      //   name: "Объём газа, расходуемого для удаления газовоздушной смеси по участкам (кг)",
      //   unit: "кг",
      //   values: createParameterValues(false, false, false),
      // },
      // {
      //   key: "totalGasConsumptionCubicMeters",
      //   name: "Суммарный расход газа по участкм (м³)",
      //   unit: "м³",
      //   values: createParameterValues(false, false, false),
      // },
      // {
      //   key: "totalGasConsumptionFuelEquivalent",
      //   name: "Суммарный расход газа по участкм (кг.у.т.)",
      //   unit: "кг.у.т.",
      //   values: createParameterValues(false, false, false),
      // },
      // {
      //   key: "totalGasConsumptionKg",
      //   name: "Суммарный расход газа по участкм (кг)",
      //   unit: "кг",
      //   values: createParameterValues(false, false, false),
      // },
      {
        key: "totalNormativeCubicMeters",
        name: "ИТОГО, норматив (м³)",
        unit: "м³",
        values: createParameterValues(false, false, false, 507086, 0, 0),
      },
      {
        key: "totalNormativeFuelEquivalent",
        name: "",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false, 619949, 0, 0),
      },
      {
        key: "totalNormativeKg",
        name: "",
        unit: "кг",
        values: createParameterValues(false, false, false, 381886, 0, 0),
      },
      {
        key: "totalPlanCubicMeters",
        name: "ИТОГО, план (м³)",
        unit: "м³",
        values: createParameterValues(false, false, false, 506030, 0, 0),
      },
      {
        key: "totalPlanFuelEquivalent",
        name: "",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false, 618658, 0, 0),
      },
      {
        key: "totalPlanKg",
        name: "",
        unit: "кг",
        values: createParameterValues(false, false, false, 381091, 0, 0),
      },
      {
        key: "totalFactCubicMeters",
        name: "ИТОГО, факт (м³)",
        unit: "м³",
        values: createParameterValues(false, false, false, 506030, 0, 0),
      },
      {
        key: "totalFactFuelEquivalent",
        name: "",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false, 618658, 0, 0),
      },
      {
        key: "totalFactKg",
        name: "",
        unit: "кг",
        values: createParameterValues(false, false, false, 381091, 0, 0),
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
        name: "",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "gasExhaustedWithoutMKSKg",
        name: "",
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
        name: "",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "gasExhaustedWithMKSKg",
        name: "",
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
        name: "",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalExhaustedWithoutMKSNormativeKg",
        name: "",
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
        name: "",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalExhaustedWithMKSNormativeKg",
        name: "",
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
        name: "",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalExhaustedWithoutMKSPlanKg",
        name: "",
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
        name: "",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalExhaustedWithMKSPlanKg",
        name: "",
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
        name: "",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalExhaustedWithoutMKSFactKg",
        name: "",
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
        name: "",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalExhaustedWithMKSFactKg",
        name: "",
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
        name: "",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalExhaustedNormativeKg",
        name: "",
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
        name: "",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalExhaustedPlanKg",
        name: "",
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
        name: "",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalExhaustedFactKg",
        name: "",
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
        name: "",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalGasEmptiedNormativeKg",
        name: "",
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
        name: "",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalGasEmptiedPlanKg",
        name: "",
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
        name: "",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalGasEmptiedFactKg",
        name: "",
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
        name: "",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalGasForMixtureRemovalNormativeKg",
        name: "",
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
        name: "",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalGasForMixtureRemovalPlanKg",
        name: "",
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
        name: "",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalGasForMixtureRemovalFactKg",
        name: "",
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
        name: "",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalMksGasNormativeKg",
        name: "",
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
        name: "",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalMksGasPlanKg",
        name: "",
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
        name: "",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalMksGasFactKg",
        name: "",
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
        name: "",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "ventedGasLowPressureKg",
        name: "",
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
        name: "",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalVentedGasLowPressureNormativeKg",
        name: "",
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
        name: "",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalVentedGasLowPressurePlanKg",
        name: "",
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
        name: "",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalVentedGasLowPressureFactKg",
        name: "",
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
        name: "",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "gasBeforeRepairExcludingTPLowPressureKg",
        name: "",
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
        name: "",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalGasBeforeRepairExcludingTPLowPressureNormativeKg",
        name: "",
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
        name: "",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalGasBeforeRepairExcludingTPLowPressurePlanKg",
        name: "",
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
        name: "",
        unit: "кг.у.т.",
        values: createParameterValues(false, false, false),
      },
      {
        key: "totalGasBeforeRepairExcludingTPLowPressureFactKg",
        name: "",
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
