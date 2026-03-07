import { atom, computed, effect } from 'nanostores'
import { $inputColumnDelimiterOption, $inputData } from '../ui/eventStores'
import type { ParseInputWorkerResponse } from './parseInputWorker'
import { parseInputWorker, queueTask, startQueuedTask } from './parseInputWorkerQueue'

export const $parseInputWorkerResponse = atom<ParseInputWorkerResponse | null>(null)

const $trimmedInputData = computed($inputData, (inputData) => inputData.trim())

effect([$trimmedInputData, $inputColumnDelimiterOption], (inputData, inputColumnDelimiterId) => {
  if (inputData === '') {
    $parseInputWorkerResponse.set(null)
    return
  }

  queueTask({ inputLines: inputData.split('\n'), inputColumnDelimiterId })
})

parseInputWorker.addEventListener('message', (event) => {
  startQueuedTask()
  $parseInputWorkerResponse.set(event.data)
})
