'use client'

import { useState, useEffect } from 'react'
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
              <div className="absolute left-full ml-3 px-3 py-2 bg-gray-900 text-white text-sm font-medium rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 ease-in-out whitespace-nowrap z-50 shadow-lg transform group-hover:translate-x-0 translate-x-[-4px]">
                Toggle Sidebar
              </div>
            )}
          </button>
        </div>

        {/* Search Bar */}
        <div className={`px-4 py-3 border-b border-gray-200 ${sidebarCollapsed ? 'flex justify-center' : ''}`}>
          {sidebarCollapsed ? (
            <button
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors cursor-pointer relative group"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {/* Tooltip */}
              <div className="absolute left-full ml-3 px-3 py-2 bg-gray-900 text-white text-sm font-medium rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 ease-in-out whitespace-nowrap z-50 shadow-lg transform group-hover:translate-x-0 translate-x-[-4px]">
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
                type="text"
                placeholder="Search your courses"
                className="w-full pl-9 pr-4 py-2.5 bg-gray-100 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm text-gray-900 placeholder-gray-500"
                style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
              />
            </div>
          )}
        </div>

        {/* Navigation - Scrollable */}
        <nav className={`flex-1 ${sidebarCollapsed ? 'overflow-x-visible overflow-y-auto' : 'overflow-y-auto'}`}>
          <div className={`py-3 ${sidebarCollapsed ? 'px-2' : 'px-4'}`}>
            {!sidebarCollapsed && (
              <div className="mb-3">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>Menu</h3>
              </div>
            )}
            {/* Menu Items */}
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center' : 'gap-3'} ${sidebarCollapsed ? 'px-2 py-2.5' : 'px-3 py-2.5'} relative group mb-0.5 ${
                  activeMenu === item.id
                    ? 'bg-[#5aa9e6]/20 text-black'
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
                <div className={`${sidebarCollapsed ? 'w-5 h-5' : 'w-5 h-5'} flex items-center justify-center flex-shrink-0`} style={{ cursor: 'pointer' }}>
                  <FontAwesomeIcon
                    icon={item.icon}
                    className={`${sidebarCollapsed ? 'w-5 h-5' : 'w-5 h-5'} transition-all duration-150 ${
                      activeMenu === item.id ? 'text-black' : 'text-gray-700'
                    }`}
                    style={{ fontWeight: activeMenu === item.id ? 600 : 400, cursor: 'pointer' }}
                  />
                </div>
                {!sidebarCollapsed && (
                  <span className={`flex-1 text-left text-sm font-medium transition-colors duration-150 ${
                    activeMenu === item.id ? 'text-black font-semibold' : 'text-gray-700'
                  }`} style={{ cursor: 'pointer', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                    {item.label}
                  </span>
                )}
                {/* Tooltip - shows on hover when collapsed */}
                {sidebarCollapsed && (
                  <div className="absolute left-full ml-3 px-3 py-2 bg-gray-900 text-white text-sm font-medium rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 ease-in-out whitespace-nowrap z-50 shadow-lg transform group-hover:translate-x-0 translate-x-[-4px]">
                    {item.label}
                  </div>
                )}
              </button>
            ))}
            
            {/* Add Syllabus Card */}
            {!sidebarCollapsed && (
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
            )}
          </div>
        </nav>

        {/* Footer - User Profile */}
        <div className={`${sidebarCollapsed ? 'p-2 pb-4' : 'p-4 pb-6'}`}>
          <div className={`${sidebarCollapsed ? 'p-2' : 'p-0'} flex items-center ${sidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-700 font-semibold text-sm flex-shrink-0 cursor-pointer relative group">
              {userName.charAt(0).toUpperCase()}
              {/* Tooltip - only when collapsed */}
              {sidebarCollapsed && (
                <div className="absolute left-full ml-3 px-3 py-2 bg-gray-900 text-white text-sm font-medium rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 ease-in-out whitespace-nowrap z-50 shadow-lg transform group-hover:translate-x-0 translate-x-[-4px]">
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
          {/* Blank page - ready for content */}
        </main>
      </div>
    </div>
  )
}

