import { NextRequest, NextResponse } from 'next/server'

// Configure runtime - use nodejs for better fetch compatibility
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Add timeout helper
function fetchWithTimeout(url: string, options: RequestInit, timeout = 10000): Promise<Response> {
  return Promise.race([
    fetch(url, options),
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), timeout)
    ),
  ])
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('name')

    if (!query || query.trim().length < 1) {
      return NextResponse.json(
        { error: 'Query parameter "name" is required' },
        { status: 400 }
      )
    }

    const trimmedQuery = query.trim()
    const apiUrl = `https://universities.hipolabs.com/search?name=${encodeURIComponent(trimmedQuery)}`

    // Fetch with timeout
    const response = await fetchWithTimeout(
      apiUrl,
      {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'StayDue/1.0',
        },
        // Add cache control
        cache: 'no-store',
      },
      8000 // 8 second timeout
    )

    if (!response.ok) {
      console.error(`University API returned ${response.status} for query: ${trimmedQuery}`)
      return NextResponse.json(
        { error: `API error: ${response.status}`, suggestions: [] },
        { status: 200 } // Return 200 with empty suggestions instead of error
      )
    }

    const data = await response.json()

    // Ensure data is an array
    if (!Array.isArray(data)) {
      console.error('University API returned non-array data:', typeof data)
      return NextResponse.json([]) // Return empty array instead of error
    }

    // Filter and format the results
    const suggestions = data
      .filter((uni: any) => uni && uni.name && typeof uni.name === 'string')
      .slice(0, 5)
      .map((uni: any) => ({
        name: uni.name.trim(),
        country: (uni.country || '').trim(),
      }))

    return NextResponse.json(suggestions, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
  } catch (error: any) {
    console.error('Error fetching universities:', error)
    // Return empty array instead of error to prevent UI breaking
    return NextResponse.json([], {
      status: 200,
    })
  }
}

