import { useState } from 'react'
import type { SectionHeader } from '../data/resume'
import { TrafficLights } from './TrafficLights'
import './SectionHeaderWindow.css'
import './TerminalWindow.css'

type SectionHeaderWindowProps = {
  section: SectionHeader
  isFocused: boolean
  onFocusToggle: (id: string) => void
  onClose: (id: string) => void
}

export function SectionHeaderWindow({
  section,
  isFocused,
  onFocusToggle,
  onClose,
}: SectionHeaderWindowProps) {
  const [minimized, setMinimized] = useState(false)
  const showBody = !minimized

  return (
    <article
      className={`terminal-window section-header-window${isFocused ? ' terminal-window--focused' : ''}${minimized ? ' terminal-window--minimized' : ''}`}
      data-terminal-id={section.id}
      aria-label={section.heading}
    >
      <header className="terminal-window__titlebar">
        <TrafficLights
          onClose={() => onClose(section.id)}
          onMinimize={() => setMinimized((m) => !m)}
          onFocus={() => onFocusToggle(section.id)}
          isFocused={isFocused}
          minimized={minimized}
        />
        <span className="terminal-window__title" title={section.title}>
          {section.title}
        </span>
      </header>

      {showBody && (
        <div className="terminal-window__body section-header-window__body">
          <p className="section-header-window__heading">{section.heading}</p>
        </div>
      )}
    </article>
  )
}
