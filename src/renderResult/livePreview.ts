import { computed, effect } from 'nanostores'
import { cellIsTh } from '../lib/cellIsTh'
import { $parseInputWorkerResponse } from '../parseInput/parseInputWorkerManager'
import { livePreview } from '../ui/elements'
import {
  $firstColumnIsThOption,
  $firstRowIsThOption,
  $showPreviewRowsOption,
} from '../ui/eventStores'

export const $previewRowsLimit = computed($showPreviewRowsOption, (showPreviewRows): number => {
  return showPreviewRows === 'all' ? Infinity : Number.parseInt(showPreviewRows)
})

const $preview = computed(
  [$parseInputWorkerResponse, $firstRowIsThOption, $firstColumnIsThOption, $previewRowsLimit],
  (response, firstRowIsTh, firstColumnIsTh, limit): string | Node => {
    if (response?.result === undefined) {
      return ''
    }

    if (Number.isNaN(limit)) {
      return ''
    }

    const tableElement = document.createElement('table')

    response.result.slice(0, limit).forEach((row, rowIndex) => {
      const trElement = document.createElement('tr')

      row.forEach((cell, columnIndex) => {
        const thTdElement = cellIsTh({
          rowIndex,
          columnIndex,
          firstRowIsTh,
          firstColumnIsTh,
        })
          ? document.createElement('th')
          : document.createElement('td')
        thTdElement.textContent = cell
        trElement.append(thTdElement)
      })

      tableElement.append(trElement)
    })

    return tableElement
  },
)

effect($preview, (preview) => {
  livePreview.replaceChildren(preview)
})
