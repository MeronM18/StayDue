'use client'

import Link from 'next/link'
import { useState } from 'react'

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [featuresOpen, setFeaturesOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)

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
            <span className="text-xl font-semibold text-gray-900">StayDue</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Features with dropdown */}
            <div className="relative">
              <button
                onClick={() => setFeaturesOpen(!featuresOpen)}
                className="text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium flex items-center space-x-1"
              >
                <span>Features</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {featuresOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                  <Link href="/#course-management" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Course Management
                  </Link>
                  <Link href="/#task-tracking" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Task Tracking
                  </Link>
                  <Link href="/#calendar-sync" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Calendar Sync
                  </Link>
                  <Link href="/#syllabus-upload" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Syllabus Upload
                  </Link>
                </div>
              )}
            </div>

            <Link href="/#enterprise" className="text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium">
              Enterprise
            </Link>

            <Link href="/pricing" className="text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium">
              Pricing
            </Link>

            <Link href="/#customers" className="text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium">
              Customers
            </Link>

            {/* Resources with dropdown */}
            <div className="relative">
              <button
                onClick={() => setResourcesOpen(!resourcesOpen)}
                className="text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium flex items-center space-x-1"
              >
                <span>Resources</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {resourcesOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                  <Link href="/#blog" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Blog
                  </Link>
                  <Link href="/#help-center" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Help Center
                  </Link>
                  <Link href="/#documentation" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Documentation
                  </Link>
                  <Link href="/#changelog" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Changelog
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Sign In Button */}
          <div className="hidden md:flex items-center">
            <Link
              href="/auth/signin"
              className="bg-gray-900 text-white hover:bg-gray-800 transition-colors text-sm font-medium px-4 py-2 rounded-lg"
            >
              Sign in
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-gray-900"
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
          <div className="md:hidden py-4 space-y-4 border-t border-gray-200">
            <div>
              <button
                onClick={() => setFeaturesOpen(!featuresOpen)}
                className="w-full flex items-center justify-between text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium"
              >
                <span>Features</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {featuresOpen && (
                <div className="pl-4 mt-2 space-y-2">
                  <Link href="/#course-management" className="block text-sm text-gray-600">
                    Course Management
                  </Link>
                  <Link href="/#task-tracking" className="block text-sm text-gray-600">
                    Task Tracking
                  </Link>
                  <Link href="/#calendar-sync" className="block text-sm text-gray-600">
                    Calendar Sync
                  </Link>
                  <Link href="/#syllabus-upload" className="block text-sm text-gray-600">
                    Syllabus Upload
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/#enterprise"
              className="block text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Enterprise
            </Link>

            <Link
              href="/pricing"
              className="block text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>

            <Link
              href="/#customers"
              className="block text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Customers
            </Link>

            <div>
              <button
                onClick={() => setResourcesOpen(!resourcesOpen)}
                className="w-full flex items-center justify-between text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium"
              >
                <span>Resources</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {resourcesOpen && (
                <div className="pl-4 mt-2 space-y-2">
                  <Link href="/#blog" className="block text-sm text-gray-600">
                    Blog
                  </Link>
                  <Link href="/#help-center" className="block text-sm text-gray-600">
                    Help Center
                  </Link>
                  <Link href="/#documentation" className="block text-sm text-gray-600">
                    Documentation
                  </Link>
                  <Link href="/#changelog" className="block text-sm text-gray-600">
                    Changelog
                  </Link>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-gray-200">
              <Link
                href="/auth/signin"
                className="block text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium text-center py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign in
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Close dropdowns when clicking outside */}
      {(featuresOpen || resourcesOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setFeaturesOpen(false)
            setResourcesOpen(false)
          }}
        />
      )}
    </nav>
  )
}
