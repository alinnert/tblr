import { effect } from 'nanostores'
import { dataStats } from '../ui/elements'
import { $inputData } from '../ui/eventStores'
import { $parseInputWorkerResponse } from './parseInputWorkerManager'

effect([$inputData, $parseInputWorkerResponse], (inputData, response) => {
  const bytes = new TextEncoder().encode(inputData).length

  const stats: string[] = [
    `<strong class="tnum">${response?.columnsCount.toLocaleString() ?? 0}</strong> columns × <strong class="tnum">${response?.rowsCount.toLocaleString() ?? 0}</strong> rows`,
    `<strong class="tnum">${response?.emptyCellsCount.toLocaleString() ?? 0}</strong> empty cells`,
    `<strong class="tnum">${bytes.toLocaleString()}</strong> bytes`,
  ]

  dataStats.replaceChildren(
    ...stats.map((it) => {
      const div = document.createElement('div')
      div.innerHTML = it
      return div
    }),
  )
})
