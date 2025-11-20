import Chart from "@/components/Chart"

import pade from "@/data/pade"
import spotify from "@/data/spotify"
import transjakarta from "@/data/transjakarta"

export default () => {
  return (
    <main>
      <div
        className="flex flex-col gap-[24px] flex-wrap items-center justify-center"
      >
        <h1
          className="text-6xl z-10"
        >
          spotify wrapped
        </h1>

        <Chart.Spotify
          data={spotify}
        />
      </div>
    </main>
  )
}
