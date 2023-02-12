export const wrapWithSpan = (text: string) => {
  const lines = text.replace(/  /g, '').split('<br>')

  const spans = lines.map(line => {
    return Array.from(line).map((letter: string) => {
      return `<span class="letter" style="--delay: ${Math.random()}s">${letter === ' ' ? '&nbsp;' : letter}</span>`
    }).join('')
  })

  return spans.join('<br>')
}
