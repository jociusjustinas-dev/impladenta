import Lenis from 'lenis'

let lenis: Lenis | null = null

export function getNavScrollOffset(extra = 24): number {
  const nav = document.querySelector('.bf-nav-fixed')
  if (!nav) return -extra
  return -(nav.getBoundingClientRect().height + extra)
}

export function startSmoothScroll(): () => void {
  if (typeof window === 'undefined') return () => {}
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}

  lenis = new Lenis({
    autoRaf: true,
    anchors: {
      offset: getNavScrollOffset(),
    },
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.1,
  })

  return () => {
    lenis?.destroy()
    lenis = null
  }
}

export function scrollToTarget(target: string | HTMLElement, offset = getNavScrollOffset()) {
  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.1 })
    return
  }

  const element = typeof target === 'string' ? document.querySelector(target) : target
  element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
