import type { ParseInputWorkerRequest } from './parseInputWorkerThread'

type State = {
  isTaskRunning: boolean
  queuedTask: ParseInputWorkerRequest | null
}

const state: State = {
  isTaskRunning: false,
  queuedTask: null,
}

const url = new URL('./parseInputWorkerThread.ts', import.meta.url)
export const parseInputWorker = new Worker(url, { type: 'module' })

export function queueTask(task: ParseInputWorkerRequest): void {
  if (state.isTaskRunning) {
    state.queuedTask = task
    return
  }

  parseInputWorker.postMessage(task)
  state.isTaskRunning = true
}

export function startQueuedTask(): boolean {
  if (state.queuedTask !== null) {
    parseInputWorker.postMessage(state.queuedTask)
    state.isTaskRunning = true
    state.queuedTask = null
    return true
  }

  state.isTaskRunning = false
  return false
}
