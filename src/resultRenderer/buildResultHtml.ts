import { wrapArray } from './lib/array'

export type BuildResultHtmlOptions = {
  includeTableElement: boolean
}

export function buildResultHtml(
  rowsHtml: string[],
  options: BuildResultHtmlOptions,
): string {
  if (rowsHtml.length === 0) {
    return 'No data available!\n\nPlease input some data into the textarea on the left.'
  }

  const segments: string[] = [...rowsHtml]

  if (options.includeTableElement) {
    wrapArray('<table>', segments, '</table>')
  }

  return segments.join('\n')
}
