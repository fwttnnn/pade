"use client"

import gsap from "gsap";
import { useRef } from "react"

import * as d3 from "d3";
import spotify from "@/data/spotify";

import useTooltip from "@/hooks/useTooltip";

export type Args = {
  data: typeof spotify,
  size?: number,
  width?: number,
  height?: number,
}

export default ({ data, width = 500, height = 1000 }: Args) => {
  data.items.sort((t) => t.popularity)
  const setTooltip = useTooltip((state) => state.setTooltip)

  const margin = { top: 40, right: 15, bottom: 40, left: 15 }
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  const range = d3.range(0, 100 + 1, 10)
  const p = d3.scaleQuantize()
    .domain([range[0], range[range.length - 1]])
    .range(range)

  const x = d3.scaleLinear()
    .domain([range[0], range[range.length - 1]])
    .range([0, innerWidth])

  return (
    <>
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <line
            x1={0}
            y1={0}
            x2={innerWidth}
            y2={0}
            stroke="currentColor"
          />

          {range.map((r: number) => {
            const rectSize = 43
            const rectSpacing = 4

            const tracks = data.items
              .filter((t) => p(t.popularity) === r)
              .toSorted((a, b) => a.album.artists[0].name.localeCompare(b.album.artists[0].name))

            return (
              <g
                key={`${r}-root`}
              >
                {tracks.map((t, i) => {
                  const ref = useRef<SVGImageElement | null>(null)

                  const handleMouseEnter = () => {
                    setTooltip(true, t)

                    if (!ref.current) {
                      return
                    }

                    gsap.to(ref.current, {
                      scale: 0.8,
                      duration: 0.3,
                      ease: "power3.out",
                      transformOrigin: "50% 50%",
                    })
                  }

                  const handleMouseLeave = () => {
                    setTooltip(false, t)

                    if (!ref.current) {
                      return
                    }

                    gsap.to(ref.current, {
                      scale: 1,
                      duration: 1.0,
                      ease: "power3.out",
                      transformOrigin: "50% 50%",
                    })
                  }

                  return (
                    <g
                      key={`${r}-high-${t}-${i}`}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <rect
                        fill="transparent"
                        stroke="white"
                        strokeWidth={0}
                        x={x(r) - rectSize / 2}
                        y={15 + i * (rectSize + rectSpacing)}
                        width={rectSize}
                        height={rectSize}
                      />
                      <image
                        ref={ref}
                        href={t.album.images[0].url}
                        x={x(r) - rectSize / 2}
                        y={15 + i * (rectSize + rectSpacing)}
                        width={rectSize}
                        height={rectSize}
                        preserveAspectRatio="xMidYMid slice"
                        // preserveAspectRatio="cover"
                      />
                    </g>
                  )
                })}

                <circle
                  stroke="white"
                  cx={x(r)}
                  cy={0}
                  r={4}
                  fill="black"
                />
                <text
                  x={x(r)}
                  y={-10}
                  textAnchor="middle"
                  fill="#fff"
                  fontSize={12}
                >
                  {r === 0 ? "00" : r}
                </text>
              </g>
            )
          })}
        </g>
      </svg>
    </>
  )
}
