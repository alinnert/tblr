import { computed, effect } from 'nanostores'
import { livePreview } from '../constants/elements'
import { $parseInputWorkerResponse } from '../parseInput/parseInputWorkerManager'
import { cellIsTh } from '../lib/cellIsTh'
import { $firstColumnIsThOption, $firstRowIsThOption } from '../ui/eventStores'

const $preview = computed(
  [$parseInputWorkerResponse, $firstRowIsThOption, $firstColumnIsThOption],
  (response, firstRowIsTh, firstColumnIsTh): string | Node => {
    if (response?.result === undefined) {
      return ''
    }

    const tableElement = document.createElement('table')

    response?.result.forEach((row, rowIndex) => {
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
