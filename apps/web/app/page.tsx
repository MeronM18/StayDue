'use client'

import Link from 'next/link'
import { Navbar } from '@/components/marketing/Navbar'
import { Footer } from '@/components/marketing/Footer'
import { CourseTag } from '@/components/marketing/CourseTag'
import { StickyNote } from '@/components/marketing/StickyNote'
import { PaperClip } from '@/components/marketing/PaperClip'
import { PushPin } from '@/components/marketing/PushPin'
import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)
  const supabase = createClient()

  const handleGetStarted = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          scopes: 'https://www.googleapis.com/auth/calendar',
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      })

      if (error) {
        console.error('Error signing in:', error)
        alert('Error signing in. Please try again.')
        setLoading(false)
      }
    } catch (error) {
      console.error('Unexpected error:', error)
      alert('An unexpected error occurred. Please try again.')
      setLoading(false)
    }
  }

  const faqs = [
    {
      question: "Is StayDue free to use?",
      answer: "Yes! StayDue offers a free forever plan with essential features. You can track unlimited courses and tasks, sync with Google Calendar, and never miss a deadline - all for free."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Absolutely. You can cancel your subscription at any time with no cancellation fees. Your account will remain active until the end of your billing period."
    },
    {
      question: "How does the Google Calendar sync work?",
      answer: "Once you connect your Google account, StayDue automatically syncs all your assignments and due dates to your Google Calendar. Changes made in StayDue are reflected in your calendar in real-time."
    },
    {
      question: "What happens if I miss a deadline?",
      answer: "StayDue sends you reminders before assignments are due. You can customize notification preferences to get alerts via email or push notifications, helping you stay on top of your work."
    },
    {
      question: "Can I use StayDue on mobile?",
      answer: "Yes! StayDue is fully responsive and works on all devices. Access your tasks, courses, and calendar from your phone, tablet, or desktop."
    },
    {
      question: "How secure is my data?",
      answer: "Your data is encrypted and stored securely. We use industry-standard security practices and never share your information with third parties. Your coursework stays private."
    }
  ]

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-20 pb-24 px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Large Hero Sticky Note */}
            <div className="relative">
              <div className="absolute -top-3 -left-3 z-10">
                <PushPin />
              </div>
              <StickyNote color="yellow" rotation={-1.5} className="relative">
                {/* Social Proof */}
                <div className="mb-4">
                  <span className="text-sm text-[#333] opacity-80">📌 Join 10,000+ students staying organized</span>
                </div>

                {/* Main Heading */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-[#333]">
                  Never miss a deadline again.
        </h1>
        
                {/* Sub-heading */}
                <p className="text-lg text-[#333] mb-8 leading-relaxed" style={{ lineHeight: '1.7' }}>
                  Turn your syllabi into a smart schedule in seconds. StayDue finds every deadline, adds them to your calendar, and reminds you before it's too late.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <button
                    onClick={handleGetStarted}
                    disabled={loading}
                    className="bg-[#5C6BC0] text-white hover:bg-[#4A5AAF] transition-all px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Signing in...' : 'Pin Your Semester →'}
                  </button>
                  <button className="bg-white text-[#333] border-2 border-[#5C6BC0] hover:bg-[#5C6BC0] hover:text-white transition-all px-8 py-4 rounded-xl font-bold text-lg">
                    Try It Free
                  </button>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-[#333]">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">✓</span>
                    <span>Free Forever</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">✓</span>
                    <span>No Credit Card</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">✓</span>
                    <span>Setup in 2 Minutes</span>
                  </div>
                </div>
              </StickyNote>
            </div>

            {/* Right Side - Product Preview */}
            <div className="relative">
              <div className="bg-white border-2 border-gray-200 rounded-2xl shadow-2xl overflow-hidden">
                <div className="bg-gray-50 border-b border-gray-200 px-6 py-3 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="text-sm text-gray-500">StayDue Dashboard</div>
                </div>
                <div className="p-6 bg-gradient-to-br from-[#f9f9f9] to-white">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="bg-[#5aa9e6]/10 rounded-lg p-4">
                      <div className="text-2xl font-bold text-[#5aa9e6] mb-1">12</div>
                      <div className="text-xs text-gray-600">Active Tasks</div>
                    </div>
                    <div className="bg-[#7fc8f8]/10 rounded-lg p-4">
                      <div className="text-2xl font-bold text-[#7fc8f8] mb-1">5</div>
                      <div className="text-xs text-gray-600">Courses</div>
                    </div>
                    <div className="bg-[#ffe45e]/10 rounded-lg p-4">
                      <div className="text-2xl font-bold text-[#ffe45e] mb-1">3</div>
                      <div className="text-xs text-gray-600">Due This Week</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">CS 101 Assignment</span>
                        <span className="text-xs text-[#ff6392] font-medium">Due Tomorrow</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CourseTag course="Computer Science" />
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">Math 240 Project</span>
                        <span className="text-xs text-[#ffe45e] font-medium">Due Friday</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CourseTag course="Mathematics" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust by Association */}
      <section className="py-12 px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-sm text-[#333] opacity-70 mb-6">Trusted by students at</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-60">
            <div className="text-xl font-bold text-[#333]">Stanford</div>
            <div className="text-xl font-bold text-[#333]">MIT</div>
            <div className="text-xl font-bold text-[#333]">Harvard</div>
            <div className="text-xl font-bold text-[#333]">Berkeley</div>
            <div className="text-xl font-bold text-[#333]">UCLA</div>
          </div>
        </div>
      </section>

      {/* Benefits/Features Section - Sticky Notes */}
      <section className="py-20 px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 relative">
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-10">
              <PushPin />
            </div>
            <StickyNote color="pink" rotation={1} className="inline-block">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#333] mb-2">
                Everything you need to succeed
              </h2>
              <p className="text-lg text-[#333] opacity-80">
                Focus on learning, not organizing
              </p>
            </StickyNote>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <div className="relative">
              <div className="absolute -top-2 -right-2 z-10">
                <PaperClip />
              </div>
              <StickyNote color="yellow" rotation={-2}>
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="text-xl font-bold text-[#333] mb-2">Never Miss Deadlines</h3>
                <p className="text-[#333] opacity-80" style={{ lineHeight: '1.6' }}>
                  Get automatic reminders before assignments are due. Never lose track of important dates again.
                </p>
              </StickyNote>
            </div>

            {/* Benefit 2 */}
            <div className="relative">
              <div className="absolute -top-2 -right-2 z-10">
                <PaperClip />
              </div>
              <StickyNote color="blue" rotation={1.5}>
                <div className="text-3xl mb-3">📅</div>
                <h3 className="text-xl font-bold text-[#333] mb-2">Sync with Google Calendar</h3>
                <p className="text-[#333] opacity-80" style={{ lineHeight: '1.6' }}>
                  All your assignments automatically appear in your Google Calendar. One less thing to manage.
                </p>
              </StickyNote>
            </div>

            {/* Benefit 3 */}
            <div className="relative">
              <div className="absolute -top-2 -right-2 z-10">
                <PaperClip />
              </div>
              <StickyNote color="green" rotation={-1}>
                <div className="text-3xl mb-3">📤</div>
                <h3 className="text-xl font-bold text-[#333] mb-2">Upload Syllabi</h3>
                <p className="text-[#333] opacity-80" style={{ lineHeight: '1.6' }}>
                  Upload your course syllabi and we'll automatically extract all assignments and due dates for you.
                </p>
              </StickyNote>
            </div>

            {/* Benefit 4 */}
            <div className="relative">
              <div className="absolute -top-2 -right-2 z-10">
                <PaperClip />
              </div>
              <StickyNote color="pink" rotation={2}>
                <div className="text-3xl mb-3">📊</div>
                <h3 className="text-xl font-bold text-[#333] mb-2">Track Your Progress</h3>
                <p className="text-[#333] opacity-80" style={{ lineHeight: '1.6' }}>
                  See how you're doing across all your courses with visual progress tracking and analytics.
                </p>
              </StickyNote>
            </div>

            {/* Benefit 5 */}
            <div className="relative">
              <div className="absolute -top-2 -right-2 z-10">
                <PaperClip />
              </div>
              <StickyNote color="yellow" rotation={-1.5}>
                <div className="text-3xl mb-3">📚</div>
                <h3 className="text-xl font-bold text-[#333] mb-2">Organize by Course</h3>
                <p className="text-[#333] opacity-80" style={{ lineHeight: '1.6' }}>
                  Keep all your courses organized in one place. Add course codes, instructors, and semester info.
                </p>
              </StickyNote>
            </div>

            {/* Benefit 6 */}
            <div className="relative">
              <div className="absolute -top-2 -right-2 z-10">
                <PaperClip />
              </div>
              <StickyNote color="blue" rotation={1}>
                <div className="text-3xl mb-3">⏰</div>
                <h3 className="text-xl font-bold text-[#333] mb-2">Save Time Daily</h3>
                <p className="text-[#333] opacity-80" style={{ lineHeight: '1.6' }}>
                  Stop spending hours organizing. StayDue does the heavy lifting so you can focus on what matters.
                </p>
              </StickyNote>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics/Data Section - Sticky Notes */}
      <section className="py-20 px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="relative">
              <StickyNote color="blue" rotation={-1.5}>
                <div className="text-4xl font-bold text-[#333] mb-2">85%</div>
                <div className="text-[#333] opacity-80 text-sm">Less Time Organizing</div>
              </StickyNote>
            </div>
            <div className="relative">
              <StickyNote color="green" rotation={1}>
                <div className="text-4xl font-bold text-[#333] mb-2">10K+</div>
                <div className="text-[#333] opacity-80 text-sm">Active Students</div>
              </StickyNote>
            </div>
            <div className="relative">
              <StickyNote color="yellow" rotation={-2}>
                <div className="text-4xl font-bold text-[#333] mb-2">50K+</div>
                <div className="text-[#333] opacity-80 text-sm">Tasks Tracked</div>
              </StickyNote>
            </div>
            <div className="relative">
              <StickyNote color="pink" rotation={1.5}>
                <div className="text-4xl font-bold text-[#333] mb-2">99%</div>
                <div className="text-[#333] opacity-80 text-sm">Never Miss Deadlines</div>
              </StickyNote>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section - Sticky Notes */}
      <section className="py-20 px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 relative">
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-10">
              <PushPin />
            </div>
            <StickyNote color="yellow" rotation={-1} className="inline-block">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#333] mb-2">
                How It Works
              </h2>
              <p className="text-lg text-[#333] opacity-80">
                Get started in minutes. Simple steps to stay organized.
              </p>
            </StickyNote>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative text-center">
              <div className="absolute -top-2 -right-2 z-10">
                <PaperClip />
              </div>
              <StickyNote color="blue" rotation={1.5}>
                <div className="text-4xl font-bold text-[#333] mb-4">1</div>
                <h3 className="text-xl font-bold text-[#333] mb-3">Sign Up with Google</h3>
                <p className="text-[#333] opacity-80" style={{ lineHeight: '1.6' }}>
                  Create your account in seconds with one-click Google sign-in. No passwords to remember.
                </p>
              </StickyNote>
            </div>

            {/* Step 2 */}
            <div className="relative text-center">
              <div className="absolute -top-2 -right-2 z-10">
                <PaperClip />
              </div>
              <StickyNote color="green" rotation={-1}>
                <div className="text-4xl font-bold text-[#333] mb-4">2</div>
                <h3 className="text-xl font-bold text-[#333] mb-3">Add Your Courses</h3>
                <p className="text-[#333] opacity-80" style={{ lineHeight: '1.6' }}>
                  Add your courses and upload syllabi. We'll automatically extract assignments and due dates.
                </p>
              </StickyNote>
            </div>

            {/* Step 3 */}
            <div className="relative text-center">
              <div className="absolute -top-2 -right-2 z-10">
                <PaperClip />
              </div>
              <StickyNote color="pink" rotation={2}>
                <div className="text-4xl font-bold text-[#333] mb-4">3</div>
                <h3 className="text-xl font-bold text-[#333] mb-3">Stay Organized</h3>
                <p className="text-[#333] opacity-80" style={{ lineHeight: '1.6' }}>
                  Sync with Google Calendar and get reminders. Never miss a deadline again.
                </p>
              </StickyNote>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6 lg:px-8 bg-[#f9f9f9]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the plan that works for you. All plans include our core features.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">Free</span>
                <span className="text-gray-600"> Forever</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Up to 5 courses</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Unlimited tasks</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Google Calendar sync</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Basic reminders</span>
                </li>
              </ul>
              <button className="w-full bg-gray-100 text-gray-900 hover:bg-gray-200 transition-colors py-3 rounded-lg font-semibold">
                Get Started
              </button>
            </div>

            {/* Pro Plan - Highlighted */}
            <div className="bg-white rounded-2xl border-2 border-[#5aa9e6] p-8 relative shadow-xl">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <span className="bg-[#5aa9e6] text-white px-4 py-1 rounded-full text-sm font-semibold">Most Popular</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">$9</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Unlimited courses</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Advanced analytics</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Priority support</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Custom reminders</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Syllabus AI extraction</span>
                </li>
              </ul>
              <button onClick={handleGetStarted} className="w-full bg-[#5aa9e6] text-white hover:bg-[#4a99d6] transition-colors py-3 rounded-lg font-semibold">
                Get Started
              </button>
            </div>

            {/* Pro+ Plan */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro+</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">$19</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Everything in Pro</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Team collaboration</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Advanced reporting</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Dedicated support</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">API access</span>
                </li>
              </ul>
              <button className="w-full bg-gray-100 text-gray-900 hover:bg-gray-200 transition-colors py-3 rounded-lg font-semibold">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Loved by Students Worldwide
            </h2>
            <p className="text-xl text-gray-600">
              See what students are saying about StayDue
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                "StayDue has completely changed how I manage my assignments. I never miss deadlines anymore and my grades have improved significantly!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#5aa9e6] rounded-full flex items-center justify-center text-white font-semibold">
                  SM
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Sarah Martinez</div>
                  <div className="text-sm text-gray-500">Computer Science Student</div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                "The Google Calendar sync is a game-changer. Everything is in one place now and I can see my assignments on my phone calendar. So convenient!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#7fc8f8] rounded-full flex items-center justify-center text-white font-semibold">
                  JK
                </div>
                <div>
                  <div className="font-semibold text-gray-900">James Kim</div>
                  <div className="text-sm text-gray-500">Engineering Student</div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                "Uploading my syllabi and having assignments automatically extracted saved me hours at the start of each semester. This is a must-have tool!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#ffe45e] rounded-full flex items-center justify-center text-white font-semibold">
                  ML
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Maria Lopez</div>
                  <div className="text-sm text-gray-500">Business Student</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 lg:px-8 bg-[#f9f9f9]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about StayDue
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform ${expandedFAQ === index ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedFAQ === index && (
                  <div className="px-6 pb-4 text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-br from-[#5aa9e6] to-[#7fc8f8]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to stay organized?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of students who never miss a deadline. Get started for free today.
          </p>
          <button
            onClick={handleGetStarted}
            disabled={loading}
            className="bg-white text-[#5aa9e6] hover:bg-gray-50 transition-colors px-8 py-4 rounded-lg font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Get Started Free'}
          </button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
