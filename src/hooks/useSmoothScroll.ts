import { useEffect } from 'react'
import { startSmoothScroll } from '../lib/smooth-scroll'

export function useSmoothScroll() {
  useEffect(() => startSmoothScroll(), [])
}
