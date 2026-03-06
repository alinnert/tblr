import { outputIndentCharacters } from '../renderResult/outputIndentCharacters'
import type { HtmlFormat } from '../ui/eventStores'

export type FormatHtmlOptions = {
  input: string
  indentCharactersId: string
  htmlFormat: HtmlFormat
}

export function formatHtml({ input, indentCharactersId, htmlFormat }: FormatHtmlOptions): string {
  const baseIndentLevel = input.startsWith('<table>') ? 1 : 0
  const indentCharacters = outputIndentCharacters[indentCharactersId]
  if (indentCharacters === undefined) {
    return 'Invalid indent character value!'
  }

  return input.replaceAll(
    /(<table>|<\/table>|<tr>|<\/tr>|<th>|<td>)/g,
    getFormatReplacer({
      baseIndentLevel,
      indentCharacters,
      htmlFormat,
    }),
  )
}

type GetIndentReplacementTokensOptions = {
  baseIndentLevel: 0 | 1
  indentCharacters: string
  htmlFormat: HtmlFormat
}

function getFormatReplacer({
  baseIndentLevel,
  indentCharacters,
  htmlFormat,
}: GetIndentReplacementTokensOptions) {
  return (match: string) => {
    const indent = (level = 0) => indentCharacters.repeat(baseIndentLevel + level)

    if (htmlFormat === 'one-line-per-column') {
      return (
        {
          '<table>': `${match}\n`,
          '</table>': `${match}\n`,
          '<tr>': `${indent()}${match}`,
          '</tr>': `\n${indent()}${match}\n`,
          '<th>': `\n${indent(1)}${match}`,
          '<td>': `\n${indent(1)}${match}`,
        }[match] ?? match
      )
    }

    if (htmlFormat === 'one-line-per-row') {
      return (
        {
          '<table>': `${match}\n`,
          '</table>': `${match}\n`,
          '<tr>': `${indent()}${match}`,
          '</tr>': `${match}\n`,
          '<th>': `${match}`,
          '<td>': `${match}`,
        }[match] ?? match
      )
    }

    return match
  }
}
