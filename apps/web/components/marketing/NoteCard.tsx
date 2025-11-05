'use client'

import { ReactNode } from 'react'

interface NoteCardProps {
  children: ReactNode
  rotation?: number
  className?: string
  hasPaperclip?: boolean
}

export function NoteCard({ 
  children, 
  rotation,
  className = '',
  hasPaperclip = false
}: NoteCardProps) {
  const randomRotation = rotation ?? (Math.random() * 4 - 2) // -2deg to +2deg
  
  return (
    <div className="relative">
      {hasPaperclip && (
        <div className="absolute -top-2 -right-2 z-10">
          <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" />
          </svg>
        </div>
      )}
      <div
        className={`bg-white border border-black/10 rounded-lg p-6 shadow-[0_4px_6px_rgba(0,0,0,0.08)] ${className}`}
        style={{
          transform: `rotate(${randomRotation}deg)`,
        }}
      >
        {children}
      </div>
    </div>
  )
}

