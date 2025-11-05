'use client'

import Link from 'next/link'
import { useState } from 'react'

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-[#FAFAF5]/90 border-b border-[#2E2E2E]/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Figma style colorful abstract logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-8 h-8">
              {/* Stylized 's' logo with colorful shapes */}
              <div className="absolute top-0 left-0 w-3 h-3 bg-[#ff6392] rounded-full"></div>
              <div className="absolute top-0 right-0 w-3 h-3 bg-[#5aa9e6] rounded-full"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 bg-[#ffe45e] rounded-full"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#7fc8f8] rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#5aa9e6] rounded-full"></div>
            </div>
            <span className="text-xl font-bold text-[#2E2E2E]">StayDue</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/pricing" className="text-[#2E2E2E] hover:text-[#2E2E2E]/80 transition-colors text-sm font-medium">
              Pricing
            </Link>
            <Link href="/#support" className="text-[#2E2E2E] hover:text-[#2E2E2E]/80 transition-colors text-sm font-medium">
              Support
            </Link>
            <Link href="/#about" className="text-[#2E2E2E] hover:text-[#2E2E2E]/80 transition-colors text-sm font-medium">
              About
            </Link>
          </div>

          {/* Sign In Button */}
          <div className="hidden md:flex items-center">
            <Link
              href="/auth/signin"
              className="bg-[#2E2E2E] text-white hover:bg-[#2E2E2E]/90 transition-colors text-sm font-bold px-4 py-2 rounded-lg shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
            >
              Sign in
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-[#2E2E2E] hover:text-[#2E2E2E]/80"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-[#2E2E2E]/10">
            <Link
              href="/pricing"
              className="block text-[#2E2E2E] hover:text-[#2E2E2E]/80 transition-colors text-sm font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/#support"
              className="block text-[#2E2E2E] hover:text-[#2E2E2E]/80 transition-colors text-sm font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Support
            </Link>
            <Link
              href="/#about"
              className="block text-[#2E2E2E] hover:text-[#2E2E2E]/80 transition-colors text-sm font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <div className="pt-4 border-t border-[#2E2E2E]/10">
              <Link
                href="/auth/signin"
                className="block text-[#2E2E2E] hover:text-[#2E2E2E]/80 transition-colors text-sm font-bold text-center py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign in
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
