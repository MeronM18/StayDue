'use client'

interface PushPinProps {
  className?: string
}

export function PushPin({ className = '' }: PushPinProps) {
  return (
    <svg
      className={`w-5 h-5 text-[#EF5350] ${className}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M10 2a6 6 0 00-6 6c0 4.314 6 10 6 10s6-5.686 6-10a6 6 0 00-6-6zm0 8a2 2 0 110-4 2 2 0 010 4z" />
    </svg>
  )
}

