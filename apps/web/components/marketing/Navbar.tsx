'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav 
      className="fixed top-0 z-[100] border-b border-[#E5E5E5] w-full nav-extended-bg" 
      style={{ 
        backgroundColor: '#F5F5F5', 
        position: 'fixed', 
        top: 0, 
        isolation: 'isolate',
        boxShadow: '0 1px 0 0 #E5E5E5',
        minHeight: '83px',
        overflow: 'visible',
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none'
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8" style={{ backgroundColor: '#F5F5F5', position: 'relative' }}>
        <div className="flex justify-between items-center" style={{ height: '83px' }}>
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
            <span className="text-2xl font-bold text-[#000000]">StayDue</span>
          </Link>

          {/* Desktop Navigation - Center */}
          <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            <Link 
              href="/pricing" 
              className="text-[#000000] hover:text-[#000000]/80 transition-colors text-[15px] font-medium"
            >
              How it Works
            </Link>
            <Link 
              href="/#how-it-works" 
              className="text-[#000000] hover:text-[#000000]/80 transition-colors text-[15px] font-medium"
            >
              Pricing
            </Link>
            <Link 
              href="/#contact" 
              className="text-[#000000] hover:text-[#000000]/80 transition-colors text-[15px] font-medium"
            >
              Contact
            </Link>
          </div>

          {/* Authentication Section - Right */}
          <div className="hidden md:flex items-center">
            <Link
              href="/auth/signin"
              className="bg-[#2D2D32] text-white hover:bg-[#000000] hover:border-2 hover:border-white transition-all text-[15px] font-bold px-6 py-3 rounded-lg cursor-pointer border-2 border-transparent"
            >
              Log in
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
              href="/pricing"
              className="block text-[#000000] hover:text-[#000000]/80 transition-colors text-[15px] font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/#how-it-works"
              className="block text-[#000000] hover:text-[#000000]/80 transition-colors text-[15px] font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              How it works
            </Link>
            <Link
              href="/#contact"
              className="block text-[#000000] hover:text-[#000000]/80 transition-colors text-[15px] font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-4 border-t border-[#E5E5E5]">
              <Link
                href="/auth/signin"
                className="block bg-[#2D2D32] text-white hover:bg-[#000000] hover:border-2 hover:border-white transition-all text-[15px] font-bold px-6 py-3 rounded-lg text-center border-2 border-transparent"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log in
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
