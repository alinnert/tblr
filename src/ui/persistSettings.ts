import {
  settingColumnDelimiter,
  settingFillEmptyCells,
  settingFirstColumnTh,
  settingFirstRowTh,
  settingHtmlFormat,
  settingIndentCharacters,
  settingShowPreviewRows,
  settingWrapWithTableElement,
} from './elements'

const persistSelectElements: HTMLSelectElement[] = [
  settingColumnDelimiter,
  settingShowPreviewRows,
  settingHtmlFormat,
  settingIndentCharacters,
]

const persistCheckboxElements: HTMLInputElement[] = [
  settingFillEmptyCells,
  settingFirstRowTh,
  settingFirstColumnTh,
  settingWrapWithTableElement,
]

for (const element of persistSelectElements) {
  const storageKey = `tblr.${element.id}`
  const persistedValue = localStorage.getItem(storageKey)

  if (persistedValue !== null && element.value !== persistedValue) {
    element.value = persistedValue
    element.dispatchEvent(new Event('change'))
  }

  element.addEventListener('change', (event) => {
    if (!(event.target instanceof HTMLSelectElement)) return
    localStorage.setItem(storageKey, event.target.value)
  })
}

for (const element of persistCheckboxElements) {
  const storageKey = `tblr.${element.id}`
  const persistedValue = localStorage.getItem(storageKey)

  if (persistedValue !== null) {
    const shouldBeChecked = persistedValue === 'true'
    if (element.checked !== shouldBeChecked) {
      element.checked = shouldBeChecked
      element.dispatchEvent(new Event('change'))
    }
  }

  element.addEventListener('change', (event) => {
    if (!(event.target instanceof HTMLInputElement)) return
    localStorage.setItem(storageKey, String(event.target.checked))
  })
}
