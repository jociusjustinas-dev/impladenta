import { useEffect, type RefObject } from 'react'

const NAV_SHRINK_RANGE = 180

function easeOutCubic(value: number) {
  return 1 - (1 - value) ** 3
}

export function useNavShrinkProgress(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    let frame = 0

    const update = () => {
      const node = ref.current
      if (!node) return

      const raw = Math.min(1, Math.max(0, window.scrollY / NAV_SHRINK_RANGE))
      const progress = easeOutCubic(raw)
      node.style.setProperty('--bf-nav-shrink-progress', progress.toFixed(4))
    }

    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ref])
}
