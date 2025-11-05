'use client'

import { ReactNode } from 'react'

interface HighlightProps {
  children: ReactNode
  color?: 'yellow' | 'mint' | 'pink'
  className?: string
}

const highlightColors = {
  yellow: 'bg-[#FFF176]/40',
  mint: 'bg-[#B2EBF2]/40',
  pink: 'bg-[#F8BBD0]/40',
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

