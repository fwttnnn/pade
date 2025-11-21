import Link from "next/link"

import Chart from "@/components/Chart"
import spotify from "@/data/spotify"

export default () => {
  return (
    <main>
      <div
        className="flex flex-col gap-[24px]"
      >
        <h1
          className="text-6xl text-center"
        >
          spotify wrapped
        </h1>
        <div
          className="flex flex-col items-center justify-center"
        >
          <Chart.Spotify
            data={spotify}
          />
        </div>

        <br />
        <br />
        <br />

        <Link href="/api/spotify/auth">
          login (do not)
        </Link>
        {/* <p
          className="text-center text-slate-700"
        >
          data: {" "}
          <Link
            href="https://developer.spotify.com"
            target="_blank"
          >
            developer.spotify.com
          </Link> | author: github.com/fwttnnn
        </p> */}
      </div>
    </main>
  )
}
