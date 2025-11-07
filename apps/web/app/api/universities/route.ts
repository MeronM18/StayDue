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
    
    console.log(`[Universities API] Fetching: ${apiUrl}`)

    // Fetch with timeout
    let response: Response
    try {
      response = await fetchWithTimeout(
        apiUrl,
        {
          headers: {
            'Accept': 'application/json',
          },
          cache: 'no-store',
        },
        8000 // 8 second timeout
      )
    } catch (fetchError: any) {
      console.error(`[Universities API] Fetch error for "${trimmedQuery}":`, fetchError.message)
      return NextResponse.json([])
    }

    if (!response.ok) {
      console.error(`[Universities API] HTTP ${response.status} for query: ${trimmedQuery}`)
      return NextResponse.json([])
    }

    let data: any
    try {
      data = await response.json()
    } catch (parseError) {
      console.error(`[Universities API] JSON parse error for "${trimmedQuery}":`, parseError)
      return NextResponse.json([])
    }

    // Ensure data is an array
    if (!Array.isArray(data)) {
      console.error(`[Universities API] Non-array response for "${trimmedQuery}":`, typeof data, data)
      return NextResponse.json([])
    }

    console.log(`[Universities API] Found ${data.length} results for "${trimmedQuery}"`)

    // Filter and format the results
    const suggestions = data
      .filter((uni: any) => uni && uni.name && typeof uni.name === 'string')
      .slice(0, 5)
      .map((uni: any) => ({
        name: uni.name.trim(),
        country: (uni.country || '').trim(),
      }))

    console.log(`[Universities API] Returning ${suggestions.length} formatted suggestions for "${trimmedQuery}"`)

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

