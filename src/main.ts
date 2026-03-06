import { inputArea, tabElements } from './constants/elements'
import './resultRenderer/renderData'
import { changeTab } from './ui/changeTab'
import { supportTab } from './ui/supportTab'

inputArea.addEventListener('keydown', supportTab)

for (const element of tabElements) {
  element.addEventListener('click', changeTab)
}
