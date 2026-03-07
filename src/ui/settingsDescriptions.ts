import { effect } from 'nanostores'
import { appSidebar } from './elements'
import { $showDescriptionsOption } from './eventStores'

effect($showDescriptionsOption, (showDescriptions) => {
  appSidebar.classList.toggle('hide-descriptions', !showDescriptions)
})

appSidebar.querySelectorAll('p.details').forEach((element) => {
  const previousElement = element.previousElementSibling
  if (previousElement === null) return
  if (!(previousElement instanceof HTMLLabelElement)) return

  const text = element.textContent
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l !== '')
    .join(' ')

  if (text === '') return

  previousElement.title = text
})
