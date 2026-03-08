import { atom, effect } from 'nanostores'
import type { ParseInputWorkerRequest } from './parseInputWorker'
import { parsingProcess } from '../ui/elements'

export const $isTaskRunning = atom(false)
const $queuedTask = atom<ParseInputWorkerRequest | null>(null)

export const parseInputWorker = new Worker(new URL('./parseInputWorker.ts', import.meta.url), {
  type: 'module',
})

export function queueTask(task: ParseInputWorkerRequest): void {
  $queuedTask.set(task)
  if ($isTaskRunning.get()) return

  startQueuedTask()
}

export function startQueuedTask() {
  if ($queuedTask.get() === null) {
    $isTaskRunning.set(false)
    return
  }

  $isTaskRunning.set(true)
  parseInputWorker.postMessage($queuedTask.get())
  $queuedTask.set(null)
}

effect($isTaskRunning, (isTaskRunning) => {
  parsingProcess.classList.toggle('visible', isTaskRunning)
})
