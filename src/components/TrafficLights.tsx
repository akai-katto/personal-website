import './TrafficLights.css'

type TrafficLightsProps = {
  onClose: () => void
  onMinimize: () => void
  onFocus: () => void
  isFocused: boolean
  minimized: boolean
}

export function TrafficLights({
  onClose,
  onMinimize,
  onFocus,
  isFocused,
  minimized,
}: TrafficLightsProps) {
  return (
    <div className="traffic-lights" role="group" aria-label="Window controls">
      <button
        type="button"
        className="traffic-light traffic-light--red"
        aria-label="Close window"
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
      />
      <button
        type="button"
        className="traffic-light traffic-light--yellow"
        aria-label={minimized ? 'Restore window' : 'Minimize window'}
        onClick={(e) => {
          e.stopPropagation()
          onMinimize()
        }}
      />
      <button
        type="button"
        className={`traffic-light traffic-light--green${isFocused ? ' traffic-light--active' : ''}`}
        aria-label={isFocused ? 'Exit focus mode' : 'Focus window'}
        onClick={(e) => {
          e.stopPropagation()
          onFocus()
        }}
      />
    </div>
  )
}
