'use client'

import { ReactNode } from 'react'

interface StickyNoteProps {
  children: ReactNode
  color?: 'yellow' | 'pink' | 'blue' | 'green'
  rotation?: number
  className?: string
}

const colorClasses = {
  yellow: 'bg-[#FFF176]',
  pink: 'bg-[#F8BBD0]',
  blue: 'bg-[#BBDEFB]',
  green: 'bg-[#C8E6C9]',
}

export function StickyNote({ 
  children, 
  color = 'yellow', 
  rotation,
  className = '' 
}: StickyNoteProps) {
  const randomRotation = rotation ?? (Math.random() * 6 - 3) // -3deg to +3deg
  
  return (
    <div
      className={`${colorClasses[color]} rounded-lg shadow-lg p-6 ${className}`}
      style={{
        transform: `rotate(${randomRotation}deg)`,
        boxShadow: '0 4px 8px rgba(0,0,0,0.2), 0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      {children}
    </div>
  )
}

