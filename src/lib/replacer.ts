export function sanitizeHtmlElements(input: string): string {
  return input.replaceAll(/[<>]/g, (match: string): string => {
    if (match === '<') {
      return '&lt;'
    }
    if (match === '>') {
      return '&gt;'
    }
    return match
  })
}
