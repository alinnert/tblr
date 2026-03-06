import { computed, effect } from 'nanostores'
import {
  asideInfoChars,
  asideInfoColumns,
  asideInfoEmptyCells,
  asideInfoLines,
  codeOutputElement,
  codePreview,
} from '../constants/elements'
import { $parseInputWorkerResponse } from '../inputParser/parseInputWorkerManager'
import {
  $fillEmptyCellsWithNbspOption,
  $firstColumnIsThOption,
  $firstRowIsThOption,
  $indentCharactersOption,
  $inputData,
  $outputCellsOnNewLineOption,
  $wrapWithTableElementOption,
} from '../ui/eventStores'
import { makePreview } from './makePreview'
import { makeRawHtml } from './makeRawHtml'

const $rawHtml = computed(
  [
    $parseInputWorkerResponse,
    $indentCharactersOption,
    $fillEmptyCellsWithNbspOption,
    $wrapWithTableElementOption,
    $firstRowIsThOption,
    $firstColumnIsThOption,
    $outputCellsOnNewLineOption,
  ],
  (
    response,
    indentCharacters,
    fillEmptyWithNbsp,
    wrapWithTableElement,
    firstRowIsTh,
    firstColumnIsTh,
    columnsOnSeparateRow,
  ): string => {
    if (response === null) {
      return ''
    }

    return makeRawHtml({
      cells: response.result,
      indentCharacters,
      fillEmptyWithNbsp,
      wrapWithTableElement,
      firstRowIsTh,
      firstColumnIsTh,
      columnsOnSeparateRow,
    })
  },
)

effect($rawHtml, (rawHtml) => {
  codeOutputElement.value = rawHtml
})

const $preview = computed(
  [$parseInputWorkerResponse, $firstRowIsThOption, $firstColumnIsThOption],
  (response, firstRowIsTh, firstColumnIsTh) => {
    if (response === null) {
      return ''
    }

    return makePreview({
      cells: response.result,
      firstRowIsTh,
      firstColumnIsTh,
    })
  },
)

effect($preview, (preview) => {
  codePreview.replaceChildren(preview)
})

effect($inputData, (inputData) => {
  asideInfoChars.textContent = inputData.length.toString()
})

effect($parseInputWorkerResponse, (response) => {
  asideInfoLines.textContent = response?.rowsCount.toString() ?? '0'
  asideInfoColumns.textContent = response?.columnsCount.toString() ?? '0'
  asideInfoEmptyCells.textContent = response?.emptyCellsCount.toString() ?? '0'
})
