import { inputArea, tabElements } from '../constants/elements'
import { changeTab } from './changeTab'
import { supportTab } from './supportTab'

inputArea.addEventListener('keydown', supportTab)

for (const element of tabElements) {
  element.addEventListener('click', changeTab)
}
