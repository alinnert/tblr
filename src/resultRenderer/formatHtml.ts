import { outputIndentCharacters } from '../constants/outputIndentCharacters'

export type FormatHtmlOptions = {
  input: string
  columnsOnSeparateRow: boolean
  indentCharacters: string
}

export function formatHtml(options: FormatHtmlOptions): string {
  const indentForTableElement = options.input.startsWith('<table>') ? 1 : 0
  const indentCharacters = outputIndentCharacters[options.indentCharacters]
  if (indentCharacters === undefined) {
    return 'Invalid indent character value!'
  }

  const trIndent = indentCharacters.repeat(indentForTableElement)
  const thTdIndent = indentCharacters.repeat(1 + indentForTableElement)

  return options.input.replaceAll(
    /(<\/?tr>|<th>|<td>|<\/table>)/g,
    indentReplacer,
  )

  function indentReplacer(match: string): string {
    if (match.includes('tr')) {
      return '\n' + trIndent + match
    }
    if (match.includes('th') || match.includes('td')) {
      return '\n' + thTdIndent + match
    }
    return '\n' + match
  }
}
