import { atom, effect } from 'nanostores'
import { $inputColumnDelimiterOption, $inputData } from '../ui/eventStores'
import {
  parseInputWorker,
  queueTask,
  startQueuedTask,
} from '../workers/parseInput/parseInputWorker'
import type { ParseInputWorkerResponse } from '../workers/parseInput/parseInputWorkerThread'

export const $parseInputWorkerResponse = atom<ParseInputWorkerResponse | null>(
  null,
)

effect(
  [$inputData, $inputColumnDelimiterOption],
  (inputData, inputColumnDelimiterId) => {
    if (inputData === '') {
      $parseInputWorkerResponse.set(null)
      return
    }

    queueTask({ inputLines: inputData.split('\n'), inputColumnDelimiterId })
  },
)

parseInputWorker.addEventListener('message', (event) => {
  const nextTaskIsRunning = startQueuedTask()
  if (nextTaskIsRunning) return

  $parseInputWorkerResponse.set(event.data)
})
