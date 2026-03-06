import { inputColumnDelimiters } from '../../constants/inputColumnDelimiters'

export type ParseInputWorkerRequest = {
  inputLines: string[]
  inputColumnDelimiterId: string
}

export type ParseInputWorkerResponse = {
  result: string[][]
  rowsCount: number
  columnsCount: number
  emptyCellsCount: number
  request: ParseInputWorkerRequest
}

addEventListener('message', (event) => {
  const request: ParseInputWorkerRequest = event.data

  const response: ParseInputWorkerResponse = {
    result: [],
    rowsCount: 0,
    columnsCount: 0,
    emptyCellsCount: 0,
    request,
  }

  const inputColumnDelimiter =
    inputColumnDelimiters[request.inputColumnDelimiterId]

  if (inputColumnDelimiter === undefined) return

  response.result = request.inputLines.map((row) => {
    const rowCells = row.split(inputColumnDelimiter)
    response.columnsCount = Math.max(response.columnsCount, rowCells.length)
    return rowCells
  })

  response.rowsCount = response.result.length

  postMessage(response)
})
