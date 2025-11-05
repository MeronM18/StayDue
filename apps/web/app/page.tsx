'use client'

import Link from 'next/link'
import { Navbar } from '@/components/marketing/Navbar'
import { Footer } from '@/components/marketing/Footer'
import { CourseTag } from '@/components/marketing/CourseTag'
import { NoteCard } from '@/components/marketing/NoteCard'
import { Highlight } from '@/components/marketing/Highlight'
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

      {/* Hero Section - Notebook Style */}
      <section className="pt-20 pb-24 px-6 lg:px-8 relative">
        <div className="max-w-5xl mx-auto">
          {/* Main Heading with Highlight */}
          <div className="mb-8">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 leading-tight text-[#2E2E2E]">
              <Highlight color="yellow">Stay organized.</Highlight>
              <br />
              Never miss a deadline again.
        </h1>
            <div className="mt-4 relative">
              <p className="text-xl text-[#2E2E2E] opacity-90" style={{ lineHeight: '1.8' }}>
                <Highlight color="mint">Turn your syllabus into a smart schedule in seconds. StayDue finds every deadline, adds them to your calendar, and reminds you before it's too late.</Highlight>
              </p>
              <div className="absolute -left-8 top-0 text-2xl opacity-60">✏️</div>
            </div>
          </div>

          {/* CTAs - Sticky Label Style */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button
              onClick={handleGetStarted}
              disabled={loading}
              className="bg-[#FFF176] text-[#2E2E2E] hover:bg-[#FFEB3B] transition-all px-8 py-4 rounded-lg font-bold text-lg shadow-[0_4px_6px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_8px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 border-2 border-[#2E2E2E]/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Get Started →'}
            </button>
            <button className="bg-[#B2EBF2] text-[#2E2E2E] border-2 border-[#2E2E2E]/10 hover:bg-[#80DEEA] transition-all px-8 py-4 rounded-lg font-bold text-lg shadow-[0_4px_6px_rgba(0,0,0,0.1)]">
              Try It Free
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-[#2E2E2E] opacity-80">
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

          {/* Product Preview - Notebook Style */}
          <div className="mt-12 relative">
            <NoteCard rotation={1} hasPaperclip className="max-w-2xl mx-auto">
              <div className="text-center mb-4">
                <div className="text-2xl mb-2">📓</div>
                <h3 className="text-xl font-bold text-[#2E2E2E]">Your Digital Notebook</h3>
              </div>
              <div className="space-y-3">
                <div className="bg-[#FAFAF5] border border-[#2E2E2E]/10 rounded p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[#2E2E2E]">CS 101 Assignment</span>
                    <span className="text-xs text-[#2E2E2E] opacity-70 bg-[#FFF176]/30 px-2 py-1 rounded">Due Tomorrow</span>
                  </div>
                  <CourseTag course="Computer Science" />
                </div>
                <div className="bg-[#FAFAF5] border border-[#2E2E2E]/10 rounded p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[#2E2E2E]">Math 240 Project</span>
                    <span className="text-xs text-[#2E2E2E] opacity-70 bg-[#B2EBF2]/30 px-2 py-1 rounded">Due Friday</span>
                  </div>
                  <CourseTag course="Mathematics" />
                </div>
                <div className="bg-[#FAFAF5] border border-[#2E2E2E]/10 rounded p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[#2E2E2E]">English 201 Essay</span>
                    <span className="text-xs text-[#2E2E2E] opacity-70 bg-[#F8BBD0]/30 px-2 py-1 rounded">Due Monday</span>
                  </div>
                  <CourseTag course="English" />
                </div>
                <div className="bg-[#FAFAF5] border border-[#2E2E2E]/10 rounded p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[#2E2E2E]">Biology 150 Lab Report</span>
                    <span className="text-xs text-[#2E2E2E] opacity-70 bg-[#C8E6C9]/30 px-2 py-1 rounded">Due Next Week</span>
                  </div>
                  <CourseTag course="Science" />
                </div>
              </div>
            </NoteCard>
          </div>
        </div>
      </section>

      {/* Trust by Association */}
      <section className="w-full py-12 px-6 lg:px-8 bg-[#E8F4F8] border-y border-[#2E2E2E]/10">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-sm text-[#2E2E2E] opacity-70 mb-6 font-medium">Trusted by students at</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            <div className="text-xl font-bold text-[#2E2E2E] opacity-80">Stanford</div>
            <div className="text-xl font-bold text-[#2E2E2E] opacity-80">MIT</div>
            <div className="text-xl font-bold text-[#2E2E2E] opacity-80">Harvard</div>
            <div className="text-xl font-bold text-[#2E2E2E] opacity-80">Berkeley</div>
            <div className="text-xl font-bold text-[#2E2E2E] opacity-80">UCLA</div>
          </div>
        </div>
      </section>

      {/* Benefits/Features Section - Notebook Cards */}
      <section className="py-20 px-6 lg:px-8 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <NoteCard rotation={-1} className="inline-block max-w-md">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#2E2E2E] mb-2">
                Everything you need to succeed
              </h2>
              <p className="text-lg text-[#2E2E2E] opacity-80">
                <Highlight color="pink">Focus on learning, not organizing</Highlight>
              </p>
            </NoteCard>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Benefit 1 */}
            <NoteCard rotation={-1.5} hasPaperclip>
              <div className="text-2xl mb-3">🎯</div>
              <h3 className="text-xl font-bold text-[#2E2E2E] mb-2">Never Miss Deadlines</h3>
              <p className="text-[#2E2E2E] opacity-80 text-sm" style={{ lineHeight: '1.6' }}>
                Get automatic reminders before assignments are due. Never lose track of important dates again.
              </p>
            </NoteCard>

            {/* Benefit 2 */}
            <NoteCard rotation={1}>
              <div className="text-2xl mb-3">📅</div>
              <h3 className="text-xl font-bold text-[#2E2E2E] mb-2">Sync with Google Calendar</h3>
              <p className="text-[#2E2E2E] opacity-80 text-sm" style={{ lineHeight: '1.6' }}>
                All your assignments automatically appear in your Google Calendar. One less thing to manage.
              </p>
            </NoteCard>

            {/* Benefit 3 */}
            <NoteCard rotation={-1} hasPaperclip>
              <div className="text-2xl mb-3">📤</div>
              <h3 className="text-xl font-bold text-[#2E2E2E] mb-2">Upload Syllabi</h3>
              <p className="text-[#2E2E2E] opacity-80 text-sm" style={{ lineHeight: '1.6' }}>
                Upload your course syllabi and we'll automatically extract all assignments and due dates for you.
              </p>
            </NoteCard>

            {/* Benefit 4 */}
            <NoteCard rotation={1.5}>
              <div className="text-2xl mb-3">📊</div>
              <h3 className="text-xl font-bold text-[#2E2E2E] mb-2">Track Your Progress</h3>
              <p className="text-[#2E2E2E] opacity-80 text-sm" style={{ lineHeight: '1.6' }}>
                See how you're doing across all your courses with visual progress tracking and analytics.
              </p>
            </NoteCard>

            {/* Benefit 5 */}
            <NoteCard rotation={-1}>
              <div className="text-2xl mb-3">📚</div>
              <h3 className="text-xl font-bold text-[#2E2E2E] mb-2">Organize by Course</h3>
              <p className="text-[#2E2E2E] opacity-80 text-sm" style={{ lineHeight: '1.6' }}>
                Keep all your courses organized in one place. Add course codes, instructors, and semester info.
              </p>
            </NoteCard>

            {/* Benefit 6 */}
            <NoteCard rotation={1} hasPaperclip>
              <div className="text-2xl mb-3">⏰</div>
              <h3 className="text-xl font-bold text-[#2E2E2E] mb-2">Save Time Daily</h3>
              <p className="text-[#2E2E2E] opacity-80 text-sm" style={{ lineHeight: '1.6' }}>
                Stop spending hours organizing. StayDue does the heavy lifting so you can focus on what matters.
              </p>
            </NoteCard>
          </div>
        </div>
      </section>

      {/* Metrics/Data Section - Notebook Cards */}
      <section className="py-20 px-6 lg:px-8 relative">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <NoteCard rotation={-1}>
              <div className="text-3xl font-bold text-[#2E2E2E] mb-2">85%</div>
              <div className="text-[#2E2E2E] opacity-80 text-xs">Less Time Organizing</div>
            </NoteCard>
            <NoteCard rotation={1}>
              <div className="text-3xl font-bold text-[#2E2E2E] mb-2">10K+</div>
              <div className="text-[#2E2E2E] opacity-80 text-xs">Active Students</div>
            </NoteCard>
            <NoteCard rotation={-1.5}>
              <div className="text-3xl font-bold text-[#2E2E2E] mb-2">50K+</div>
              <div className="text-[#2E2E2E] opacity-80 text-xs">Tasks Tracked</div>
            </NoteCard>
            <NoteCard rotation={1}>
              <div className="text-3xl font-bold text-[#2E2E2E] mb-2">99%</div>
              <div className="text-[#2E2E2E] opacity-80 text-xs">Never Miss Deadlines</div>
            </NoteCard>
          </div>
        </div>
      </section>

      {/* How It Works Section - Notebook Cards */}
      <section className="py-20 px-6 lg:px-8 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <NoteCard rotation={-1} className="inline-block max-w-md">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#2E2E2E] mb-2">
                How It Works
              </h2>
              <p className="text-lg text-[#2E2E2E] opacity-80">
                Get started in minutes. <Highlight color="yellow">Simple steps</Highlight> to stay organized.
              </p>
            </NoteCard>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <NoteCard rotation={1} hasPaperclip className="text-center">
              <div className="text-4xl font-bold text-[#2E2E2E] mb-4">1</div>
              <h3 className="text-xl font-bold text-[#2E2E2E] mb-3">Sign Up with Google</h3>
              <p className="text-[#2E2E2E] opacity-80 text-sm" style={{ lineHeight: '1.6' }}>
                Create your account in seconds with one-click Google sign-in. No passwords to remember.
              </p>
            </NoteCard>

            {/* Step 2 */}
            <NoteCard rotation={-1} className="text-center">
              <div className="text-4xl font-bold text-[#2E2E2E] mb-4">2</div>
              <h3 className="text-xl font-bold text-[#2E2E2E] mb-3">Add Your Courses</h3>
              <p className="text-[#2E2E2E] opacity-80 text-sm" style={{ lineHeight: '1.6' }}>
                Add your courses and upload syllabi. We'll automatically extract assignments and due dates.
              </p>
            </NoteCard>

            {/* Step 3 */}
            <NoteCard rotation={1.5} hasPaperclip className="text-center">
              <div className="text-4xl font-bold text-[#2E2E2E] mb-4">3</div>
              <h3 className="text-xl font-bold text-[#2E2E2E] mb-3">Stay Organized</h3>
              <p className="text-[#2E2E2E] opacity-80 text-sm" style={{ lineHeight: '1.6' }}>
                Sync with Google Calendar and get reminders. Never miss a deadline again.
              </p>
            </NoteCard>
          </div>
        </div>
      </section>

      {/* Pricing Section - Notebook Style */}
      <section className="py-20 px-6 lg:px-8 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <NoteCard rotation={-1} className="inline-block max-w-md">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#2E2E2E] mb-2">
                Simple, Transparent Pricing
              </h2>
              <p className="text-lg text-[#2E2E2E] opacity-80">
                Choose the plan that works for you. <Highlight color="yellow">All plans include core features.</Highlight>
              </p>
            </NoteCard>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Starter Plan */}
            <NoteCard rotation={-1} hasPaperclip>
              <h3 className="text-2xl font-bold text-[#2E2E2E] mb-2">Starter</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-[#2E2E2E]">Free</span>
                <span className="text-[#2E2E2E] opacity-70"> Forever</span>
              </div>
              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-[#2E2E2E]">✓</span>
                  <span className="text-[#2E2E2E] opacity-80">Up to 5 courses</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#2E2E2E]">✓</span>
                  <span className="text-[#2E2E2E] opacity-80">Unlimited tasks</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#2E2E2E]">✓</span>
                  <span className="text-[#2E2E2E] opacity-80">Google Calendar sync</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#2E2E2E]">✓</span>
                  <span className="text-[#2E2E2E] opacity-80">Basic reminders</span>
                </li>
              </ul>
              <button className="w-full bg-[#FFF176] text-[#2E2E2E] hover:bg-[#FFEB3B] transition-colors py-3 rounded-lg font-bold border-2 border-[#2E2E2E]/10">
                Get Started
              </button>
            </NoteCard>

            {/* Pro Plan - Highlighted */}
            <NoteCard rotation={1} className="relative border-2 border-[#B2EBF2]">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <span className="bg-[#B2EBF2] text-[#2E2E2E] px-3 py-1 rounded-full text-xs font-bold border border-[#2E2E2E]/20">Most Popular</span>
              </div>
              <h3 className="text-2xl font-bold text-[#2E2E2E] mb-2">Pro</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-[#2E2E2E]">$9</span>
                <span className="text-[#2E2E2E] opacity-70">/month</span>
              </div>
              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-[#2E2E2E]">✓</span>
                  <span className="text-[#2E2E2E] opacity-80">Unlimited courses</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#2E2E2E]">✓</span>
                  <span className="text-[#2E2E2E] opacity-80">Advanced analytics</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#2E2E2E]">✓</span>
                  <span className="text-[#2E2E2E] opacity-80">Priority support</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#2E2E2E]">✓</span>
                  <span className="text-[#2E2E2E] opacity-80">Custom reminders</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#2E2E2E]">✓</span>
                  <span className="text-[#2E2E2E] opacity-80">Syllabus AI extraction</span>
                </li>
              </ul>
              <button onClick={handleGetStarted} className="w-full bg-[#B2EBF2] text-[#2E2E2E] hover:bg-[#80DEEA] transition-colors py-3 rounded-lg font-bold border-2 border-[#2E2E2E]/10">
                Get Started
              </button>
            </NoteCard>

            {/* Pro+ Plan */}
            <NoteCard rotation={-1.5} hasPaperclip>
              <h3 className="text-2xl font-bold text-[#2E2E2E] mb-2">Pro+</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-[#2E2E2E]">$19</span>
                <span className="text-[#2E2E2E] opacity-70">/month</span>
              </div>
              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-[#2E2E2E]">✓</span>
                  <span className="text-[#2E2E2E] opacity-80">Everything in Pro</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#2E2E2E]">✓</span>
                  <span className="text-[#2E2E2E] opacity-80">Team collaboration</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#2E2E2E]">✓</span>
                  <span className="text-[#2E2E2E] opacity-80">Advanced reporting</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#2E2E2E]">✓</span>
                  <span className="text-[#2E2E2E] opacity-80">Dedicated support</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#2E2E2E]">✓</span>
                  <span className="text-[#2E2E2E] opacity-80">API access</span>
                </li>
              </ul>
              <button className="w-full bg-[#F8BBD0] text-[#2E2E2E] hover:bg-[#F48FB1] transition-colors py-3 rounded-lg font-bold border-2 border-[#2E2E2E]/10">
                Get Started
              </button>
            </NoteCard>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Notebook Style */}
      <section className="py-20 px-6 lg:px-8 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <NoteCard rotation={1} className="inline-block max-w-md">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#2E2E2E] mb-2">
                Loved by Students Worldwide
              </h2>
              <p className="text-lg text-[#2E2E2E] opacity-80">
                See what students are saying about StayDue
              </p>
            </NoteCard>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <NoteCard rotation={-1}>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-[#2E2E2E] opacity-80 mb-6 text-sm" style={{ lineHeight: '1.6' }}>
                "StayDue has completely changed how I manage my assignments. I never miss deadlines anymore and my grades have improved significantly!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#B2EBF2] rounded-full flex items-center justify-center text-[#2E2E2E] font-bold border-2 border-[#2E2E2E]/20">
                  SM
                </div>
                <div>
                  <div className="font-bold text-[#2E2E2E]">Sarah Martinez</div>
                  <div className="text-xs text-[#2E2E2E] opacity-70">Computer Science Student</div>
                </div>
              </div>
            </NoteCard>

            {/* Testimonial 2 */}
            <NoteCard rotation={1.5} hasPaperclip>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-[#2E2E2E] opacity-80 mb-6 text-sm" style={{ lineHeight: '1.6' }}>
                "The Google Calendar sync is a game-changer. Everything is in one place now and I can see my assignments on my phone calendar. So convenient!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#FFF176] rounded-full flex items-center justify-center text-[#2E2E2E] font-bold border-2 border-[#2E2E2E]/20">
                  JK
                </div>
                <div>
                  <div className="font-bold text-[#2E2E2E]">James Kim</div>
                  <div className="text-xs text-[#2E2E2E] opacity-70">Engineering Student</div>
                </div>
              </div>
            </NoteCard>

            {/* Testimonial 3 */}
            <NoteCard rotation={-1}>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-[#2E2E2E] opacity-80 mb-6 text-sm" style={{ lineHeight: '1.6' }}>
                "Uploading my syllabi and having assignments automatically extracted saved me hours at the start of each semester. This is a must-have tool!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#F8BBD0] rounded-full flex items-center justify-center text-[#2E2E2E] font-bold border-2 border-[#2E2E2E]/20">
                  ML
                </div>
                <div>
                  <div className="font-bold text-[#2E2E2E]">Maria Lopez</div>
                  <div className="text-xs text-[#2E2E2E] opacity-70">Business Student</div>
                </div>
              </div>
            </NoteCard>
          </div>
        </div>
      </section>

      {/* FAQ Section - Notebook Style */}
      <section className="py-20 px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <NoteCard rotation={-1} className="inline-block max-w-md">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#2E2E2E] mb-2">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-[#2E2E2E] opacity-80">
                Everything you need to know about StayDue
              </p>
            </NoteCard>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <NoteCard key={index} rotation={index % 2 === 0 ? -0.5 : 0.5} className="overflow-hidden">
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  className="w-full text-left hover:opacity-80 transition-opacity"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-[#2E2E2E]">{faq.question}</span>
                    <svg
                      className={`w-5 h-5 text-[#2E2E2E] opacity-60 transition-transform ${expandedFAQ === index ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  {expandedFAQ === index && (
                    <div className="pt-2 text-[#2E2E2E] opacity-80 text-sm" style={{ lineHeight: '1.6' }}>
                      {faq.answer}
                    </div>
                  )}
                </button>
              </NoteCard>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section - Notebook Style */}
      <section className="py-20 px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          <NoteCard rotation={1} className="inline-block max-w-2xl">
            <h2 className="text-4xl sm:text-5xl font-bold text-[#2E2E2E] mb-4">
              <Highlight color="yellow">Ready to stay organized?</Highlight>
            </h2>
            <p className="text-xl text-[#2E2E2E] opacity-80 mb-8" style={{ lineHeight: '1.7' }}>
              Join thousands of students who never miss a deadline. Get started for free today.
            </p>
          <button
              onClick={handleGetStarted}
            disabled={loading}
              className="bg-[#FFF176] text-[#2E2E2E] hover:bg-[#FFEB3B] transition-all px-8 py-4 rounded-lg font-bold text-lg shadow-[0_4px_6px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_8px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 border-2 border-[#2E2E2E]/10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
              {loading ? 'Signing in...' : 'Get Started Free →'}
          </button>
          </NoteCard>
        </div>
      </section>

      <Footer />
    </div>
  )
}
