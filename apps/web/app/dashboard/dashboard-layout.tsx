'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'

export interface DashboardLayoutProps {
  user: any
  profile: any
}

export default function DashboardLayout({ user, profile }: DashboardLayoutProps) {
  const [activeMenu, setActiveMenu] = useState('home')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  // Load sidebar state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('sidebarCollapsed')
    if (savedState !== null) {
      setSidebarCollapsed(JSON.parse(savedState))
    }
  }, [])

  // Save sidebar state to localStorage when it changes
  const toggleSidebar = () => {
    const newState = !sidebarCollapsed
    setSidebarCollapsed(newState)
    localStorage.setItem('sidebarCollapsed', JSON.stringify(newState))
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const userName = user?.user_metadata?.full_name || 
                   user?.user_metadata?.name || 
                   user?.email?.split('@')[0] || 
                   'User'
  const userEmail = user?.email || ''

  // Mock data for metrics
  const metrics = [
    { label: 'Total Projects', value: '24', change: '+5', changeLabel: 'Increased from last month', highlighted: true },
    { label: 'Ended Projects', value: '10', change: '+6', changeLabel: 'Increased from last month' },
    { label: 'Running Projects', value: '12', change: '+2', changeLabel: 'Increased from last month' },
    { label: 'Pending Projects', value: '2', subtitle: 'On Discuss' },
  ]

  const menuItems = [
    {
      id: 'home',
      label: 'Home',
      iconImage: '/calendar.png',
    },
    {
      id: 'courses',
      label: 'Courses',
      iconImage: '/book.png',
    },
    {
      id: 'studyTools',
      label: 'Study Tools',
      iconImage: '/brainstorm.png',
    },
    {
      id: 'collaboration',
      label: 'Collaboration',
      iconImage: '/group-chat.png',
    },
    {
      id: 'account',
      label: 'Account',
      iconImage: '/settings.png',
    },
  ]


  const teamMembers = [
    { name: 'Alexandra Deff', task: 'Working on Github Project Repository', status: 'Completed', statusColor: 'bg-green-500' },
    { name: 'Edwin Adenike', task: 'Working on Integrate User Authentication System', status: 'In Progress', statusColor: 'bg-yellow-500' },
    { name: 'Isaac Oluwatemilorun', task: 'Working on Develop Search and Filter Functionality', status: 'Pending', statusColor: 'bg-orange-500' },
    { name: 'David Oshodi', task: 'Working on Responsive Layout for Homepage', status: 'In Progress', statusColor: 'bg-yellow-500' },
  ]

  const projects = [
    { name: 'Develop API Endpoints', dueDate: 'Nov 26, 2024', color: 'bg-blue-500' },
    { name: 'Onboarding Flow', dueDate: 'Nov 28, 2024', color: 'bg-teal-500' },
    { name: 'Build Dashboard', dueDate: 'Nov 30, 2024', color: 'bg-purple-500' },
    { name: 'Optimize Page Load', dueDate: 'Dec 5, 2024', color: 'bg-orange-500' },
    { name: 'Cross-Browser Testing', dueDate: 'Dec 6, 2024', color: 'bg-pink-500' },
  ]

  // Icon component helper
  const Icon = ({ name, className = "w-5 h-5" }: { name: string; className?: string }) => {
    const icons: Record<string, React.ReactElement> = {
      home: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      tasks: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      calendar: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      analytics: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      courses: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      upload: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      ),
      projects: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      flashcards: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      study: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      ai: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      reminders: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      ),
      account: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      billing: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      files: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      team: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      appearance: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      support: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      settings: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      menu: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      ),
    }
    return icons[name] || <div className={className} />
  }

  return (
    <div className="flex h-screen bg-[#F5F5F5] overflow-hidden">
      {/* Left Sidebar - Collapsible Design */}
      <aside className={`bg-[#E3F2FD] border-r border-[#BBDEFB] flex flex-col transition-all duration-300 ease-in-out ${
        sidebarCollapsed ? 'w-[72px]' : 'w-[280px]'
      }`}>
        {/* Header - Logo & Toggle */}
        <div className={`${sidebarCollapsed ? 'px-3' : 'px-6'} py-5 border-b border-[#BBDEFB] flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
          {!sidebarCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#5aa9e6] rounded-lg flex items-center justify-center text-white font-bold text-lg">
                S
              </div>
              <span className="font-bold text-lg text-gray-900">StayDue</span>
            </div>
          )}
          {sidebarCollapsed && (
            <div className="w-10 h-10 bg-[#5aa9e6] rounded-lg flex items-center justify-center text-white font-bold text-lg">
              S
            </div>
          )}
          {!sidebarCollapsed && (
            <button
              onClick={toggleSidebar}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              title="Collapse sidebar"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </button>
          )}
        </div>

        {/* Navigation - Scrollable */}
        <nav className="flex-1 overflow-y-auto">
          <div className={`py-4 ${sidebarCollapsed ? 'px-2' : 'px-3'}`}>
            {/* Menu Items - Simple 5 Options */}
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center' : 'gap-3'} px-3 py-3 rounded-lg transition-all duration-200 ease-in-out relative group ${
                  activeMenu === item.id
                    ? 'bg-[#5aa9e6] text-white shadow-md'
                    : 'text-gray-700 hover:bg-[#E3F2FD] hover:text-[#5aa9e6]'
                }`}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                  <Image
                    src={item.iconImage}
                    alt={item.label}
                    width={20}
                    height={20}
                    className={`object-contain transition-all duration-200 ${
                      activeMenu === item.id ? 'brightness-0 invert' : ''
                    }`}
                  />
                </div>
                {!sidebarCollapsed && (
                  <span className={`flex-1 text-left font-medium transition-colors duration-200 ${
                    activeMenu === item.id ? 'text-white' : 'text-gray-700'
                  }`}>
                    {item.label}
                  </span>
                )}
                {/* Tooltip for collapsed state */}
                {sidebarCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* Footer - Support, Settings, User Profile */}
        <div className={`border-t border-[#BBDEFB] ${sidebarCollapsed ? 'p-2' : 'p-4'} space-y-3`}>
          {/* Support & Settings */}
          {!sidebarCollapsed ? (
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex-1">
                <Icon name="support" className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium">Support</span>
              </button>
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex-1">
                <Icon name="settings" className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium">Settings</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <button className="flex items-center justify-center p-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors relative group" title="Support">
                <Icon name="support" className="w-4 h-4 text-gray-500" />
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                  Support
                </div>
              </button>
              <button className="flex items-center justify-center p-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors relative group" title="Settings">
                <Icon name="settings" className="w-4 h-4 text-gray-500" />
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                  Settings
                </div>
              </button>
            </div>
          )}

          {/* User Profile Card */}
          <div className={`bg-gray-50 rounded-lg ${sidebarCollapsed ? 'p-2' : 'p-3'} flex items-center ${sidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
            <div className="w-10 h-10 bg-[#5aa9e6] rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
              {userName.charAt(0).toUpperCase()}
            </div>
            {!sidebarCollapsed && (
              <>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-gray-900 truncate">{userName}</div>
                  <div className="text-xs text-gray-500 truncate">{userEmail}</div>
                </div>
                <button className="p-1 hover:bg-gray-200 rounded transition-colors flex-shrink-0">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      </aside>

      {/* Expand Button (when collapsed) */}
      {sidebarCollapsed && (
        <button
          onClick={toggleSidebar}
          className="absolute left-[72px] top-4 z-10 p-2 bg-white border border-gray-200 rounded-r-lg shadow-sm hover:bg-gray-50 transition-colors"
          title="Expand sidebar"
        >
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header Bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          {/* Logo (mobile) */}
          <div className="flex items-center gap-2 md:hidden">
            <div className="w-8 h-8 bg-[#5aa9e6] rounded-lg flex items-center justify-center text-white font-bold">
              S
            </div>
            <span className="font-bold text-lg">StayDue</span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </div>
              <input
                type="text"
                placeholder="Search task"
                className="w-full pl-10 pr-20 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5aa9e6] focus:border-transparent"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                ⌘F
              </div>
            </div>
          </div>

          {/* User Profile Section */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <span className="text-xl">✉️</span>
            </button>
            <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors relative">
              <span className="text-xl">🔔</span>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 pl-4">
              <div className="w-10 h-10 bg-[#5aa9e6] rounded-full flex items-center justify-center text-white font-semibold">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div className="hidden md:block">
                <div className="text-sm font-semibold text-gray-900">{userName}</div>
                <div className="text-xs text-gray-500">{userEmail}</div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Page Title Section */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="mt-1 text-gray-600">Plan, prioritize, and accomplish your tasks with ease.</p>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-[#5aa9e6] text-white rounded-lg font-semibold hover:bg-[#4a8dd6] transition-colors">
                  + Add Project
                </button>
                <button className="px-4 py-2 bg-white border-2 border-[#5aa9e6] text-[#5aa9e6] rounded-lg font-semibold hover:bg-[#5aa9e6]/5 transition-colors">
                  Import Data
                </button>
              </div>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {metrics.map((metric, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl shadow-sm ${
                    metric.highlighted
                      ? 'bg-[#5aa9e6] text-white'
                      : 'bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`text-3xl font-bold ${metric.highlighted ? 'text-white' : 'text-gray-900'}`}>
                      {metric.value}
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="text-sm">📈</span>
                    </div>
                  </div>
                  <div className={`text-sm font-medium mb-1 ${metric.highlighted ? 'text-white/90' : 'text-gray-600'}`}>
                    {metric.label}
                  </div>
                  {metric.change && (
                    <div className={`text-xs ${metric.highlighted ? 'text-white/80' : 'text-green-600'}`}>
                      {metric.change} {metric.changeLabel}
                    </div>
                  )}
                  {metric.subtitle && (
                    <div className={`text-xs ${metric.highlighted ? 'text-white/80' : 'text-gray-500'}`}>
                      {metric.subtitle}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Two-Column Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Project Analytics Card */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Project Analytics</h2>
                </div>
                <div className="h-64 flex items-end justify-between gap-2">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => {
                    const height = [60, 80, 74, 90, 65, 85, 70][index]
                    const isHighlighted = index === 2
                    return (
                      <div key={day} className="flex-1 flex flex-col items-center">
                        <div className="w-full flex flex-col items-center justify-end mb-2">
                          {isHighlighted && (
                            <span className="text-xs font-semibold text-[#5aa9e6] mb-1">74%</span>
                          )}
                          <div
                            className={`w-full rounded-t ${
                              isHighlighted ? 'bg-[#5aa9e6]' : 'bg-[#5aa9e6]/40'
                            }`}
                            style={{ height: `${height}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500">{day}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Team Collaboration Card */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Team Collaboration</h2>
                  <button className="px-3 py-1.5 text-sm font-semibold text-[#5aa9e6] hover:bg-[#5aa9e6]/10 rounded-lg transition-colors">
                    + Add Member
                  </button>
                </div>
                <div className="space-y-4">
                  {teamMembers.map((member, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-[#5aa9e6] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {member.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{member.name}</div>
                        <div className="text-sm text-gray-600">{member.task}</div>
                        <div className="mt-1">
                          <span className={`inline-block px-2 py-0.5 text-xs font-semibold ${member.statusColor} text-white rounded-full`}>
                            {member.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Project Progress Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Project Progress</h2>
              <div className="flex items-center justify-center">
                <div className="relative w-48 h-48">
                  <svg className="transform -rotate-90" width="192" height="192">
                    <circle
                      cx="96"
                      cy="96"
                      r="80"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="16"
                    />
                    <circle
                      cx="96"
                      cy="96"
                      r="80"
                      fill="none"
                      stroke="#5aa9e6"
                      strokeWidth="16"
                      strokeDasharray={`${41 * 2 * Math.PI * 80 / 100} ${2 * Math.PI * 80}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900">41%</div>
                      <div className="text-sm text-gray-600">Project Ended</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-6 mt-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#5aa9e6]"></div>
                  <span className="text-sm text-gray-600">Completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#4a8dd6]"></div>
                  <span className="text-sm text-gray-600">In Progress</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#5aa9e6]/40"></div>
                  <span className="text-sm text-gray-600">Pending</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Right Sidebar */}
      <aside className="w-[320px] bg-white border-l border-gray-200 overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Reminders Card */}
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Reminders</h3>
            <div className="space-y-3">
              <div>
                <div className="font-medium text-gray-900">Meeting with Arc Company</div>
                <div className="text-sm text-gray-600 mt-1">Time: 02.00 pm - 04.00 pm</div>
              </div>
              <button className="w-full mt-4 px-4 py-2 bg-[#5aa9e6] text-white rounded-lg font-semibold hover:bg-[#4a8dd6] transition-colors">
                Start Meeting
              </button>
            </div>
          </div>

          {/* Projects Card */}
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Project</h3>
              <button className="px-3 py-1 text-sm font-semibold text-[#5aa9e6] hover:bg-[#5aa9e6]/10 rounded-lg transition-colors">
                + New
              </button>
            </div>
            <div className="space-y-3">
              {projects.map((project, index) => (
                <div key={index} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                  <div className={`w-2 h-2 rounded-full ${project.color}`}></div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 text-sm">{project.name}</div>
                    <div className="text-xs text-gray-500">Due date: {project.dueDate}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Time Tracker Card */}
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Time Tracker</h3>
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-900 mb-6">01:24:08</div>
              <div className="flex justify-center gap-4">
                <button className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                  <span className="text-xl">⏸️</span>
                </button>
                <button className="w-12 h-12 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors">
                  <span className="text-xl text-white">⏹️</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}

