import { useEffect, useState } from 'react'
import type { TerminalSection } from '../data/resume'
import { useTypewriter } from '../hooks/useTypewriter'
import { TerminalOutput } from './TerminalOutput'
import { TerminalPrompt } from './TerminalPrompt'
import { TrafficLights } from './TrafficLights'
import './TerminalWindow.css'

type TerminalWindowProps = {
  section: TerminalSection
  isFocused: boolean
  onFocusToggle: (id: string) => void
  onClose: (id: string) => void
  runAllTrigger: number
}

export function TerminalWindow({
  section,
  isFocused,
  onFocusToggle,
  onClose,
  runAllTrigger,
}: TerminalWindowProps) {
  const [minimized, setMinimized] = useState(false)
  const { displayedText, isTyping, isComplete, start, hasStarted } =
    useTypewriter(section.lines)

  useEffect(() => {
    if (runAllTrigger > 0) {
      setMinimized(false)
      start()
    }
  }, [runAllTrigger, start])

  const showBody = !minimized
  const showCursor = isTyping || (hasStarted && !isTyping)
  const showOutput = hasStarted

  return (
    <article
      className={`terminal-window${isFocused ? ' terminal-window--focused' : ''}${minimized ? ' terminal-window--minimized' : ''}`}
      data-terminal-id={section.id}
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
        <div className="terminal-window__body">
          <TerminalPrompt
            path={section.path}
            command={section.command}
            onRun={start}
            canRun={!isComplete && !isTyping}
            hasRun={isComplete}
          />
          {showOutput && (
            <TerminalOutput text={displayedText} showCursor={showCursor} />
          )}
        </div>
      )}
    </article>
  )
}
