import './TerminalPrompt.css'

type TerminalPromptProps = {
  path: string
  command: string
  onRun: () => void
  canRun: boolean
  hasRun: boolean
}

export function TerminalPrompt({
  path,
  command,
  onRun,
  canRun,
  hasRun,
}: TerminalPromptProps) {
  const displayPath = path === '~' ? '~' : path.replace(/^~\/?/, '~/')

  return (
    <div className="terminal-prompt">
      <div className="terminal-prompt__line">
        <span className="terminal-prompt__bracket">[</span>
        <span className="terminal-prompt__user">tylerdev@portfolio</span>
        <span className="terminal-prompt__sep">:</span>
        <span className="terminal-prompt__path">{displayPath}</span>
        <span className="terminal-prompt__bracket"> %</span>
        <span className="terminal-prompt__command"> {command}</span>
      </div>
      <button
        type="button"
        className="terminal-run"
        onClick={onRun}
        disabled={!canRun || hasRun}
        aria-label={`Run command: ${command}`}
      >
        Run
      </button>
    </div>
  )
}
