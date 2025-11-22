import { NextRequest, NextResponse } from "next/server"
import pkce from "@/lib/spotify/pkce"

export const GET = async (request: NextRequest) => {
  const _url = new URL(request.url)
  const code = _url.searchParams.get("code")!

  if (code) {
    const verifier = request.cookies.get("sptfw--cookie:verifier")?.value
    const token = await pkce.getToken(process.env.SPTFW_API_CID!, code, verifier!, "http://127.0.0.1:3000/api/spotify/auth")

    const response = NextResponse.redirect("http://127.0.0.1:3000")
    response.cookies.set("sptfw--cookie:token", token["access_token"], {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    })

    return response
  }

  const scopes = ["playlist-read-private",
                  "playlist-read-collaborative",
                  "user-top-read",
                  // "user-read-recently-played",
                  "user-library-read"]

  const verifier = pkce.generateCodeVerifier(128);
  const challenge = await pkce.generateCodeChallenge(verifier);

  const spotifyAuthorizeURL = await pkce.generateAuthorizeURL(process.env.SPTFW_API_CID!,
                                              "http://127.0.0.1:3000/api/spotify/auth",
                                              scopes,
                                              challenge)

  const response = NextResponse.redirect(spotifyAuthorizeURL)
  response.cookies.set("sptfw--cookie:verifier", verifier, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  })

  return response
}
