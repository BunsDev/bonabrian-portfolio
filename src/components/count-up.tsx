'use client'

import { animate } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface CountUpProps {
  from?: number
  to: number
  duration?: number
}

const CountUp = ({ from = 0, to, duration = 1.5 }: CountUpProps) => {
  const nodeRef = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    const node = nodeRef.current
    if (!node) return

    const controls = animate(from, to, {
      duration,
      ease: 'easeOut',
      onUpdate(value) {
        node.textContent = value.toFixed(0)
      },
    })

    return () => controls.stop()
  }, [duration, from, to])

  return <span ref={nodeRef}>{to}</span>
}

export default CountUp
