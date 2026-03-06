import { computed, effect } from 'nanostores'
import { codeOutputElement } from '../constants/elements'
import { $parseInputWorkerResponse } from '../inputParser/parseInputWorkerManager'
import { cellIsTh, type CellIsThOptions } from '../lib/cellIsTh'
import { formatHtml } from '../lib/formatHtml'
import { sanitizeHtmlElements } from '../lib/replacer'
import {
  $fillEmptyCellsWithNbspOption,
  $firstColumnIsThOption,
  $firstRowIsThOption,
  $htmlFormatOption,
  $indentCharactersOption,
  $wrapWithTableElementOption,
} from '../ui/eventStores'

const $rawHtml = computed(
  [
    $parseInputWorkerResponse,
    $indentCharactersOption,
    $fillEmptyCellsWithNbspOption,
    $wrapWithTableElementOption,
    $firstRowIsThOption,
    $firstColumnIsThOption,
    $htmlFormatOption,
  ],
  (
    response,
    indentCharactersId,
    fillEmptyWithNbsp,
    wrapWithTableElement,
    firstRowIsTh,
    firstColumnIsTh,
    htmlFormat,
  ): string => {
    if (response?.result === undefined) {
      return ''
    }

    const rowsHtml = response?.result
      .map((row, rowIndex) => {
        const rowString = row
          .map((cell, columnIndex) => {
            const cellIsThOptions: CellIsThOptions = {
              rowIndex,
              columnIndex,
              firstRowIsTh,
              firstColumnIsTh,
            }
            const el = cellIsTh(cellIsThOptions) ? 'th' : 'td'
            const sanitizedCell = sanitizeHtmlElements(cell)
            const filledCell =
              sanitizedCell === '' && fillEmptyWithNbsp
                ? '&nbsp;'
                : sanitizedCell
            return `<${el}>${filledCell}</${el}>`
          })
          .join('')

        return `<tr>${rowString}</tr>`
      })
      .join('')

    const input = wrapWithTableElement ? `<table>${rowsHtml}</table>` : rowsHtml

    return formatHtml({ input, indentCharactersId, htmlFormat })
  },
)

effect($rawHtml, (rawHtml) => {
  codeOutputElement.value = rawHtml
})
