'use client'

export function NotebookDecorations() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden w-full h-full">
      {/* Red Paperclip - Top Left (far left, avoiding red line at 90px) */}
      <svg
        className="absolute top-28 left-4 md:left-6 w-8 h-8 md:w-12 md:h-12 opacity-90 rotate-45"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 8 C8 8, 6 10, 6 14 C6 18, 8 20, 12 20 L18 20 C22 20, 24 22, 24 26 C24 30, 22 32, 18 32 L14 32 C10 32, 8 34, 8 38"
          stroke="#EF5350"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      {/* Doodle - Star - Top Right */}
      <svg
        className="absolute top-20 right-8 md:right-24 w-6 h-6 md:w-8 md:h-8 opacity-60 hidden sm:block"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2 L13.5 8.5 L20 10 L13.5 11.5 L12 18 L10.5 11.5 L4 10 L10.5 8.5 Z"
          stroke="#FFD700"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      {/* Sticky Note 1 - Mint - Upper Middle Right */}
      <div className="absolute top-48 right-8 md:right-32 w-16 h-16 md:w-24 md:h-24 opacity-90 rotate-3 shadow-lg hidden sm:block">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Note shadow */}
          <rect x="2" y="2" width="96" height="96" rx="2" fill="rgba(0,0,0,0.1)" />
          {/* Note body */}
          <rect x="0" y="0" width="96" height="96" rx="2" fill="#B2EBF2" />
          {/* Note lines */}
          <line x1="8" y1="18" x2="88" y2="18" stroke="#80DEEA" strokeWidth="1" />
          <line x1="8" y1="28" x2="88" y2="28" stroke="#80DEEA" strokeWidth="1" />
          {/* Thumbtack */}
          <circle cx="48" cy="8" r="4" fill="#EF5350" />
          <circle cx="48" cy="8" r="2" fill="#FFF" />
        </svg>
      </div>

      {/* Doodle - Arrow - Top Middle (centered, avoiding red line) */}
      <svg
        className="absolute top-32 left-1/2 w-6 h-6 md:w-8 md:h-8 opacity-40 -translate-x-1/2 rotate-45 hidden sm:block"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 12h14M12 5l7 7-7 7"
          stroke="#90CAF9"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Doodle - Heart - Middle Right */}
      <svg
        className="absolute top-[50%] right-8 md:right-16 w-5 h-5 md:w-6 md:h-6 opacity-50 hidden md:block"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          stroke="#F48FB1"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      {/* Index Card Corner - Lower Middle Left (far left, avoiding red line) */}
      <div className="absolute top-[60%] left-4 md:left-6 w-20 h-24 md:w-28 md:h-32 opacity-75 rotate-[-8deg] shadow-md hidden sm:block">
        <svg viewBox="0 0 100 120" className="w-full h-full">
          <rect x="0" y="0" width="100" height="120" rx="2" fill="#E8F5E9" />
          <rect x="0" y="0" width="100" height="12" rx="2" fill="#C8E6C9" />
          <line x1="8" y1="22" x2="92" y2="22" stroke="#A5D6A7" strokeWidth="0.5" />
          <line x1="8" y1="32" x2="92" y2="32" stroke="#A5D6A7" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Doodle - Checkmark - Bottom Middle (centered, avoiding red line) */}
      <svg
        className="absolute bottom-48 left-1/2 w-8 h-8 md:w-10 md:h-10 opacity-55 -translate-x-1/2 hidden sm:block"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 13l4 4L19 7"
          stroke="#66BB6A"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Yellow Pencil - Bottom Right */}
      <svg
        className="absolute bottom-24 right-4 md:right-10 w-12 h-12 md:w-16 md:h-16 opacity-80 rotate-12 hidden md:block"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Pencil body */}
        <rect x="20" y="30" width="60" height="12" rx="1" fill="#FFD700" />
        <rect x="20" y="30" width="40" height="12" rx="1" fill="#FFEB3B" />
        {/* Pencil tip */}
        <path d="M20 30 L30 36 L30 42 L20 36 Z" fill="#FFA726" />
        {/* Pencil eraser */}
        <rect x="80" y="30" width="8" height="12" rx="1" fill="#F48FB1" />
        {/* Pencil band */}
        <rect x="78" y="28" width="4" height="16" rx="1" fill="#FFD700" />
      </svg>
    </div>
  )
}

