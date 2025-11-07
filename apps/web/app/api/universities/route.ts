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
    // Try HTTPS first, fallback to HTTP if needed
    const apiUrls = [
      `https://universities.hipolabs.com/search?name=${encodeURIComponent(trimmedQuery)}`,
      `http://universities.hipolabs.com/search?name=${encodeURIComponent(trimmedQuery)}`,
    ]
    
    let response: Response | null = null
    let lastError: any = null

    // Try both URLs
    for (const apiUrl of apiUrls) {
      console.log(`[Universities API] Trying: ${apiUrl}`)
      try {
        response = await fetchWithTimeout(
          apiUrl,
          {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
            },
            cache: 'no-store',
          },
          10000 // 10 second timeout
        )
        
        if (response.ok) {
          console.log(`[Universities API] Success with: ${apiUrl}`)
          break
        } else {
          console.log(`[Universities API] ${apiUrl} returned ${response.status}, trying next...`)
          response = null
        }
      } catch (fetchError: any) {
        console.log(`[Universities API] Error with ${apiUrl}:`, fetchError.message)
        lastError = fetchError
        response = null
        continue
      }
    }

    if (!response) {
      console.error(`[Universities API] All URLs failed for "${trimmedQuery}". Last error:`, lastError?.message)
      return NextResponse.json([])
    }

    console.log(`[Universities API] Response status: ${response.status} for "${trimmedQuery}"`)

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unable to read error')
      console.error(`[Universities API] HTTP ${response.status} for "${trimmedQuery}":`, errorText)
      return NextResponse.json([])
    }

    let data: any
    try {
      const responseText = await response.text()
      console.log(`[Universities API] Raw response length: ${responseText.length} chars`)
      data = JSON.parse(responseText)
    } catch (parseError: any) {
      console.error(`[Universities API] JSON parse error for "${trimmedQuery}":`, parseError.message)
      return NextResponse.json([])
    }

    // Ensure data is an array
    if (!Array.isArray(data)) {
      console.error(`[Universities API] Non-array response for "${trimmedQuery}":`, typeof data, JSON.stringify(data).substring(0, 200))
      return NextResponse.json([])
    }

    console.log(`[Universities API] Found ${data.length} raw results for "${trimmedQuery}"`)

    // Filter and format the results - be less strict with filtering
    const suggestions = data
      .filter((uni: any) => {
        // More lenient filtering
        if (!uni) return false
        if (!uni.name) return false
        return typeof uni.name === 'string' && uni.name.trim().length > 0
      })
      .slice(0, 5)
      .map((uni: any) => ({
        name: uni.name.trim(),
        country: (uni.country || '').trim(),
        stateProvince: (uni['state-province'] || '').trim(),
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

