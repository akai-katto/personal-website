import { useCallback, useEffect, useRef, useState } from 'react'

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export function useTypewriter(lines: string[], speedMs = 28) {
  const fullText = lines.join('\n')
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const indexRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const start = useCallback(() => {
    if (isComplete || isTyping) return

    if (prefersReducedMotion()) {
      setDisplayedText(fullText)
      setIsComplete(true)
      return
    }

    clearTimer()
    indexRef.current = 0
    setDisplayedText('')
    setIsTyping(true)
    setIsComplete(false)

    const tick = () => {
      const next = indexRef.current + 1
      indexRef.current = next
      setDisplayedText(fullText.slice(0, next))

      if (next >= fullText.length) {
        setIsTyping(false)
        setIsComplete(true)
        timerRef.current = null
        return
      }

      timerRef.current = setTimeout(tick, speedMs)
    }

    timerRef.current = setTimeout(tick, speedMs)
  }, [clearTimer, fullText, isComplete, isTyping, speedMs])

  useEffect(() => () => clearTimer(), [clearTimer])

  return {
    displayedText,
    isTyping,
    isComplete,
    start,
    hasStarted: displayedText.length > 0 || isComplete,
  }
}
