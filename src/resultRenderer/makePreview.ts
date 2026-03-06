import { cellIsTh } from '../lib/cellIsTh'

export type MakePreviewOptions = {
  cells: string[][]
  firstRowIsTh: boolean
  firstColumnIsTh: boolean
}

export function makePreview(options: MakePreviewOptions): HTMLTableElement {
  const tableElement = document.createElement('table')

  options.cells.forEach((row, rowIndex) => {
    const trElement = document.createElement('tr')

    row.forEach((cell, columnIndex) => {
      const thTdElement = cellIsTh({
        rowIndex,
        columnIndex,
        firstRowIsTh: options.firstRowIsTh,
        firstColumnIsTh: options.firstColumnIsTh,
      })
        ? document.createElement('th')
        : document.createElement('td')
      thTdElement.textContent = cell
      trElement.append(thTdElement)
    })

    tableElement.append(trElement)
  })

  return tableElement
}
