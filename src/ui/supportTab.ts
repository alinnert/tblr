import { inputArea } from '../constants/elements'

export function supportTab(event: KeyboardEvent): void {
  if (event.key !== 'Tab') return
  if (!(event.currentTarget instanceof HTMLTextAreaElement)) return

  event.preventDefault()

  const element = event.currentTarget
  const start = element.selectionStart
  const end = element.selectionEnd
  const currentValue = element.value
  const contentBeforeSelection = currentValue.substring(0, start)
  const contentAfterSelection = currentValue.substring(end)

  element.value = `${contentBeforeSelection}\t${contentAfterSelection}`
  element.selectionStart = element.selectionEnd = start + 1

  inputArea.dispatchEvent(new Event('input'))
}
