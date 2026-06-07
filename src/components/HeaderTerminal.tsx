import type { SectionHeader } from '../data/resume'
import './HeaderTerminal.css'
import './TerminalWindow.css'

type HeaderTerminalProps = {
  section: SectionHeader
}

export function HeaderTerminal({ section }: HeaderTerminalProps) {
  return (
    <article
      className="terminal-window terminal-window--header-only"
      data-terminal-id={section.id}
      aria-label={section.heading}
    >
      <div className="terminal-window__body">
        <p className="header-terminal__command">{section.command}</p>
        <p className="header-terminal__heading">{section.heading}</p>
      </div>
    </article>
  )
}
