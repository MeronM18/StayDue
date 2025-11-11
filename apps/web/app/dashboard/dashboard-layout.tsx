'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faBook, faClipboardList, faCalendar, faBrain, faUsers, faGear, faPlus, faSignOut } from '@fortawesome/free-solid-svg-icons'

export interface DashboardLayoutProps {
  user: any
  profile: any
}

export default function DashboardLayout({ user, profile }: DashboardLayoutProps) {
  const [activeMenu, setActiveMenu] = useState('home')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const router = useRouter()
  const supabase = createClient()
  const searchInputRef = useRef<HTMLInputElement>(null)

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

  // Handle search icon click when sidebar is collapsed
  const handleSearchClick = () => {
    if (sidebarCollapsed) {
      setSidebarCollapsed(false)
      // Focus search input after sidebar expands
      setTimeout(() => {
        searchInputRef.current?.focus()
      }, 300) // Wait for sidebar animation to complete
    }
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

  const menuItems = [
    {
      id: 'home',
      label: 'Home',
      icon: faHome,
    },
    {
      id: 'calendar',
      label: 'Calendar',
      icon: faCalendar,
    },
    {
      id: 'courses',
      label: 'Courses',
      icon: faBook,
    },
    {
      id: 'tasks',
      label: 'Tasks',
      icon: faClipboardList,
    },
    {
      id: 'studyTools',
      label: 'Study Tools',
      icon: faBrain,
    },
    {
      id: 'collaboration',
      label: 'Collaboration',
      icon: faUsers,
    },
    {
      id: 'account',
      label: 'Account',
      icon: faGear,
    },
  ]

  return (
    <div className="flex h-screen bg-[#F5F5F5] overflow-hidden">
      {/* Left Sidebar - Collapsible Design */}
      <aside className={`bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out ${
        sidebarCollapsed ? 'w-[72px] overflow-visible' : 'w-[280px]'
      }`}>
        {/* Header - Logo & Toggle */}
        <div className={`${sidebarCollapsed ? 'px-3' : 'px-6'} py-4 border-b border-gray-200 flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 flex items-center justify-center">
                <Image
                  src="/assets/stayduelogo.png"
                  alt="StayDue Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <span className="text-lg font-bold text-black" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>StayDue</span>
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className={`p-1.5 hover:bg-gray-50 rounded-lg transition-colors flex items-center justify-center cursor-pointer relative group ${sidebarCollapsed ? 'w-full' : ''}`}
          >
            <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
              <Image
                src="/dock_to_right_24dp_000000_FILL0_wght400_GRAD0_opsz24.png"
                alt="Toggle sidebar"
                width={20}
                height={20}
                className="object-contain"
              />
            </div>
            {/* Tooltip - only when collapsed */}
            {sidebarCollapsed && (
              <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 ease-in-out whitespace-nowrap z-50 shadow-lg transform group-hover:translate-x-0 translate-x-[-4px]">
                Toggle Sidebar
              </div>
            )}
          </button>
        </div>

        {/* Search Bar */}
        <div className={`px-4 py-3 border-b border-gray-200 ${sidebarCollapsed ? 'flex justify-center' : ''}`}>
          {sidebarCollapsed ? (
            <button
              onClick={handleSearchClick}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors cursor-pointer relative group"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {/* Tooltip */}
              <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 ease-in-out whitespace-nowrap z-50 shadow-lg transform group-hover:translate-x-0 translate-x-[-4px]">
                Search
              </div>
            </button>
          ) : (
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search your courses"
                className="w-full pl-9 pr-4 py-2.5 bg-gray-100 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm text-gray-900 placeholder-gray-500"
                style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
              />
            </div>
          )}
        </div>

        {/* Navigation - Scrollable */}
        <nav className="flex-1" style={sidebarCollapsed ? { overflow: 'visible', position: 'relative' } : { overflowY: 'auto' }}>
          {sidebarCollapsed ? (
            <div className="py-3 px-2" style={{ overflow: 'visible' }}>
              {/* Menu Items */}
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveMenu(item.id)}
                  className={`w-full flex items-center justify-center px-2 py-2.5 relative group mb-0.5 ${
                    activeMenu === item.id
                      ? 'bg-[#5aa9e6] text-white'
                      : 'text-gray-700 hover:bg-[#5aa9e6]/10'
                  }`}
                  style={{
                    borderRadius: '0.5rem',
                    transitionProperty: 'background-color',
                    transitionDuration: '150ms',
                    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}
                >
                  <div className="w-5 h-5 flex items-center justify-center flex-shrink-0" style={{ cursor: 'pointer' }}>
                    <FontAwesomeIcon
                      icon={item.icon}
                      className="w-5 h-5 transition-all duration-150"
                      style={{ 
                        fontWeight: activeMenu === item.id ? 600 : 400, 
                        cursor: 'pointer',
                        color: activeMenu === item.id ? 'white' : '#374151'
                      }}
                    />
                  </div>
                  {/* Tooltip - shows on hover when collapsed */}
                  <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 ease-in-out whitespace-nowrap z-50 shadow-lg transform group-hover:translate-x-0 translate-x-[-4px]">
                    {item.label}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="py-3 px-4">
              <div className="mb-3">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>Menu</h3>
              </div>
              {/* Menu Items */}
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveMenu(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 relative group mb-0.5 ${
                    activeMenu === item.id
                      ? 'bg-[#5aa9e6] text-white'
                      : 'text-gray-700 hover:bg-[#5aa9e6]/10'
                  }`}
                  style={{
                    borderRadius: '0.5rem',
                    transitionProperty: 'background-color',
                    transitionDuration: '150ms',
                    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}
                >
                  <div className="w-5 h-5 flex items-center justify-center flex-shrink-0" style={{ cursor: 'pointer' }}>
                    <FontAwesomeIcon
                      icon={item.icon}
                      className="w-5 h-5 transition-all duration-150"
                      style={{ 
                        fontWeight: activeMenu === item.id ? 600 : 400, 
                        cursor: 'pointer',
                        color: activeMenu === item.id ? 'white' : '#374151'
                      }}
                    />
                  </div>
                  <span className={`flex-1 text-left text-sm font-medium transition-colors duration-150 ${
                    activeMenu === item.id ? 'text-white font-semibold' : 'text-gray-700'
                  }`} style={{ cursor: 'pointer', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                    {item.label}
                  </span>
                </button>
              ))}
              
              {/* Add Syllabus Card */}
              <div className="mt-6 mb-4">
                <div className="mb-3">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>Quick Action</h3>
                </div>
                <button className="w-full bg-gray-50 hover:bg-gray-100 rounded-lg p-4 flex flex-col items-center justify-center transition-colors cursor-pointer border border-gray-200">
                  <div className="w-12 h-12 bg-[#5aa9e6] rounded-full flex items-center justify-center mb-3">
                    <FontAwesomeIcon icon={faPlus} className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-gray-900 mb-1" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>Add Syllabus</span>
                </button>
              </div>
            </div>
          )}
        </nav>

        {/* Footer - User Profile */}
        <div className={`${sidebarCollapsed ? 'p-2 pb-4' : 'p-4 pb-6'}`} style={sidebarCollapsed ? { overflow: 'visible', position: 'relative' } : {}}>
          <div className={`${sidebarCollapsed ? 'p-2' : 'p-0'} flex items-center ${sidebarCollapsed ? 'justify-center' : 'gap-3'}`} style={sidebarCollapsed ? { overflow: 'visible' } : {}}>
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-700 font-semibold text-sm flex-shrink-0 cursor-pointer relative group">
              {userName.charAt(0).toUpperCase()}
              {/* Tooltip - only when collapsed */}
              {sidebarCollapsed && (
                <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 ease-in-out whitespace-nowrap z-50 shadow-lg transform group-hover:translate-x-0 translate-x-[-4px]">
                  {userName}
                </div>
              )}
            </div>
            {!sidebarCollapsed && (
              <>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-gray-900 truncate" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{userName}</div>
                  <div className="text-xs text-gray-500 truncate" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{userEmail}</div>
                </div>
                <button 
                  onClick={handleSignOut}
                  className="p-1.5 hover:bg-gray-100 rounded transition-colors flex-shrink-0 cursor-pointer"
                >
                  <FontAwesomeIcon icon={faSignOut} className="w-4 h-4 text-gray-500" />
                </button>
              </>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-[#F5F5F5]">
          {activeMenu === 'home' && (
            <div className="max-w-7xl mx-auto px-6 py-8">
              {/* Page Header */}
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                  Dashboard Overview
                </h1>
                <p className="text-lg text-gray-600" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                  Welcome back! Here's an overview of your academic progress and upcoming tasks.
                </p>
              </div>

              {/* File Upload Section - Main Content */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12">
                <div className="max-w-2xl mx-auto text-center">
                  {/* Upload Icon */}
                  <div className="mb-6 flex justify-center">
                    <div className="w-24 h-24 bg-[#5aa9e6]/10 rounded-full flex items-center justify-center">
                      <svg className="w-12 h-12 text-[#5aa9e6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                    Get Started by Uploading Your Syllabus
                  </h2>
                  
                  {/* Description */}
                  <p className="text-gray-600 mb-8 leading-relaxed" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                    Upload your course syllabus to automatically extract important dates, assignments, and deadlines. 
                    You can upload PDF files or paste a website link to your course page.
                  </p>

                  {/* Upload Area */}
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 hover:border-[#5aa9e6] transition-colors cursor-pointer bg-gray-50 hover:bg-[#5aa9e6]/5 mb-6">
                    <div className="flex flex-col items-center">
                      <svg className="w-10 h-10 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <p className="text-gray-700 font-medium mb-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                        Drag and drop your syllabus here
                      </p>
                      <p className="text-sm text-gray-500 mb-4" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                        or click to browse
                      </p>
                      <p className="text-xs text-gray-400" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                        Supports PDF files up to 10MB
                      </p>
                    </div>
                  </div>

                  {/* Alternative Option */}
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <span style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>or</span>
                    <button className="text-[#5aa9e6] font-medium hover:text-[#4a8dd6] transition-colors" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                      Paste a website link
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

