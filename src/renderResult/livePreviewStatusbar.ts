import { computed, effect } from 'nanostores'
import { $parseInputWorkerResponse } from '../parseInput/parseInputWorkerManager'
import { livePreviewMessage } from '../ui/elements'
import { $previewRowsLimit } from './livePreview'

export const $resultRowsCount = computed(
  $parseInputWorkerResponse,
  (response) => response?.result.length ?? 0,
)

effect([$previewRowsLimit, $resultRowsCount], (limit, count) => {
  const truncatedPreviewMessage = `<span>⚠️ only <strong class="tnum">${limit}</strong> of <strong class="tnum">${count}</strong> rows visible</span>`
  livePreviewMessage.innerHTML = count > limit ? truncatedPreviewMessage : '&nbsp;'
})
