import './ResumeScript.css'

type ResumeScriptProps = {
  onRunAll: () => void
  disabled: boolean
}

const SCRIPT_BODY = `for item in page; do
  run "$item"
done`

export function ResumeScript({ onRunAll, disabled }: ResumeScriptProps) {
  return (
    <section className="resume-script" aria-label="Run entire resume script">
      <div className="resume-script__inner">
        <p className="resume-script__heading"># Display All</p>
        <p className="resume-script__subcomment">
          # Expands entire resume for quick viewing
        </p>
        <pre className="resume-script__code">{SCRIPT_BODY}</pre>
      </div>
      <button
        type="button"
        className="resume-script__run"
        onClick={onRunAll}
        disabled={disabled}
        aria-label="Run script: display all resume sections"
      >
        Run
      </button>
    </section>
  )
}
