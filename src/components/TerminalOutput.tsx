import type { ReactNode } from 'react'
import { BlinkingCursor } from './BlinkingCursor'
import './TerminalOutput.css'

type TerminalOutputProps = {
  text: string
  showCursor: boolean
}

function linkifyLine(line: string): ReactNode {
  const urlMatch = line.match(/(https?:\/\/[^\s]+)/)
  if (!urlMatch) return line

  const url = urlMatch[1]
  const idx = line.indexOf(url)
  const before = line.slice(0, idx)
  const after = line.slice(idx + url.length)

  return (
    <>
      {before}
      <a href={url} target="_blank" rel="noopener noreferrer">
        {url}
      </a>
      {after}
    </>
  )
}

export function TerminalOutput({ text, showCursor }: TerminalOutputProps) {
  if (!text && !showCursor) return null

  const lines = text ? text.split('\n') : []

  return (
    <pre className="terminal-output" aria-live="polite">
      {lines.map((line, i) => (
        <span key={i} className="terminal-output__line">
          {linkifyLine(line)}
          {'\n'}
        </span>
      ))}
      {showCursor && <BlinkingCursor />}
    </pre>
  )
}
