'use client'

import { createClient } from '@/lib/supabase/client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import Image from 'next/image'

type AcademicGoal = 
  | 'maintain_gpa'
  | 'improve_grades'
  | 'graduate_on_time'
  | 'land_internship'
  | 'get_into_grad_school'
  | 'stay_organized'
  | 'other'

const ACADEMIC_GOALS: { value: AcademicGoal; label: string }[] = [
  { value: 'maintain_gpa', label: 'Maintain my current GPA' },
  { value: 'improve_grades', label: 'Improve my grades' },
  { value: 'graduate_on_time', label: 'Graduate on time' },
  { value: 'land_internship', label: 'Land an internship' },
  { value: 'get_into_grad_school', label: 'Get into grad school' },
  { value: 'stay_organized', label: 'Stay organized and consistent' },
  { value: 'other', label: 'Other' },
]

const TOTAL_STEPS = 5

// Image mapping for each question - reordered
const QUESTION_IMAGES = [
  '/school.png',        // Question 1: College/University
  '/study.png',         // Question 2: Major/Minors
  '/schedule.png',      // Question 3: Study hours
  '/graduation.png',    // Question 4: Academic goal
  '/social-media.png',  // Question 5: Where heard about us
]

// Background colors for image circles
const IMAGE_BG_COLORS = [
  '#E3F2FD', // Light blue for school
  '#E8F5E9', // Light green for study
  '#FFF3E0', // Light orange for schedule
  '#F3E5F5', // Light purple for graduation
  '#FCE4EC', // Light pink for social media
]

export default function OnboardingPage() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [step, setStep] = useState(0) // 0 = welcome screen, 1-5 = questions
  const [showCompletionScreen, setShowCompletionScreen] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  
  const [formData, setFormData] = useState({
    collegeUniversity: '',
    majorMinors: '',
    studyHoursPerWeek: '',
    mainAcademicGoal: '' as AcademicGoal | '',
    otherGoal: '',
    whereHeardAboutUs: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [collegeSuggestions, setCollegeSuggestions] = useState<Array<{ name: string; country: string; stateProvince: string }>>([])
  const [selectedCollege, setSelectedCollege] = useState<string>('')
  const [validColleges, setValidColleges] = useState<Set<string>>(new Set())
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [searchingColleges, setSearchingColleges] = useState(false)

  // Preload all images to avoid delay when switching - ensure they're fully cached
  useEffect(() => {
    let loadedCount = 0
    const totalImages = QUESTION_IMAGES.length

    QUESTION_IMAGES.forEach((src) => {
      const img = new window.Image()
      img.onload = () => {
        loadedCount++
        if (loadedCount === totalImages) {
          setImagesLoaded(true)
        }
      }
      img.onerror = () => {
        loadedCount++
        if (loadedCount === totalImages) {
          setImagesLoaded(true)
        }
      }
      // Force cache by loading image
      img.src = src
      // Also preload via link preload for better caching
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = src
      document.head.appendChild(link)
    })
  }, [])

  // Remove notebook theme on onboarding page and add animations
  useEffect(() => {
    const style = document.createElement('style')
    style.setAttribute('data-onboarding-styles', 'true')
    style.textContent = `
      body::before {
        display: none !important;
      }
      body {
        background-color: #FAFAF5 !important;
        background-image: none !important;
      }
      @keyframes bubble {
        0%, 100% {
          transform: perspective(500px) rotateX(5deg) scale(1);
        }
        50% {
          transform: perspective(500px) rotateX(-5deg) scale(1.05);
        }
      }
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    `
    document.head.appendChild(style)

    return () => {
      const onboardingStyle = document.head.querySelector('style[data-onboarding-styles="true"]')
      if (onboardingStyle) {
        document.head.removeChild(onboardingStyle)
      }
    }
  }, [])

  // Check authentication and onboarding status on mount
  useEffect(() => {
    const checkAuthAndOnboarding = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        
        if (!user) {
          router.push('/')
          return
        }

        const { data: profile } = await supabase
          .from('profiles')
          .select('onboarding_completed')
          .eq('id', user.id)
          .single()

        if (profile?.onboarding_completed) {
          router.push('/dashboard')
          return
        }

        setCheckingAuth(false)
      } catch (error) {
        console.error('Error checking auth:', error)
        router.push('/')
      }
    }

    checkAuthAndOnboarding()
  }, [router, supabase])

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      router.push('/')
      router.refresh()
    } catch (error) {
      console.error('Error signing out:', error)
      router.push('/')
    }
  }

  // Debounced search for colleges
  useEffect(() => {
    // Only search when on step 1 (college question)
    if (step !== 1) {
      return
    }

    const searchColleges = async (query: string) => {
      const trimmedQuery = query.trim()
      
      // Require at least 1 character to search
      if (trimmedQuery.length < 1) {
        setCollegeSuggestions([])
        setShowSuggestions(false)
        return
      }

      console.log('Searching for colleges with query:', trimmedQuery)
      setSearchingColleges(true)
      try {
        // Use Next.js API route to avoid CORS issues
        const apiUrl = `/api/universities?name=${encodeURIComponent(trimmedQuery)}`
        console.log('Fetching from API:', apiUrl)
        const response = await fetch(apiUrl)
        
        if (!response.ok) {
          // If API returns error, just show empty suggestions
          console.warn(`API returned ${response.status}, showing empty suggestions`)
          setCollegeSuggestions([])
          setShowSuggestions(false)
          return
        }
        
        const suggestions = await response.json()
        
        // Ensure data is an array and has valid structure
        if (!Array.isArray(suggestions)) {
          console.error('API returned non-array data:', suggestions)
          setCollegeSuggestions([])
          setShowSuggestions(false)
          return
        }
        
        console.log('College suggestions found:', suggestions.length, suggestions)
        setCollegeSuggestions(suggestions)
        // Update valid colleges set with all fetched suggestions
        const collegeNames = new Set(suggestions.map((c: any) => c.name.trim().toLowerCase()))
        setValidColleges(prev => new Set([...prev, ...collegeNames]))
        setShowSuggestions(suggestions.length > 0)
      } catch (error) {
        console.error('Error fetching colleges:', error)
        // Don't break the UI - just show no suggestions
        setCollegeSuggestions([])
        setShowSuggestions(false)
      } finally {
        setSearchingColleges(false)
      }
    }

    // Debounce the search - trigger after user stops typing for 200ms
    const timeoutId = setTimeout(() => {
      const query = formData.collegeUniversity?.trim() || ''
      if (query.length >= 1) {
        searchColleges(query)
      } else {
        setCollegeSuggestions([])
        setShowSuggestions(false)
      }
    }, 200) // 200ms debounce for faster response

    return () => clearTimeout(timeoutId)
  }, [formData.collegeUniversity, step])

  // Hide suggestions when not on question 1, and set selected college when returning to step 1
  useEffect(() => {
    if (step !== 1) {
      setShowSuggestions(false)
      setCollegeSuggestions([])
      setSearchingColleges(false)
      // Don't clear validColleges - we need them for validation
    } else {
      // When returning to step 1, if there's a value in the input, check if it's valid
      if (formData.collegeUniversity && formData.collegeUniversity.trim().length > 0) {
        const collegeValue = formData.collegeUniversity.trim()
        // If the value is in valid colleges, treat it as selected
        if (validColleges.has(collegeValue.toLowerCase())) {
          setSelectedCollege(collegeValue)
        }
        setShowSuggestions(false)
        setCollegeSuggestions([])
        setSearchingColleges(false)
      }
    }
  }, [step, formData.collegeUniversity, validColleges])

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {}

    if (currentStep === 1) {
      const collegeValue = formData.collegeUniversity.trim()
      if (!collegeValue) {
        newErrors.collegeUniversity = 'Please enter your college or university'
      } else if (!selectedCollege || selectedCollege.trim().toLowerCase() !== collegeValue.toLowerCase()) {
        // Check if the entered value matches a valid college from the suggestions
        const isValidCollege = validColleges.has(collegeValue.toLowerCase())
        if (!isValidCollege) {
          newErrors.collegeUniversity = 'Please select a university from the dropdown list'
        }
      }
    }

    if (currentStep === 2) {
      if (!formData.majorMinors.trim()) {
        newErrors.majorMinors = 'Please enter your major/minors'
      }
    }

    if (currentStep === 3) {
      if (!formData.studyHoursPerWeek.trim()) {
        newErrors.studyHoursPerWeek = 'Please enter how many hours you study per week'
      } else if (isNaN(Number(formData.studyHoursPerWeek)) || Number(formData.studyHoursPerWeek) < 0) {
        newErrors.studyHoursPerWeek = 'Please enter a valid number'
      }
    }

    if (currentStep === 4) {
      if (!formData.mainAcademicGoal) {
        newErrors.mainAcademicGoal = 'Please select your main academic goal'
      }
      if (formData.mainAcademicGoal === 'other' && !formData.otherGoal.trim()) {
        newErrors.otherGoal = 'Please specify your goal'
      }
    }

    if (currentStep === 5) {
      if (!formData.whereHeardAboutUs.trim()) {
        newErrors.whereHeardAboutUs = 'Please tell us where you heard about us'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (step === 0) {
      // Welcome screen - smooth transition to first question
      setIsTransitioning(true)
      // Start fading out welcome, then fade in question
      setTimeout(() => {
        setStep(1)
        // Reset transition after question appears
        setTimeout(() => {
          setIsTransitioning(false)
        }, 50)
      }, 300) // 300ms fade transition
      return
    }

    if (validateStep(step)) {
      if (step < TOTAL_STEPS) {
        setStep(step + 1)
      } else {
        // Show completion screen after a brief delay to show 100% progress
        setTimeout(() => {
          setShowCompletionScreen(true)
          setTimeout(() => {
            handleSubmit()
          }, 3000) // Show completion screen for 3 seconds
        }, 500) // Brief delay to show 100% progress
      }
    }
  }

  const handleBack = () => {
    if (step === 1) {
      // On first question, go back to welcome screen
      setStep(0)
    } else if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = async () => {
    if (!validateStep(TOTAL_STEPS)) return

    try {
      setLoading(true)

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/')
        return
      }

      const goalValue = formData.mainAcademicGoal === 'other' 
        ? formData.otherGoal 
        : formData.mainAcademicGoal

      // Prepare college/university data - can come from API selection or manual entry
      // API returns: { name: "University Name", country: "Country" }
      // When selected, we set formData.collegeUniversity = college.name (already trimmed)
      // When typed manually, user enters text which we trim here
      const collegeUniversityValue = formData.collegeUniversity.trim()

      const { data, error } = await supabase
        .from('profiles')
        .update({
          college_university: collegeUniversityValue,
          major_minors: formData.majorMinors.trim(),
          study_hours_per_week: parseInt(formData.studyHoursPerWeek),
          main_academic_goal: goalValue,
          where_heard_about_us: formData.whereHeardAboutUs.trim(),
          onboarding_completed: true,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)
        .select()

      if (error) {
        console.error('Error saving onboarding:', error)
        alert(`Error saving your information: ${error.message}. Please try again.`)
        setShowCompletionScreen(false)
        setLoading(false)
        return
      }

      if (!data || data.length === 0) {
        console.error('No profile found to update')
        alert('Error: Profile not found. Please try signing in again.')
        router.push('/')
        return
      }

      router.push('/dashboard')
      router.refresh()
    } catch (error) {
      console.error('Unexpected error:', error)
      alert('An unexpected error occurred. Please try again.')
      setShowCompletionScreen(false)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  const renderNavbar = () => {
    return (
      <nav 
        className="fixed top-0 z-[100] border-b border-[#E5E5E5] w-full" 
        style={{ 
          backgroundColor: '#F5F5F5', 
          position: 'fixed', 
          top: 0,
          left: 0,
          right: 0,
          isolation: 'isolate',
          boxShadow: '0 1px 0 0 #E5E5E5',
          minHeight: '83px',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8" style={{ backgroundColor: '#F5F5F5' }}>
          <div className="flex justify-between items-center" style={{ height: '83px' }}>
            {/* Logo Section - Left */}
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-2 group cursor-pointer"
            >
              <Image 
                src="/assets/stayduelogo.png" 
                alt="StayDue Logo" 
                width={54}
                height={48}
                className="h-12 w-auto"
                priority
              />
              <span className="text-2xl font-bold text-[#000000]">StayDue</span>
            </button>

            {/* Sign Out Button - Right */}
            <button
              onClick={handleSignOut}
              className="bg-[#2D2D32] text-white hover:bg-[#000000] hover:border-2 hover:border-white transition-all text-[15px] font-bold px-6 py-3 rounded-lg cursor-pointer border-2 border-transparent"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>
    )
  }

  const renderWelcomeScreen = () => {
    return (
      <div 
        className={`flex flex-col items-center justify-center h-screen transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
        style={{ backgroundColor: '#c0d6e1', width: '100%', margin: 0, padding: 0 }}
      >
        <div className="w-full max-w-lg mx-auto px-4">
          {/* Welcome Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 text-center border border-gray-200">
            {/* Lottie Animation - Larger */}
            <div className="mb-6 flex justify-center">
              <div className="w-56 h-56 flex items-center justify-center">
                <DotLottieReact
                  src="https://lottie.host/677e51fb-6ed7-4526-a891-c92fd7f479d8/qQUtWcswIA.lottie"
                  loop
                  autoplay
                />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#2E2E2E', fontFamily: 'var(--font-manrope)' }}>
              Welcome to StayDue!
            </h2>

            {/* Description */}
            <p className="text-base md:text-lg mb-8 leading-relaxed" style={{ color: '#2E2E2E', fontFamily: 'var(--font-nunito-sans)', opacity: 0.8 }}>
              We're excited to help you stay organized! Let's personalize your experience with a few quick questions.
            </p>

            {/* Start Button */}
            <button
              onClick={handleNext}
              className="w-full bg-[#5aa9e6] hover:bg-[#4a99d6] text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer"
              style={{ fontFamily: 'var(--font-manrope)' }}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    )
  }

  const renderProgressBar = () => {
    const currentQuestion = step
    // Calculate progress - show 100% when on last question (all questions answered)
    let progress = Math.round(((currentQuestion - 1) / TOTAL_STEPS) * 100)
    if (step === TOTAL_STEPS) {
      progress = 100
    }

    return (
      <div className="w-full mb-8">
        {/* Full width progress bar - taller */}
        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden mb-3">
          <div 
            className="h-full bg-[#5aa9e6] transition-all duration-300 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Question count and percentage below progress bar */}
        <div className="flex justify-between items-center">
          <div className="text-sm font-semibold text-[#2E2E2E]" style={{ fontFamily: 'var(--font-manrope)' }}>
            QUESTION {showCompletionScreen ? TOTAL_STEPS : currentQuestion} / {TOTAL_STEPS}
          </div>
          <div className="text-sm font-bold text-[#2E2E2E]" style={{ fontFamily: 'var(--font-manrope)' }}>
            {progress}% Completed
          </div>
        </div>
      </div>
    )
  }

  const renderCompletionScreen = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#FAFAF5] px-4">
        <div className="text-center">
          {/* Loading Animation - Lottie */}
          <div className="flex justify-center mb-8">
            <div className="w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
              <DotLottieReact
                src="https://lottie.host/041e37c8-795b-4ef5-b9c8-c87f071800d9/QWR1KQRuY6.lottie"
                loop
                autoplay
                speed={2.5}
              />
            </div>
          </div>
          
          <p className="text-3xl md:text-4xl text-[#2E2E2E] opacity-80 font-semibold" style={{ fontFamily: 'var(--font-nunito-sans)' }}>
            Setting up your dashboard...
          </p>
        </div>
      </div>
    )
  }

  const renderQuestion = () => {
    const questionNumber = step
    const questionImage = QUESTION_IMAGES[questionNumber - 1]
    const imageBgColor = IMAGE_BG_COLORS[questionNumber - 1]

    return (
      <div className={`w-full max-w-2xl mx-auto pt-[113px] transition-opacity duration-300 ease-in-out`} style={{ opacity: step === 1 && isTransitioning ? 0 : 1 }}>
        {/* Progress Bar */}
        {renderProgressBar()}

        {/* Question Content - Centered and more square */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-200">
          {/* Image with circular background - preloaded */}
          <div className="flex justify-center mb-8">
            <div 
              key={`question-${questionNumber}`}
              className="w-32 h-32 rounded-full flex items-center justify-center p-6"
              style={{ backgroundColor: imageBgColor }}
            >
              <Image
                key={`img-${questionNumber}`}
                src={questionImage}
                alt={`Question ${questionNumber} illustration`}
                width={80}
                height={80}
                className="object-contain"
                priority
                unoptimized
                loading="eager"
              />
            </div>
          </div>

          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="mt-10 flex justify-between items-center gap-4">
            <button
              onClick={handleBack}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium cursor-pointer"
              style={{ fontFamily: 'var(--font-manrope)' }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>

            <button
              onClick={handleNext}
              disabled={loading}
              className="flex items-center gap-2 px-8 py-3 rounded-lg bg-[#5aa9e6] hover:bg-[#4a99d6] text-white font-bold transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              style={{ fontFamily: 'var(--font-manrope)' }}
            >
              {loading ? (
                'Saving...'
              ) : step === TOTAL_STEPS ? (
                'Complete'
              ) : (
                <>
                  Next
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    )
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8" style={{ color: '#2E2E2E', fontFamily: 'var(--font-manrope)' }}>
              What college or university do you attend?
            </h2>
            <div className="relative">
              <input
                type="text"
                value={formData.collegeUniversity}
                onChange={(e) => {
                  setFormData({ ...formData, collegeUniversity: e.target.value })
                  // Clear selection when user starts typing
                  if (e.target.value !== selectedCollege) {
                    setSelectedCollege('')
                  }
                }}
                onFocus={() => {
                  // Show suggestions if we have them
                  if (collegeSuggestions.length > 0) {
                    setShowSuggestions(true)
                  }
                }}
                onBlur={() => {
                  // Delay to allow click on suggestion
                  setTimeout(() => setShowSuggestions(false), 200)
                }}
                placeholder="Search for your school"
                className="w-full rounded-lg border-2 border-gray-300 px-6 py-4 text-lg text-[#2E2E2E] focus:border-[#5aa9e6] focus:outline-none transition-colors"
                style={{ fontFamily: 'var(--font-nunito-sans)' }}
              />
              {searchingColleges && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <div className="w-5 h-5 border-2 border-[#5aa9e6] border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              {showSuggestions && collegeSuggestions.length > 0 && (
                <div className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {collegeSuggestions.map((college, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, collegeUniversity: college.name })
                        setSelectedCollege(college.name)
                        setShowSuggestions(false)
                        // Clear any errors when a valid selection is made
                        setErrors(prev => {
                          const newErrors = { ...prev }
                          delete newErrors.collegeUniversity
                          return newErrors
                        })
                      }}
                      className="w-full text-left px-6 py-3 hover:bg-[#5aa9e6]/10 transition-colors cursor-pointer border-b border-gray-100 last:border-b-0"
                      style={{ fontFamily: 'var(--font-nunito-sans)' }}
                    >
                      <div className="font-medium text-[#2E2E2E]">{college.name}</div>
                      <div className="text-sm text-gray-500">
                        {[college.stateProvince, college.country].filter(Boolean).join(', ') || college.country}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            {errors.collegeUniversity && (
              <p className="text-sm text-red-600 mt-2">{errors.collegeUniversity}</p>
            )}
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8" style={{ color: '#2E2E2E', fontFamily: 'var(--font-manrope)' }}>
              What major and/or minors are you studying?
            </h2>
            <input
              type="text"
              value={formData.majorMinors}
              onChange={(e) => setFormData({ ...formData, majorMinors: e.target.value })}
              placeholder="E.g., Computer Science, Minor in Business"
              className="w-full rounded-lg border-2 border-gray-300 px-6 py-4 text-lg text-[#2E2E2E] focus:border-[#5aa9e6] focus:outline-none transition-colors"
              style={{ fontFamily: 'var(--font-nunito-sans)' }}
            />
            {errors.majorMinors && (
              <p className="text-sm text-red-600 mt-2">{errors.majorMinors}</p>
            )}
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8" style={{ color: '#2E2E2E', fontFamily: 'var(--font-manrope)' }}>
              How many hours do you study per week?
            </h2>
            <input
              type="number"
              value={formData.studyHoursPerWeek}
              onChange={(e) => setFormData({ ...formData, studyHoursPerWeek: e.target.value })}
              placeholder="E.g., 20"
              min="0"
              className="w-full rounded-lg border-2 border-gray-300 px-6 py-4 text-lg text-[#2E2E2E] focus:border-[#5aa9e6] focus:outline-none transition-colors"
              style={{ fontFamily: 'var(--font-nunito-sans)' }}
            />
            {errors.studyHoursPerWeek && (
              <p className="text-sm text-red-600 mt-2">{errors.studyHoursPerWeek}</p>
            )}
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8" style={{ color: '#2E2E2E', fontFamily: 'var(--font-manrope)' }}>
              What is your main academic goal this year?
            </h2>
            <div className="space-y-3">
              {ACADEMIC_GOALS.map((goal) => (
                <label
                  key={goal.value}
                  className={`flex items-center p-5 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.mainAcademicGoal === goal.value
                      ? 'border-[#5aa9e6] bg-[#5aa9e6]/10'
                      : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="academicGoal"
                    value={goal.value}
                    checked={formData.mainAcademicGoal === goal.value}
                    onChange={(e) => setFormData({ ...formData, mainAcademicGoal: e.target.value as AcademicGoal })}
                    className="h-5 w-5 text-[#5aa9e6] focus:ring-[#5aa9e6] mr-4 cursor-pointer"
                  />
                  <span className="text-lg text-[#2E2E2E]" style={{ fontFamily: 'var(--font-nunito-sans)' }}>
                    {goal.label}
                  </span>
                </label>
              ))}
            </div>
            {formData.mainAcademicGoal === 'other' && (
              <div className="mt-4">
                <input
                  type="text"
                  value={formData.otherGoal}
                  onChange={(e) => setFormData({ ...formData, otherGoal: e.target.value })}
                  placeholder="Please specify your goal"
                  className="w-full rounded-lg border-2 border-gray-300 px-6 py-4 text-lg text-[#2E2E2E] focus:border-[#5aa9e6] focus:outline-none transition-colors"
                  style={{ fontFamily: 'var(--font-nunito-sans)' }}
                />
                {errors.otherGoal && (
                  <p className="text-sm text-red-600 mt-2">{errors.otherGoal}</p>
                )}
              </div>
            )}
            {errors.mainAcademicGoal && (
              <p className="text-sm text-red-600 mt-2">{errors.mainAcademicGoal}</p>
            )}
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8" style={{ color: '#2E2E2E', fontFamily: 'var(--font-manrope)' }}>
              Where did you hear about us?
            </h2>
            <input
              type="text"
              value={formData.whereHeardAboutUs}
              onChange={(e) => setFormData({ ...formData, whereHeardAboutUs: e.target.value })}
              placeholder="E.g., Friend, Social media, Google search"
              className="w-full rounded-lg border-2 border-gray-300 px-6 py-4 text-lg text-[#2E2E2E] focus:border-[#5aa9e6] focus:outline-none transition-colors"
              style={{ fontFamily: 'var(--font-nunito-sans)' }}
            />
            {errors.whereHeardAboutUs && (
              <p className="text-sm text-red-600 mt-2">{errors.whereHeardAboutUs}</p>
            )}
          </div>
        )

      default:
        return null
    }
  }

  // Show loading state while checking auth
  if (checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAFAF5] px-4 py-16">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#5aa9e6] border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Show completion screen
  if (showCompletionScreen) {
    return (
      <div className="min-h-screen bg-[#FAFAF5]">
        {renderCompletionScreen()}
      </div>
    )
  }

  return (
    <div className={step === 0 ? 'min-h-screen' : 'min-h-screen bg-[#FAFAF5]'} style={step === 0 ? { backgroundColor: '#c0d6e1' } : {}}>
      {renderNavbar()}
      <div className={step === 0 ? '' : 'px-4 py-8 md:py-16'}>
        {step === 0 ? renderWelcomeScreen() : renderQuestion()}
      </div>
    </div>
  )
}
