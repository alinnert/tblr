import {
  inputArea,
  settingColumnDelimiter,
  settingFillEmptyCells,
  settingFirstColTh,
  settingFirstRowTh,
  settingHtmlFormat,
  settingIncludeTableElement,
  settingIndentCharacters,
} from '../constants/elements'
import {
  checkboxStore,
  selectElementStore,
  textareaStore,
} from '../lib/nanostores'

export const $inputData = textareaStore(inputArea)

export const $inputColumnDelimiterOption = selectElementStore(
  settingColumnDelimiter,
)
export const $indentCharactersOption = selectElementStore(
  settingIndentCharacters,
)
export const $fillEmptyCellsWithNbspOption = checkboxStore(
  settingFillEmptyCells,
)
export const $wrapWithTableElementOption = checkboxStore(
  settingIncludeTableElement,
)
export const $firstRowIsThOption = checkboxStore(settingFirstRowTh)
export const $firstColumnIsThOption = checkboxStore(settingFirstColTh)
export type HtmlFormat = 'compact' | 'one-line-per-row' | 'one-line-per-column'
export const $htmlFormatOption =
  selectElementStore<HtmlFormat>(settingHtmlFormat)
