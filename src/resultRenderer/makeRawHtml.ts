import { cellIsTh, type CellIsThOptions } from '../lib/cellIsTh'
import { formatHtml } from './formatHtml'

export type MakeHtmlOptions = {
  cells: string[][]
  indentCharacters: string
  wrapWithTableElement: boolean
  fillEmptyWithNbsp: boolean
  firstRowIsTh: boolean
  firstColumnIsTh: boolean
  columnsOnSeparateRow: boolean
}

export function makeRawHtml(options: MakeHtmlOptions): string {
  const rowsHtml = options.cells
    .map((row, rowIndex) => {
      const rowString = row
        .map((cell, columnIndex) => {
          const cellIsThOptions: CellIsThOptions = {
            rowIndex,
            columnIndex,
            firstRowIsTh: options.firstRowIsTh,
            firstColumnIsTh: options.firstColumnIsTh,
          }
          const el = cellIsTh(cellIsThOptions) ? 'th' : 'td'
          const sanitizedCell = cell.replaceAll(/[<>]/g, sanitizeReplacer)
          const filledCell =
            sanitizedCell === '' && options.fillEmptyWithNbsp
              ? '&nbsp;'
              : sanitizedCell
          return `<${el}>${filledCell}</${el}>`
        })
        .join('')

      return `<tr>${rowString}</tr>`
    })
    .join('')

  const result = options.wrapWithTableElement
    ? `<table>${rowsHtml}</table>`
    : rowsHtml

  return formatHtml({
    input: result,
    columnsOnSeparateRow: options.columnsOnSeparateRow,
    indentCharacters: options.indentCharacters,
  })
}

function sanitizeReplacer(match: string): string {
  if (match === '<') {
    return '&lt;'
  }
  if (match === '>') {
    return '&gt;'
  }
  return match
}
