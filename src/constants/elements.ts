import { $$, $id } from '../lib/dom'

export const settingColumnDelimiter = $id(
  'setting-column-delimiter',
  HTMLSelectElement,
)
export const settingIndentCharacters = $id(
  'setting-indent-characters',
  HTMLSelectElement,
)
export const settingFillEmptyCells = $id(
  'setting-fill-empty-cells',
  HTMLInputElement,
)
export const settingIncludeTableElement = $id(
  'setting-include-table-element',
  HTMLInputElement,
)
export const settingFirstRowTh = $id('setting-first-row-th', HTMLInputElement)
export const settingFirstColTh = $id('setting-first-col-th', HTMLInputElement)
export const settingHtmlFormat = $id('setting-html-format', HTMLSelectElement)

export const tabElements = $$('.tab-container .tabs .tab')

export const inputArea = $id('data-input', HTMLTextAreaElement)

export const outputTabContainer = $id('output-tab-container', HTMLDivElement)
export const outputTabContainerTabs =
  outputTabContainer.querySelectorAll('.tab')
export const outputTabContainerTabBodies =
  outputTabContainer.querySelectorAll('.tab-body')

export const codeOutputElement = $id('code-output', HTMLTextAreaElement)
export const codePreview = $id('code-preview', HTMLDivElement)

export const asideInfoChars = $id('aside-info-chars', HTMLDivElement)
export const asideInfoLines = $id('aside-info-lines', HTMLDivElement)
export const asideInfoColumns = $id('aside-info-columns', HTMLDivElement)
export const asideInfoEmptyCells = $id('aside-info-empty-cells', HTMLDivElement)
