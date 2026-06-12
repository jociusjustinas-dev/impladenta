import { useCallback, useEffect, useRef, useState } from 'react'

export function useAnimatedDropdown(unmountMs = 400) {
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const unmountTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const open = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
    if (unmountTimerRef.current) {
      clearTimeout(unmountTimerRef.current)
      unmountTimerRef.current = null
    }

    setIsVisible(true)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsOpen(true))
    })
  }, [])

  const close = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
    if (unmountTimerRef.current) {
      clearTimeout(unmountTimerRef.current)
      unmountTimerRef.current = null
    }

    setIsOpen(false)
    unmountTimerRef.current = setTimeout(() => setIsVisible(false), unmountMs)
  }, [unmountMs])

  const scheduleClose = useCallback(
    (delay = 120) => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
      closeTimerRef.current = setTimeout(close, delay)
    },
    [close],
  )

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
      if (unmountTimerRef.current) clearTimeout(unmountTimerRef.current)
    }
  }, [])

  const panelClass = isOpen ? 'is-open' : isVisible ? 'is-closing' : ''

  return { isOpen, isVisible, open, close, scheduleClose, panelClass }
}
