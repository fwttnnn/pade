import { NextRequest, NextResponse } from 'next/server'

export const GET = async (request: NextRequest) => {
  const token = request.cookies.get("sptfw--cookie:token")?.value

  const timeRange = "short_term"
  // const timeRange = "medium_term"
  // const timeRange = "long_term"

  const params = new URLSearchParams();
  params.append("time_range", timeRange);
  params.append("limit", String(50));
  params.append("offset", String(50));

  const result = await fetch(`https://api.spotify.com/v1/me/top/tracks?${params.toString()}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    },
  })

  const json = await result.json()
  return NextResponse.json(json)
}
