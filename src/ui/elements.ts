import { $$, $id } from '../lib/dom'

export const settingColumnDelimiter = $id('setting-column-delimiter', HTMLSelectElement)

export const settingShowPreviewRows = $id('setting-show-preview-rows', HTMLSelectElement)

export const settingIndentCharacters = $id('setting-indent-characters', HTMLSelectElement)
export const settingFillEmptyCells = $id('setting-fill-empty-cells', HTMLInputElement)
export const settingWrapWithTableElement = $id('setting-wrap-with-table-element', HTMLInputElement)
export const settingFirstRowTh = $id('setting-first-row-th', HTMLInputElement)
export const settingFirstColumnTh = $id('setting-first-column-th', HTMLInputElement)
export const settingHtmlFormat = $id('setting-html-format', HTMLSelectElement)

export const tabElements = $$('.tab')

export const inputArea = $id('data-input', HTMLTextAreaElement)
export const livePreviewStats = $id('data-stats', HTMLDivElement)

export const outputTabContainerTabs = $$('.tab')
export const outputTabContainerTabBodies = $$('.tab-body')

export const livePreview = $id('live-preview', HTMLDivElement)
export const livePreviewMessage = $id('live-preview-message', HTMLDivElement)

export const codeOutputElement = $id('code-output', HTMLTextAreaElement)
