'use client'

interface CourseTagProps {
  course: string
  className?: string
}

const courseColors: Record<string, { bg: string; text: string }> = {
  math: { bg: '#A5B4FC', text: '#4338CA' },
  mathematics: { bg: '#A5B4FC', text: '#4338CA' },
  english: { bg: '#FBCFE8', text: '#BE185D' },
  science: { bg: '#BBF7D0', text: '#065F46' },
  history: { bg: '#FDE68A', text: '#92400E' },
  computer: { bg: '#C7D2FE', text: '#4F46E5' },
  'computer science': { bg: '#C7D2FE', text: '#4F46E5' },
  art: { bg: '#F9A8D4', text: '#9F1239' },
  business: { bg: '#A7F3D0', text: '#047857' },
  engineering: { bg: '#BFDBFE', text: '#1E40AF' },
  physics: { bg: '#D1FAE5', text: '#064E3B' },
  chemistry: { bg: '#DBEAFE', text: '#1E3A8A' },
  biology: { bg: '#F0FDF4', text: '#166534' },
}

export function CourseTag({ course, className = '' }: CourseTagProps) {
  const normalizedCourse = course.toLowerCase().trim()
  const colors = courseColors[normalizedCourse] || { bg: '#E5E7EB', text: '#374151' }

  return (
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-medium ${className}`}
      style={{
        backgroundColor: colors.bg,
        color: colors.text,
      }}
    >
      {course}
    </span>
  )
}

