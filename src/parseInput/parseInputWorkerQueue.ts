import { atom } from 'nanostores'
import type { ParseInputWorkerRequest } from './parseInputWorker'

export const $isTaskRunning = atom(false)
const $queuedTask = atom<ParseInputWorkerRequest | null>(null)

const url = new URL('./parseInputWorker.ts', import.meta.url)
export const parseInputWorker = new Worker(url, { type: 'module' })

export function queueTask(task: ParseInputWorkerRequest): void {
  if ($isTaskRunning.get()) {
    $queuedTask.set(task)
    return
  }

  parseInputWorker.postMessage(task)
  $isTaskRunning.set(true)
}

export function startQueuedTask(): boolean {
  if ($queuedTask.get() !== null) {
    parseInputWorker.postMessage($queuedTask.get())
    $isTaskRunning.set(true)
    $queuedTask.set(null)
    return true
  }

  $isTaskRunning.set(false)
  return false
}
