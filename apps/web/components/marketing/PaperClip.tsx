'use client'

interface PaperClipProps {
  className?: string
}

export function PaperClip({ className = '' }: PaperClipProps) {
  return (
    <svg
      className={`w-6 h-6 text-gray-400 ${className}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" />
    </svg>
  )
}

