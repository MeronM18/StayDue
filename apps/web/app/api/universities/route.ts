import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('name')

  if (!query || query.trim().length < 1) {
    return NextResponse.json(
      { error: 'Query parameter "name" is required' },
      { status: 400 }
    )
  }

  try {
    const response = await fetch(
      `https://universities.hipolabs.com/search?name=${encodeURIComponent(query.trim())}`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    )

    if (!response.ok) {
      return NextResponse.json(
        { error: `API error: ${response.status}` },
        { status: response.status }
      )
    }

    const data = await response.json()

    // Ensure data is an array
    if (!Array.isArray(data)) {
      return NextResponse.json(
        { error: 'Invalid API response format' },
        { status: 500 }
      )
    }

    // Filter and format the results
    const suggestions = data
      .filter((uni: any) => uni && uni.name && typeof uni.name === 'string')
      .slice(0, 5)
      .map((uni: any) => ({
        name: uni.name.trim(),
        country: (uni.country || '').trim(),
      }))

    return NextResponse.json(suggestions)
  } catch (error) {
    console.error('Error fetching universities:', error)
    return NextResponse.json(
      { error: 'Failed to fetch universities' },
      { status: 500 }
    )
  }
}

