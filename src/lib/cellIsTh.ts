export type CellIsThOptions = {
  rowIndex: number
  columnIndex: number
  firstRowIsTh: boolean
  firstColumnIsTh: boolean
}

export function cellIsTh(options: CellIsThOptions): boolean {
  if (options.rowIndex === 0 && options.firstRowIsTh) {
    return true
  }
  if (options.columnIndex === 0 && options.firstColumnIsTh) {
    return true
  }
  return false
}
