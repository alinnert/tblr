import { inputArea, tabElements } from '../constants/elements'
import { supportTabInTextarea } from './supportTabInTextarea'
import { handleTabClick } from './tabContainer'

inputArea.addEventListener('keydown', supportTabInTextarea)

for (const element of tabElements) {
  element.addEventListener('click', handleTabClick)
}
