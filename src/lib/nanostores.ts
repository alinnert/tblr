import { atom, readonlyType, type ReadableAtom } from 'nanostores'

export function checkboxStore(
  element: HTMLInputElement,
): ReadableAtom<boolean> {
  const $checked = atom(element.checked)

  element.addEventListener('change', (event) => {
    if (!(event.currentTarget instanceof HTMLInputElement)) return
    $checked.set(event.currentTarget.checked)
  })

  return readonlyType($checked)
}

export function selectElementStore(
  element: HTMLSelectElement,
): ReadableAtom<string> {
  const $value = atom(element.value)

  element.addEventListener('change', (event) => {
    if (!(event.currentTarget instanceof HTMLSelectElement)) return
    $value.set(event.currentTarget.value)
  })

  return readonlyType($value)
}

export function textareaStore(
  element: HTMLTextAreaElement,
): ReadableAtom<string> {
  const $value = atom(element.value)

  element.addEventListener('input', (event) => {
    if (!(event.currentTarget instanceof HTMLTextAreaElement)) return
    $value.set(event.currentTarget.value)
  })

  return readonlyType($value)
}
