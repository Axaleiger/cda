/**
 * Данные BPM-платформы: этапы и карточки (соответствуют структуре из Excel/воронки).
 * Названия карточек согласованы с сущностями воронки (funnelEntities) для подсветки при переходе с плоскости.
 */

export const BPM_STAGES = [
  'ЦД программ',
  'ЦД объекта',
  'Сервисы',
  'Микросервисы',
  'Функции',
]

export const BPM_CARDS_BY_STAGE = {
  'ЦД программ': [
    { id: 'P1', name: 'ЦД РБ' },
    { id: 'P2', name: 'ЦД ПР' },
    { id: 'P3', name: 'ЦД АВНМ' },
    { id: 'P4', name: 'ЦД П' },
  ],
  'ЦД объекта': [
    { id: 'O1', name: 'Пласт' },
    { id: 'O2', name: 'Скважина' },
    { id: 'O3', name: 'Промысел' },
    { id: 'O4', name: 'Инфраструктура' },
    { id: 'O5', name: 'Куст' },
  ],
  'Сервисы': [
    { id: 'S1', name: 'Б6К' },
    { id: 'S2', name: 'СпекТР' },
    { id: 'S3', name: 'КФА' },
    { id: 'S4', name: 'eXoil' },
    { id: 'S5', name: 'ГибРИМА' },
  ],
  'Микросервисы': [
    { id: 'M1', name: 'Микросервис 1' },
    { id: 'M2', name: 'Микросервис 2' },
    { id: 'M3', name: 'Расчет пластовых давлений' },
    { id: 'M4', name: 'Микросервис 4' },
    { id: 'M5', name: 'Микросервис 5' },
  ],
  'Функции': [
    { id: 'F1', name: 'Расчёт пластовых давлений' },
    { id: 'F2', name: 'Моделирование фильтрации' },
    { id: 'F3', name: 'Оптимизация режима работы' },
    { id: 'F4', name: 'Прогноз добычи' },
    { id: 'F5', name: 'Анализ ГД модели' },
  ],
}

/** Проверяет, совпадает ли карточка с запросом подсветки (из воронки). */
export function cardMatchesHighlight(cardName, highlightLabel) {
  if (!highlightLabel || !cardName) return false
  const h = highlightLabel.trim().toLowerCase()
  const c = cardName.trim().toLowerCase()
  if (c === h) return true
  const hBase = h.replace(/\s*\(\d+\)\s*$/, '')
  const cBase = c.replace(/\s*\(\d+\)\s*$/, '')
  if (cBase === hBase || c === hBase || hBase.includes(c) || c.includes(hBase)) return true
  return false
}
