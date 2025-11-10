import { NextRequest, NextResponse } from 'next/server'

// Configure runtime - use nodejs for better fetch compatibility
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Comprehensive list of common majors and minors
const MAJORS_AND_MINORS = [
  // Business & Economics
  'Accounting', 'Business Administration', 'Business Analytics', 'Economics', 'Finance',
  'Marketing', 'Management', 'Management Information Systems', 'Supply Chain Management',
  'Entrepreneurship', 'International Business', 'Real Estate', 'Human Resources',
  
  // Engineering
  'Aerospace Engineering', 'Biomedical Engineering', 'Chemical Engineering', 'Civil Engineering',
  'Computer Engineering', 'Electrical Engineering', 'Environmental Engineering', 'Industrial Engineering',
  'Mechanical Engineering', 'Software Engineering', 'Systems Engineering', 'Materials Science',
  
  // Computer Science & Technology
  'Computer Science', 'Information Technology', 'Information Systems', 'Cybersecurity',
  'Data Science', 'Artificial Intelligence', 'Machine Learning', 'Web Development',
  'Game Design', 'Computer Graphics', 'Network Administration', 'Database Management',
  
  // Natural Sciences
  'Biology', 'Chemistry', 'Physics', 'Mathematics', 'Statistics', 'Biochemistry',
  'Biophysics', 'Environmental Science', 'Geology', 'Astronomy', 'Meteorology',
  'Marine Science', 'Neuroscience', 'Genetics', 'Microbiology',
  
  // Social Sciences
  'Psychology', 'Sociology', 'Anthropology', 'Political Science', 'International Relations',
  'Criminal Justice', 'Social Work', 'Public Policy', 'Urban Studies', 'Geography',
  'History', 'Economics', 'Linguistics', 'Communication Studies',
  
  // Humanities
  'English', 'Literature', 'Philosophy', 'Religious Studies', 'Classics',
  'Comparative Literature', 'Creative Writing', 'Journalism', 'Media Studies',
  'Film Studies', 'Theater', 'Art History', 'Music', 'Dance',
  
  // Arts & Design
  'Fine Arts', 'Graphic Design', 'Industrial Design', 'Fashion Design', 'Interior Design',
  'Architecture', 'Photography', 'Animation', 'Digital Media', 'Visual Arts',
  
  // Health Sciences
  'Pre-Medicine', 'Pre-Dentistry', 'Pre-Pharmacy', 'Nursing', 'Public Health',
  'Health Sciences', 'Kinesiology', 'Exercise Science', 'Nutrition', 'Physical Therapy',
  'Occupational Therapy', 'Radiology', 'Medical Laboratory Science',
  
  // Education
  'Education', 'Elementary Education', 'Secondary Education', 'Special Education',
  'Early Childhood Education', 'Educational Psychology', 'Curriculum and Instruction',
  
  // Agriculture & Environment
  'Agriculture', 'Agricultural Business', 'Animal Science', 'Plant Science',
  'Environmental Studies', 'Forestry', 'Wildlife Management', 'Sustainability',
  
  // Other
  'Liberal Arts', 'General Studies', 'Undecided', 'Pre-Law', 'Pre-Veterinary',
  'Aviation', 'Culinary Arts', 'Hospitality Management', 'Tourism', 'Sports Management',
  'Athletic Training', 'Recreation Management', 'Paralegal Studies', 'Legal Studies',
]

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('name')

    if (!query || query.trim().length < 1) {
      return NextResponse.json([])
    }

    const trimmedQuery = query.trim().toLowerCase()
    
    // Filter majors/minors that match the query
    const suggestions = MAJORS_AND_MINORS
      .filter(major => major.toLowerCase().includes(trimmedQuery))
      .slice(0, 10) // Limit to top 10 results
      .map(major => ({
        name: major,
      }))

    return NextResponse.json(suggestions, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
  } catch (error: any) {
    console.error('Error fetching majors:', error)
    return NextResponse.json([], {
      status: 200,
    })
  }
}

