import React from "react";

import * as d3 from "d3";
import tj from "@/data/transjakarta"

export type Args = {
  data: any,
  width?: number,
  height?: number,
} & React.SVGProps<SVGSVGElement>

// 1B
// 1F
// 1R
// 2B
// 2H
// T31

export const a = ({ data, width = 500, height = 500, ...svgProps }: Args) => {
  const margin = 5

  // Pick a route
  const routeId = "S22"; // example route
  const route = tj.routes.find(r => r.route_id === routeId);
  if (!route) throw new Error("Route not found");

  // Pick one trip to get the shape
  const trip = tj.trips.find(t => t.route_id === routeId);
  if (!trip) throw new Error("Trip not found");

  const shapeId = trip.shape_id;

  // Get all points for this shape
  const shapePoints = tj.shapes
    .filter(s => s.shape_id === shapeId)
    .sort((a, b) => a.shape_pt_sequence - b.shape_pt_sequence);

  // Get all stops for this route
    const stopIds = tj.stoptimes
    .filter(s => s.trip_id == trip.trip_id)
    .map(s => s.stop_id)

  const routeStops = tj.stops.filter(s => stopIds.includes(s.stop_id))

  // Build the routeShape as a single Feature with GeometryCollection
  const routeShape = {
    type: "Feature",
    geometry: {
      type: "GeometryCollection",
      geometries: [
        {
          type: "LineString",
          coordinates: shapePoints.map(p => [p.shape_pt_lon, p.shape_pt_lat])
        },
        // ...routeStops.map(s => ({
        //   type: "Point",
        //   coordinates: [s.stop_lon, s.stop_lat]
        // }))
      ]
    },
    properties: {
      route_id: route.route_id,
      route_name: route.route_long_name || route.route_short_name,
      route_color: route.route_color
    }
  };

  const projection = d3.geoMercator()
    .fitExtent([[margin, margin], [width - margin, height - margin]], routeShape)

  const pathGenerator = d3.geoPath().projection(projection)

  const margin2 = margin * 3
  const projection2 = d3.geoMercator()
    .fitExtent([[margin2, margin2], [width - margin2, height - margin2]], routeShape)

  const pathGenerator2 = d3.geoPath().projection(projection2)

  const margin3 = margin * 5
  const projection3 = d3.geoMercator()
    .fitExtent([[margin3, margin3], [width - margin3, height - margin3]], routeShape)

  const pathGenerator3 = d3.geoPath().projection(projection3)

  return (
    <svg width={width} height={height} {...svgProps}>
      <path
        fill="none"
        strokeWidth={2}
        stroke="#00aeffff"
        d={pathGenerator(routeShape)}
      />
      <path
        fill="none"
        strokeWidth={2}
        stroke="#e600ffff"
        d={pathGenerator2(routeShape)}
      />
      <path
        fill="none"
        strokeWidth={2}
        stroke="#ff002bff"
        d={pathGenerator3(routeShape)}
      />
      <text
        x={width / 2}
        y={height / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={48}
        fill="rgba(255, 255, 255, 0.35)"
      >
        {/* {routeShape.properties.route_name} */}
        {/* transjakarta routes */}
      </text>
    </svg>
  )
}

export const b = ({ data, width = 500, height = 500, ...svgProps }: Args) => {
  const margin = 5

  // Pick a route
  const routeId = "1R"; // example route
  const route = tj.routes.find(r => r.route_id === routeId);
  if (!route) throw new Error("Route not found");

  // Pick one trip to get the shape
  const trip = tj.trips.find(t => t.route_id === routeId);
  if (!trip) throw new Error("Trip not found");

  const shapeId = trip.shape_id;

  // Get all points for this shape
  const shapePoints = tj.shapes
    .filter(s => s.shape_id === shapeId)
    .sort((a, b) => a.shape_pt_sequence - b.shape_pt_sequence);

  // Get all stops for this route
  const stopIds = tj.stoptimes
    .filter(s => s.trip_id == trip.trip_id)
    .map(s => s.stop_id)

  const routeStops = tj.stops.filter(s => stopIds.includes(s.stop_id))

  // Build the routeShape as a single Feature with GeometryCollection
  const routeShape = {
    type: "Feature",
    geometry: {
      type: "GeometryCollection",
      geometries: [
        {
          type: "LineString",
          coordinates: shapePoints.map(p => [p.shape_pt_lon, p.shape_pt_lat])
        },
        // ...routeStops.map(s => ({
        //   type: "Point",
        //   coordinates: [s.stop_lon, s.stop_lat]
        // }))
      ]
    },
    properties: {
      route_id: route.route_id,
      route_name: route.route_long_name || route.route_short_name,
      route_color: route.route_color
    }
  };

  const projection = d3.geoMercator()
    .fitExtent([[margin, margin], [width - margin, height - margin]], routeShape)

  const pathGenerator = d3.geoPath().projection(projection)

  const projectedStops = routeStops.map(s => projection([s.stop_lon, s.stop_lat]));

  return (
    <svg width={width} height={height} {...svgProps}>
      <path
        fill="none"
        strokeWidth={2}
        stroke="#00aeffff"
        d={pathGenerator(routeShape)}
      />

      {projectedStops.map(([x, y], i) => (
        <g key={i}>
          <circle
            cx={x}
            cy={y}
            r={4}
            fill="#467bffff"
            stroke="#fff"
            strokeWidth={.7}
          />
          <text
            x={x - 15}
            y={y - 5}
            fontSize={8}
            fill="#a5a5a5ff"
          >
            {routeStops[i].stop_id}
          </text>
        </g>
      ))}
    </svg>
  )
}

export const c = ({ data, width = 500, height = 500, ...svgProps }: Args) => {
  const margin = 10

  // Pick a route
  const routeId = "1R"; // example route
  const route = tj.routes.find(r => r.route_id === routeId);
  if (!route) throw new Error("Route not found");

  // Pick one trip to get the shape
  const trip = tj.trips.find(t => t.route_id === routeId);
  if (!trip) throw new Error("Trip not found");

  const shapeId = trip.shape_id;

  // Get all points for this shape
  const shapePoints = tj.shapes
    .filter(s => s.shape_id === shapeId)
    .sort((a, b) => a.shape_pt_sequence - b.shape_pt_sequence);

  // Get all stops for this route
  const stopIds = tj.stoptimes
    .filter(s => s.trip_id == trip.trip_id)
    .map(s => s.stop_id)

  const routeStops = tj.stops.filter(s => stopIds.includes(s.stop_id))

  // Build the routeShape as a single Feature with GeometryCollection
  const routeShape = {
    type: "Feature",
    geometry: {
      type: "GeometryCollection",
      geometries: [
        {
          type: "LineString",
          coordinates: shapePoints.map(p => [p.shape_pt_lon, p.shape_pt_lat])
        },
        // ...routeStops.map(s => ({
        //   type: "Point",
        //   coordinates: [s.stop_lon, s.stop_lat]
        // }))
      ]
    },
    properties: {
      route_id: route.route_id,
      route_name: route.route_long_name || route.route_short_name,
      route_color: route.route_color
    }
  };

  const projection = d3.geoMercator()
    .fitExtent([[margin, margin], [width - margin, height - margin]], routeShape)

  const pathGenerator = d3.geoPath().projection(projection)

  const projectedStops = routeStops.map(s => projection([s.stop_lon, s.stop_lat]));

  const margin2 = margin + 9
  const projection2 = d3.geoMercator()
    .fitExtent([[margin2, margin2], [width - margin2, height - margin2]], routeShape)

  const pathGenerator2 = d3.geoPath().projection(projection2)

  const margin3 = margin + 18
  const projection3 = d3.geoMercator()
    .fitExtent([[margin3, margin3], [width - margin3, height - margin3]], routeShape)

  const pathGenerator3 = d3.geoPath().projection(projection3)


  return (
    <svg width={width} height={height} {...svgProps}>
      <path
        fill="none"
        strokeWidth={2}
        stroke="#00aeffff"
        d={pathGenerator(routeShape)}
      />
      <path
        fill="none"
        strokeWidth={2}
        stroke="#e600ffff"
        d={pathGenerator2(routeShape)}
      />
      <path
        fill="none"
        strokeWidth={2}
        stroke="#ff002bff"
        d={pathGenerator3(routeShape)}
      />

      {projectedStops.map(([x, y], i) => (
        <g key={i}>
          <circle
            cx={x}
            cy={y}
            r={4}
            fill="#0fbbeaff"
            stroke="#e3e3e3ff"
            strokeWidth={.7}
          />
          <text
            x={x - 15}
            y={y - 5}
            fontSize={8}
            fill="#afff7dff"
          >
            {routeStops[i].stop_id}
          </text>
        </g>
      ))}
    </svg>
  )
}

export const d = ({ data, width = 500, height = 500, ...svgProps }: Args) => {
  const margin = 5

  const _ = (id) => {
    // Pick a route
    const routeId = id; // example route
    const route = tj.routes.find(r => r.route_id === routeId);
    if (!route) throw new Error("Route not found");

    // Pick one trip to get the shape
    const trip = tj.trips.find(t => t.route_id === routeId);
    if (!trip) throw new Error("Trip not found");

    const shapeId = trip.shape_id;

    // Get all points for this shape
    const shapePoints = tj.shapes
      .filter(s => s.shape_id === shapeId)
      .sort((a, b) => a.shape_pt_sequence - b.shape_pt_sequence);

    // Get all stops for this route
    const stopIds = tj.stoptimes
      .filter(s => s.trip_id == trip.trip_id)
      .map(s => s.stop_id)

    const routeStops = tj.stops.filter(s => stopIds.includes(s.stop_id))

    // Build the routeShape as a single Feature with GeometryCollection
    const routeShape = {
      type: "Feature",
      geometry: {
        type: "GeometryCollection",
        geometries: [
          {
            type: "LineString",
            coordinates: shapePoints.map(p => [p.shape_pt_lon, p.shape_pt_lat])
          },
          // ...routeStops.map(s => ({
          //   type: "Point",
          //   coordinates: [s.stop_lon, s.stop_lat]
          // }))
        ]
      },
      properties: {
        route_id: route.route_id,
        route_name: route.route_long_name || route.route_short_name,
        route_color: route.route_color
      }
    };

    const projection = d3.geoMercator()
      .fitExtent([[margin, margin], [width - margin, height - margin]], routeShape)

    const pathGenerator = d3.geoPath().projection(projection)

    const projectedStops = routeStops.map(s => projection([s.stop_lon, s.stop_lat]));

    const margin2 = margin * 3
    const projection2 = d3.geoMercator()
      .fitExtent([[margin2, margin2], [width - margin2, height - margin2]], routeShape)

    const pathGenerator2 = d3.geoPath().projection(projection2)

    const margin3 = margin * 5
    const projection3 = d3.geoMercator()
      .fitExtent([[margin3, margin3], [width - margin3, height - margin3]], routeShape)

    const pathGenerator3 = d3.geoPath().projection(projection3)

    return [routeShape, [pathGenerator, pathGenerator2, pathGenerator3], projectedStops, routeStops]
  }


// 1B
// 1F
// 1R
// 2B
// 2H
// T31

  const _a: any = _("1R")
  const _b: any = _("T31")

  return (
    <svg width={width} height={height} {...svgProps}>
      <path
        fill="none"
        strokeWidth={2}
        stroke="#00aeffff"
        d={_a[1][0](_a[0])}
      />
      <path
        fill="none"
        strokeWidth={2}
        stroke="#e600ffff"
        d={_a[1][1](_a[0])}
      />
      <path
        fill="none"
        strokeWidth={2}
        stroke="#ff002bff"
        d={_a[1][2](_a[0])}
      />

      {_a[2].map(([x, y], i) => (
        <g key={i}>
          <circle
            cx={x}
            cy={y}
            r={4}
            fill="#467bffff"
            stroke="#fff"
            strokeWidth={.7}
          />
          <text
            x={x - 15}
            y={y - 5}
            fontSize={8}
            fill="#a5a5a5ff"
          >
            {_a[3][i].stop_id}
          </text>
        </g>
      ))}

      <path
        fill="none"
        strokeWidth={2}
        stroke="#00aeffff"
        d={_b[1][0](_b[0])}
      />
      <path
        fill="none"
        strokeWidth={2}
        stroke="#e600ffff"
        d={_b[1][1](_b[0])}
      />
      <path
        fill="none"
        strokeWidth={2}
        stroke="#ff002bff"
        d={_b[1][2](_b[0])}
      />

      {_b[2].map(([x, y], i) => (
        <g key={i}>
          <circle
            cx={x}
            cy={y}
            r={4}
            fill="#467bffff"
            stroke="#fff"
            strokeWidth={.7}
          />
          <text
            x={x - 15}
            y={y - 5}
            fontSize={8}
            fill="#a5a5a5ff"
          >
            {_b[3][i].stop_id}
          </text>
        </g>
      ))}
    </svg>
  )
}

export default c
