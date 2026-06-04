import './FocusOverlay.css'

type FocusOverlayProps = {
  active: boolean
  onDismiss: () => void
}

export function FocusOverlay({ active, onDismiss }: FocusOverlayProps) {
  if (!active) return null

  return (
    <button
      type="button"
      className="focus-overlay"
      aria-label="Exit focus mode"
      onClick={onDismiss}
    />
  )
}
