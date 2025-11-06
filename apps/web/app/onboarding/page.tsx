'use client'

import { createClient } from '@/lib/supabase/client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

type AcademicGoal = 
  | 'maintain_gpa'
  | 'improve_gpa'
  | 'graduate_on_time'
  | 'get_into_grad_school'
  | 'land_internship'
  | 'other'

const ACADEMIC_GOALS: { value: AcademicGoal; label: string }[] = [
  { value: 'maintain_gpa', label: 'Maintain my current GPA' },
  { value: 'improve_gpa', label: 'Improve my GPA' },
  { value: 'graduate_on_time', label: 'Graduate on time' },
  { value: 'get_into_grad_school', label: 'Get into grad school' },
  { value: 'land_internship', label: 'Land an internship' },
  { value: 'other', label: 'Other' },
]

export default function OnboardingPage() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [step, setStep] = useState(1)
  
  const [formData, setFormData] = useState({
    collegeUniversity: '',
    majorMinors: '',
    studyHoursPerWeek: '',
    mainAcademicGoal: '' as AcademicGoal | '',
    otherGoal: '',
    whereHeardAboutUs: '',
    inviteCode: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Remove notebook theme on onboarding page
  useEffect(() => {
    // Hide red line and remove notebook background
    const style = document.createElement('style')
    style.setAttribute('data-onboarding-styles', 'true')
    style.textContent = `
      body::before {
        display: none !important;
      }
      body {
        background-color: #ffffff !important;
        background-image: none !important;
      }
    `
    document.head.appendChild(style)

    return () => {
      // Cleanup: remove style when component unmounts
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
          // Not authenticated - redirect to home
          router.push('/')
          return
        }

        // Check if onboarding already completed
        const { data: profile } = await supabase
          .from('profiles')
          .select('onboarding_completed')
          .eq('id', user.id)
          .single()

        if (profile?.onboarding_completed) {
          // Already completed - redirect to dashboard
          router.push('/dashboard')
          return
        }

        // User is authenticated and onboarding not completed - allow access
        setCheckingAuth(false)
      } catch (error) {
        console.error('Error checking auth:', error)
        router.push('/')
      }
    }

    checkAuthAndOnboarding()
  }, [router, supabase])

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {}

    if (currentStep === 1) {
      if (!formData.collegeUniversity.trim()) {
        newErrors.collegeUniversity = 'Please enter your college or university'
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
    if (validateStep(step)) {
      if (step < 6) {
        setStep(step + 1)
      } else {
        handleSubmit()
      }
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = async () => {
    if (!validateStep(6)) return

    try {
      setLoading(true)

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/')
        return
      }

      // Prepare the goal value
      const goalValue = formData.mainAcademicGoal === 'other' 
        ? formData.otherGoal 
        : formData.mainAcademicGoal

      // Update profile with onboarding data
      const { data, error } = await supabase
        .from('profiles')
        .update({
          college_university: formData.collegeUniversity.trim(),
          major_minors: formData.majorMinors.trim(),
          study_hours_per_week: parseInt(formData.studyHoursPerWeek),
          main_academic_goal: goalValue,
          where_heard_about_us: formData.whereHeardAboutUs.trim(),
          invite_code: formData.inviteCode.trim() || null,
          used_invite_code: !!formData.inviteCode.trim(),
          onboarding_completed: true,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)
        .select()

      if (error) {
        console.error('Error saving onboarding:', error)
        alert(`Error saving your information: ${error.message}. Please try again.`)
        return
      }

      if (!data || data.length === 0) {
        console.error('No profile found to update')
        alert('Error: Profile not found. Please try signing in again.')
        router.push('/')
        return
      }

      // Successfully saved - redirect to dashboard
      router.push('/dashboard')
      router.refresh()
    } catch (error) {
      console.error('Unexpected error:', error)
      alert('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              What college or university do you attend?
            </h2>
            <input
              type="text"
              value={formData.collegeUniversity}
              onChange={(e) => setFormData({ ...formData, collegeUniversity: e.target.value })}
              placeholder="e.g., University of California, Berkeley"
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            {errors.collegeUniversity && (
              <p className="text-sm text-red-600">{errors.collegeUniversity}</p>
            )}
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              What major and/or minors are you studying?
            </h2>
            <input
              type="text"
              value={formData.majorMinors}
              onChange={(e) => setFormData({ ...formData, majorMinors: e.target.value })}
              placeholder="e.g., Computer Science, Minor in Business"
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            {errors.majorMinors && (
              <p className="text-sm text-red-600">{errors.majorMinors}</p>
            )}
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              How many hours do you study per week?
            </h2>
            <input
              type="number"
              value={formData.studyHoursPerWeek}
              onChange={(e) => setFormData({ ...formData, studyHoursPerWeek: e.target.value })}
              placeholder="e.g., 20"
              min="0"
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            {errors.studyHoursPerWeek && (
              <p className="text-sm text-red-600">{errors.studyHoursPerWeek}</p>
            )}
          </div>
        )

      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              What is your main academic goal this year?
            </h2>
            <div className="space-y-3">
              {ACADEMIC_GOALS.map((goal) => (
                <label
                  key={goal.value}
                  className="flex items-center space-x-3 rounded-md border border-gray-300 p-4 cursor-pointer hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  <input
                    type="radio"
                    name="academicGoal"
                    value={goal.value}
                    checked={formData.mainAcademicGoal === goal.value}
                    onChange={(e) => setFormData({ ...formData, mainAcademicGoal: e.target.value as AcademicGoal })}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span className="text-gray-900 dark:text-white">{goal.label}</span>
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
                  className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
                {errors.otherGoal && (
                  <p className="mt-2 text-sm text-red-600">{errors.otherGoal}</p>
                )}
              </div>
            )}
            {errors.mainAcademicGoal && (
              <p className="text-sm text-red-600">{errors.mainAcademicGoal}</p>
            )}
          </div>
        )

      case 5:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Where did you hear about us?
            </h2>
            <input
              type="text"
              value={formData.whereHeardAboutUs}
              onChange={(e) => setFormData({ ...formData, whereHeardAboutUs: e.target.value })}
              placeholder="e.g., Friend, Social media, Google search"
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            {errors.whereHeardAboutUs && (
              <p className="text-sm text-red-600">{errors.whereHeardAboutUs}</p>
            )}
          </div>
        )

      case 6:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Do you have an invite code? (Optional)
            </h2>
            <input
              type="text"
              value={formData.inviteCode}
              onChange={(e) => setFormData({ ...formData, inviteCode: e.target.value })}
              placeholder="Enter invite code if you have one"
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Leave blank if you don't have one
            </p>
          </div>
        )

      default:
        return null
    }
  }

  // Show loading state while checking auth
  if (checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white px-4 py-16">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 py-16">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">Welcome to StayDue!</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Let's get to know you better ({step} of 6)
          </p>
        </div>

        <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
          {renderStep()}

          <div className="mt-8 flex justify-between">
            <button
              onClick={handleBack}
              disabled={step === 1 || loading}
              className="rounded-md border border-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={loading}
              className="rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : step === 6 ? 'Complete' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

