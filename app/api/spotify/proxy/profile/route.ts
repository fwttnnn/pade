import api from '@/lib/spotify/api'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (request: NextRequest) => {
  const token = request.cookies.get("sptfw--cookie:token")?.value
  if (!token) return NextResponse.json({})

  const profile = await api.profile(token)
  return NextResponse.json(profile)
}
