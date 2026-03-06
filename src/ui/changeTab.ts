export function changeTab(event: Event): void {
  const clickedTab = event.currentTarget
  if (!(clickedTab instanceof HTMLDivElement)) {
    return
  }

  const tabElement = clickedTab.parentElement?.parentElement ?? null
  if (tabElement === null) {
    return
  }

  const allTabs = Array.from(tabElement.querySelectorAll('.tabs .tab'))
  const clickedTabIndex = allTabs.indexOf(clickedTab)
  const allTabBodyElements = tabElement.querySelectorAll(
    '.tab-contents .tab-body',
  )

  for (let i = 0; i < allTabs.length; i++) {
    allTabs[i].classList.remove('current')
    allTabBodyElements[i].classList.remove('current')
  }

  allTabs[clickedTabIndex].classList.add('current')
  allTabBodyElements[clickedTabIndex].classList.add('current')
}
