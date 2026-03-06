import { atom, effect } from 'nanostores'
import {
  outputTabContainerTabBodies,
  outputTabContainerTabs,
} from '../constants/elements'

const tabIds = ['live-preview', 'html-output'] as const
type TabId = (typeof tabIds)[number]

const $tabId = atom<TabId>('live-preview')

export function handleTabClick(event: Event): void {
  const clickedTab = event.currentTarget
  if (!(clickedTab instanceof HTMLDivElement)) return

  const clickedTabId = clickedTab.dataset.tabId as TabId
  if (!tabIds.includes(clickedTabId)) return
  $tabId.set(clickedTabId)
}

effect($tabId, (tabId) => {
  outputTabContainerTabs.forEach((tab) => {
    if (!(tab instanceof HTMLElement)) return
    tab.classList.toggle('current', tab.dataset.tabId === tabId)
  })
  outputTabContainerTabBodies.forEach((tab) => {
    if (!(tab instanceof HTMLElement)) return
    tab.classList.toggle('current', tab.dataset.tabId === tabId)
  })
})
