import { checkboxStore, selectElementStore, textareaStore } from '../lib/nanostores'
import {
  inputArea,
  settingColumnDelimiter,
  settingFillEmptyCells,
  settingFirstColumnTh,
  settingFirstRowTh,
  settingHtmlFormat,
  settingWrapWithTableElement,
  settingIndentCharacters,
  settingShowPreviewRows,
  settingShowDescriptions,
} from './elements'

// Input Data
export const $inputData = textareaStore(inputArea)

// Input Settings
export const $inputColumnDelimiterOption = selectElementStore(settingColumnDelimiter)

// Live Preview Settings
export type ShowPreviewRows = '100' | '500' | '1000' | '5000' | '10000' | 'all'
export const $showPreviewRowsOption = selectElementStore<ShowPreviewRows>(settingShowPreviewRows)

// HTML Output Settings
export const $indentCharactersOption = selectElementStore(settingIndentCharacters)
export const $fillEmptyCellsWithNbspOption = checkboxStore(settingFillEmptyCells)
export const $wrapWithTableElementOption = checkboxStore(settingWrapWithTableElement)
export const $firstRowIsThOption = checkboxStore(settingFirstRowTh)
export const $firstColumnIsThOption = checkboxStore(settingFirstColumnTh)
export type HtmlFormat = 'compact' | 'one-line-per-row' | 'one-line-per-column'
export const $htmlFormatOption = selectElementStore<HtmlFormat>(settingHtmlFormat)

// General Setings
export const $showDescriptionsOption = checkboxStore(settingShowDescriptions)
