'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export interface DashboardLayoutProps {
  user: any
  profile: any
}

export default function DashboardLayout({ user, profile }: DashboardLayoutProps) {
  const [activeMenu, setActiveMenu] = useState('dashboard')
  const router = useRouter()
  const supabase = createClient()

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
    { id: 'dashboard', label: 'Dashboard', icon: '📊', active: true },
    { id: 'tasks', label: 'Tasks', icon: '📋', badge: '12+' },
    { id: 'calendar', label: 'Calendar', icon: '📅' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'team', label: 'Team', icon: '👥' },
  ]

  const generalItems = [
    { id: 'settings', label: 'Settings', icon: '⚙️' },
    { id: 'help', label: 'Help', icon: '❓' },
    { id: 'logout', label: 'Logout', icon: '🚪', action: handleSignOut },
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

  return (
    <div className="flex h-screen bg-[#F5F5F5] overflow-hidden">
      {/* Left Sidebar - Fixed */}
      <aside className="w-[250px] bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#5aa9e6] rounded-lg flex items-center justify-center text-white font-bold text-lg">
              S
            </div>
            <span className="font-bold text-xl text-gray-900">StayDue</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-1">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
            Menu
          </div>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors relative ${
                activeMenu === item.id
                  ? 'bg-[#5aa9e6]/10 text-[#5aa9e6]'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {activeMenu === item.id && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#5aa9e6] rounded-r"></div>
              )}
              <span className="text-lg">{item.icon}</span>
              <span className="flex-1 text-left font-medium">{item.label}</span>
              {item.badge && (
                <span className="px-2 py-0.5 text-xs font-semibold bg-[#5aa9e6] text-white rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          ))}

          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 mt-6 px-2">
            General
          </div>
          {generalItems.map((item) => (
            <button
              key={item.id}
              onClick={item.action || (() => setActiveMenu(item.id))}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <span className="text-lg">{item.icon}</span>
              <span className="flex-1 text-left font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Promotional Card */}
        <div className="p-4 border-t border-gray-200">
          <div className="bg-gradient-to-br from-[#5aa9e6] to-[#4a8dd6] rounded-lg p-4 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
            <div className="relative">
              <div className="text-sm font-semibold mb-1">Download our Mobile App</div>
              <div className="text-xs opacity-90 mb-3">Get easy in another way</div>
              <button className="w-full bg-white text-[#5aa9e6] text-sm font-semibold py-2 rounded-lg hover:bg-gray-100 transition-colors">
                Download
              </button>
            </div>
          </div>
        </div>
      </aside>

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

