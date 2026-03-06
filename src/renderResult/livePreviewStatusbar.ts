import { computed, effect } from 'nanostores'
import { $parseInputWorkerResponse } from '../parseInput/parseInputWorkerManager'
import { livePreviewMessage, livePreviewStats } from '../ui/elements'
import { $inputData } from '../ui/eventStores'
import { $previewRowsLimit } from './livePreview'

const $resultRowsCount = computed(
  $parseInputWorkerResponse,
  (response) => response?.result.length ?? 0,
)

effect([$inputData, $parseInputWorkerResponse], (inputData, response) => {
  const bytes = new TextEncoder().encode(inputData).length

  const stats: string[] = [
    `<strong class="tnum">${response?.columnsCount.toLocaleString() ?? 0}</strong> cols × <strong class="tnum">${response?.rowsCount.toLocaleString() ?? 0}</strong> rows`,
    `<strong class="tnum">${response?.emptyCellsCount.toLocaleString() ?? 0}</strong> empty cells`,
    `<strong class="tnum">${bytes.toLocaleString()}</strong> bytes`,
  ]

  livePreviewStats.replaceChildren(
    ...stats.map((it) => {
      const div = document.createElement('div')
      div.innerHTML = it
      return div
    }),
  )
})

effect([$previewRowsLimit, $resultRowsCount], (limit, count) => {
  const truncatedPreviewMessage = `<span>⚠️ only <strong class="tnum">${limit}</strong> of <strong class="tnum">${count}</strong> rows visible</span>`
  livePreviewMessage.innerHTML = count > limit ? truncatedPreviewMessage : '&nbsp;'
})
