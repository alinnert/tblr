import { effect } from 'nanostores'
import {
  asideInfoChars,
  asideInfoColumns,
  asideInfoEmptyCells,
  asideInfoLines,
} from '../constants/elements'
import { $parseInputWorkerResponse } from '../parseInput/parseInputWorkerManager'
import { $inputData } from '../ui/eventStores'

effect($inputData, (inputData) => {
  asideInfoChars.textContent = inputData.length.toString()
})

effect($parseInputWorkerResponse, (response) => {
  asideInfoLines.textContent = response?.rowsCount.toString() ?? '0'
  asideInfoColumns.textContent = response?.columnsCount.toString() ?? '0'
  asideInfoEmptyCells.textContent = response?.emptyCellsCount.toString() ?? '0'
})
