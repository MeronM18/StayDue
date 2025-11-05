'use client'

import { ReactNode } from 'react'

interface HighlightProps {
  children: ReactNode
  color?: 'yellow' | 'mint' | 'pink'
  className?: string
}

const highlightColors = {
  yellow: 'bg-[#FFF176]/70',
  mint: 'bg-[#B2EBF2]/70',
  pink: 'bg-[#F8BBD0]/70',
}

export function Highlight({ 
  children, 
  color = 'yellow',
  className = '' 
}: HighlightProps) {
  return (
    <span className={`${highlightColors[color]} px-1 py-0.5 rounded ${className}`}>
      {children}
    </span>
  )
}

