import { useCallback, useState } from 'react'
import { AsciiHero } from './components/AsciiHero'
import { FocusOverlay } from './components/FocusOverlay'
import { ResumeScript } from './components/ResumeScript'
import { SectionHeaderWindow } from './components/SectionHeaderWindow'
import { TerminalWindow } from './components/TerminalWindow'
import { isTerminalSection, resumeItems } from './data/resume'
import './App.css'

export default function App() {
  const [closedIds, setClosedIds] = useState<Set<string>>(new Set())
  const [focusedId, setFocusedId] = useState<string | null>(null)
  const [runAllTrigger, setRunAllTrigger] = useState(0)
  const [runAllStarted, setRunAllStarted] = useState(false)

  const visibleItems = resumeItems.filter((item) => !closedIds.has(item.id))
  const visibleTerminals = visibleItems.filter(isTerminalSection)

  const handleClose = useCallback((id: string) => {
    setClosedIds((prev) => new Set(prev).add(id))
    setFocusedId((current) => (current === id ? null : current))
  }, [])

  const handleFocusToggle = useCallback((id: string) => {
    setFocusedId((current) => (current === id ? null : id))
  }, [])

  const dismissFocus = useCallback(() => {
    setFocusedId(null)
  }, [])

  const handleRunAll = useCallback(() => {
    setRunAllStarted(true)
    setRunAllTrigger((n) => n + 1)
  }, [])

  const scriptDisabled =
    visibleTerminals.length === 0 || runAllStarted

  return (
    <div className={`app${focusedId ? ' app--focus-active' : ''}`}>
      <div className={`app__content${focusedId ? ' app__content--dimmed' : ''}`}>
        <FocusOverlay active={focusedId !== null} onDismiss={dismissFocus} />
        <AsciiHero />
        <ResumeScript onRunAll={handleRunAll} disabled={scriptDisabled} />

        <main className="app__terminals">
          {visibleItems.map((item) =>
            item.kind === 'header' ? (
              <SectionHeaderWindow
                key={item.id}
                section={item}
                isFocused={focusedId === item.id}
                onFocusToggle={handleFocusToggle}
                onClose={handleClose}
              />
            ) : (
              <TerminalWindow
                key={item.id}
                section={item}
                isFocused={focusedId === item.id}
                onFocusToggle={handleFocusToggle}
                onClose={handleClose}
                runAllTrigger={runAllTrigger}
              />
            ),
          )}
        </main>

        {closedIds.size > 0 && (
          <p className="app__hint">
            {closedIds.size} window{closedIds.size > 1 ? 's' : ''} closed — refresh
            to restore.
          </p>
        )}
      </div>
    </div>
  )
}
