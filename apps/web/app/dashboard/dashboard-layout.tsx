'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faBook, faClipboardList, faCalendar, faBrain, faUsers, faGear, faPlus, faSignOut } from '@fortawesome/free-solid-svg-icons'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

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
            <div className="max-w-6xl mx-auto px-6 py-6">
              {/* Page Header - Compact */}
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-1" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                  Dashboard Overview
                </h1>
                <p className="text-base text-gray-600" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                  Welcome back! Upload your syllabus to get started.
                </p>
              </div>

              {/* File Upload Section - Main Content with Lottie Animation Background */}
              <div className="relative bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                {/* Lottie Animation Background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                  <DotLottieReact
                    src="https://lottie.host/96481d11-61b5-4b34-9586-f04fea27c3a6/bkCpg4fwsS.lottie"
                    loop
                    autoplay
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-2xl mx-auto p-8">
                  <div className="text-center">
                    {/* Upload Icon - Smaller */}
                    <div className="mb-4 flex justify-center">
                      <div className="relative">
                        <div className="w-20 h-20 bg-gradient-to-br from-[#5aa9e6] to-[#7bb8f0] rounded-full flex items-center justify-center shadow-lg shadow-[#5aa9e6]/30 gentle-bounce">
                          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                        </div>
                        {/* Decorative circles - Smaller */}
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#6bcf7f] rounded-full animate-ping"></div>
                        <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-[#ffb84d] rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                      </div>
                    </div>

                    {/* Title - Smaller */}
                    <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                      Upload Your Syllabus
                    </h2>
                    
                    {/* Description - Smaller */}
                    <p className="text-sm text-gray-600 mb-6 leading-relaxed max-w-xl mx-auto" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                      Drop your course syllabus here and we'll automatically extract all important dates, assignments, and deadlines.
                    </p>

                    {/* Upload Area - Compact Design */}
                    <div className="relative group">
                      <div className="border-2 border-dashed border-[#5aa9e6]/40 rounded-2xl p-8 bg-gradient-to-br from-[#f0f7ff] via-white to-[#f0f7ff] hover:border-[#5aa9e6] hover:bg-gradient-to-br hover:from-[#e6f3ff] hover:via-white hover:to-[#e6f3ff] transition-all duration-300 cursor-pointer shadow-inner hover:shadow-lg">
                        <div className="flex flex-col items-center">
                          {/* Cloud Upload Icon - Smaller */}
                          <div className="mb-4">
                            <svg className="w-12 h-12 text-[#5aa9e6] group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                          </div>
                          
                          <p className="text-base font-semibold text-gray-800 mb-1 group-hover:text-[#5aa9e6] transition-colors" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                            Drag & Drop Your File Here
                          </p>
                          <p className="text-xs text-gray-500 mb-4" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                            or click to browse
                          </p>
                          
                          {/* File Type Badges - Smaller */}
                          <div className="flex gap-2 mb-3">
                            <span className="px-3 py-1 bg-[#5aa9e6]/10 text-[#5aa9e6] rounded-full text-xs font-medium" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                              📄 PDF
                            </span>
                            <span className="px-3 py-1 bg-[#7bb8f0]/10 text-[#7bb8f0] rounded-full text-xs font-medium" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                              📑 DOCX
                            </span>
                            <span className="px-3 py-1 bg-[#a8d5ff]/20 text-[#4a8dd6] rounded-full text-xs font-medium" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                              🔗 Link
                            </span>
                          </div>
                          
                          <p className="text-xs text-gray-400" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                            Max 10MB
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Alternative Option - Compact */}
                    <div className="mt-5 flex items-center justify-center gap-2">
                      <div className="h-px w-12 bg-gray-300"></div>
                      <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>or</span>
                      <div className="h-px w-12 bg-gray-300"></div>
                    </div>
                    
                    <button className="mt-4 px-6 py-2.5 bg-gradient-to-r from-[#5aa9e6] to-[#7bb8f0] text-white font-semibold rounded-xl hover:from-[#4a8dd6] hover:to-[#5aa9e6] transition-all duration-300 shadow-lg shadow-[#5aa9e6]/30 hover:shadow-xl hover:shadow-[#5aa9e6]/40 hover:scale-105 transform text-sm" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                      📋 Paste Website Link
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

