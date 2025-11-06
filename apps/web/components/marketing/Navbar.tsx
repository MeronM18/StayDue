'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav 
      className="sticky top-0 z-[100] border-b border-[#E5E5E5] w-full nav-extended-bg" 
      style={{ 
        backgroundColor: '#F5F5F5', 
        position: 'sticky', 
        top: 0, 
        isolation: 'isolate',
        boxShadow: '0 1px 0 0 #E5E5E5',
        minHeight: '81px',
        overflow: 'visible',
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none'
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8" style={{ backgroundColor: '#F5F5F5', position: 'relative' }}>
        <div className="flex justify-between items-center" style={{ height: '81px' }}>
          {/* Logo Section - Left */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Image 
              src="/assets/stayduelogo.png" 
              alt="StayDue Logo" 
              width={54}
              height={48}
              className="h-12 w-auto"
              priority
            />
            <span className="text-lg font-bold text-[#000000]">StayDue</span>
          </Link>

          {/* Desktop Navigation - Center */}
          <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            <Link 
              href="/#features" 
              className="text-[#000000] hover:text-[#000000]/80 transition-colors text-[15px] font-medium flex items-center group"
            >
              Platform
              <svg 
                className="ml-1 w-3 h-3 text-[#666666] group-hover:text-[#000000]/60 transition-colors" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            <Link 
              href="/#solutions" 
              className="text-[#000000] hover:text-[#000000]/80 transition-colors text-[15px] font-medium flex items-center group"
            >
              Solutions
              <svg 
                className="ml-1 w-3 h-3 text-[#666666] group-hover:text-[#000000]/60 transition-colors" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            <Link 
              href="/#resources" 
              className="text-[#000000] hover:text-[#000000]/80 transition-colors text-[15px] font-medium flex items-center group"
            >
              Resources
              <svg 
                className="ml-1 w-3 h-3 text-[#666666] group-hover:text-[#000000]/60 transition-colors" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            <Link 
              href="/pricing" 
              className="text-[#000000] hover:text-[#000000]/80 transition-colors text-[15px] font-medium"
            >
              Pricing
            </Link>
          </div>

          {/* Authentication Section - Right */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/auth/signin"
              className="text-[#000000] hover:text-[#000000]/80 transition-colors text-[15px] font-medium cursor-pointer"
            >
              Log in
            </Link>
            <Link
              href="/auth/signup"
              className="bg-[#2D2D32] text-white hover:bg-[#000000] transition-colors text-[15px] font-medium px-6 py-3 rounded-lg cursor-pointer"
            >
              Sign up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-[#000000] hover:text-[#000000]/80"
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
          <div className="md:hidden py-4 space-y-4 border-t border-[#E5E5E5] bg-[#F5F5F5]" style={{ backgroundColor: '#F5F5F5' }}>
            <Link
              href="/#features"
              className="block text-[#000000] hover:text-[#000000]/80 transition-colors text-[15px] font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Platform
            </Link>
            <Link
              href="/#solutions"
              className="block text-[#000000] hover:text-[#000000]/80 transition-colors text-[15px] font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Solutions
            </Link>
            <Link
              href="/#resources"
              className="block text-[#000000] hover:text-[#000000]/80 transition-colors text-[15px] font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Resources
            </Link>
            <Link
              href="/pricing"
              className="block text-[#000000] hover:text-[#000000]/80 transition-colors text-[15px] font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <div className="pt-4 border-t border-[#E5E5E5] space-y-3">
              <Link
                href="/auth/signin"
                className="block text-[#000000] hover:text-[#000000]/80 transition-colors text-[15px] font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log in
              </Link>
              <Link
                href="/auth/signup"
                className="block bg-[#2D2D32] text-white hover:bg-[#000000] transition-colors text-[15px] font-medium px-6 py-3 rounded-lg text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign up
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
