import { effect } from 'nanostores'
import { copyHtmlButton } from '../ui/elements'
import { $rawHtml } from './htmlOutput'
import { $isTaskRunning } from '../parseInput/parseInputWorkerQueue'

effect([$isTaskRunning, $rawHtml], (isTaskRunning, rawHtml) => {
  copyHtmlButton.disabled = isTaskRunning || rawHtml === null
})

copyHtmlButton.addEventListener('click', () => {
  const html = $rawHtml.get()
  if (html === null) return
  navigator.clipboard.writeText(html)
})
