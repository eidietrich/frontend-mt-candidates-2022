import React from 'react'
import { css } from '@emotion/react'

import { geoPath, geoMercator } from 'd3-geo'

// Adapt SVG-based mapping rig from ... https://observablehq.com/@eidietrich/geojson-mapping-rig
// TODO
// - Custom marker logic
// - Add click/tooltip interactivity options

/* Usage

counties and cities are shape and point geojson files, respectively

<Map
        layers={[
          new FeatureLayer({
            key: 'counties',
            geodata: counties,
            featureStyle: {
              // fill: d => d.NAME === 'GALLATIN' ? 'red' : 'blue'
            }
          }),
          new PointLayer({
            key: 'cities',
            geodata: cities,
            labelStyle: {
              text: d => d.NAME,
              dx: d => d.offset ? d.offset[0] : '0.5em',
              dy: d => d.offset ? d.offset[1] : '0.5em',
            }
          })
        ]}
      />

*/

export class Map extends React.Component {
    render() {
        const {
            layers,
            height,
            width,
            margin,
            projection,
            backgroundColor,
            fontFamily,
            fontSize,
            textAnchor,
        } = this.props

        if (layers.length === 0) throw 'No layers provided to map'

        const plotWidth = width - margin.right - margin.left
        const plotHeight = height - margin.top - margin.bottom

        // Fit map based on first layer (i.e. base layer)
        projection.fitSize([plotWidth, plotHeight], layers[0].geodata)

        const plot = <g transform={`translate(${margin.left},${margin.bottom})`}>
            {
                layers.map(layer => layer.plot(projection))
            }
        </g>

        return <svg
            width={width}
            height={height}
            fontFamily={fontFamily}
            fontSize={fontSize}
            textAnchor={textAnchor}
            style={{
                backgroundColor: backgroundColor,
                height: 'auto'
            }}>
            {plot}
        </svg>
    }

    static defaultProps = {
        height: 600,
        width: 800,
        margin: { top: 10, left: 40, right: 40, bottom: 10 },
        projection: geoMercator(),
        backgroundColor: '#fff',
        fontFamily: 'Arial, sans-serif',
        fontSize: 10,
        textAnchor: 'middle'
    }
}

const FEATURE_DEFAULT_STYLE = {
    opacity: d => 1,
    fill: d => '#ddd',
    fillOpacity: d => 1,
    stroke: d => '#fff',
    strokeWidth: d => 1,
    strokeOpacity: d => 1,
}

export class FeatureLayer {
    constructor(opts) {
        this.key = opts.key
        this.geodata = opts.geodata
        this.features = opts.geodata.features
        this.style = {
            ...FEATURE_DEFAULT_STYLE,
            ...opts.featureStyle || {}
        }
        this.layerIndex = 0
    }

    plot(projection) {
        const pathGenerator = geoPath().projection(projection)
        this.layerIndex += 1
        return <g className="feature-layer" key={this.key}>
            {
                this.features.map((feature, i) => {
                    const d = pathGenerator(feature) // This may not work
                    const p = feature.properties
                    return <path
                        className="feature"
                        key={String(i)}
                        d={d}
                        opacity={this.style.opacity(p)}
                        fill={this.style.fill(p)}
                        fillOpacity={this.style.fillOpacity(p)}
                        stroke={this.style.stroke(p)}
                        strokeWidth={this.style.strokeWidth(p)}
                        strokeOpacity={this.style.strokeOpacity(p)}
                    />
                })
            }
        </g >
    }
}

const POINT_DEFAULT_STYLE = {
    radius: d => 2,
    opacity: d => 1,
    fill: d => '#222',
    fillOpacity: d => 1,
    stroke: d => null,
    strokeWidth: d => 1,
    strokeOpacity: d => 1,
}

const DEFAULT_LABEL = {
    text: d => null,
    fill: d => '#000',
    fontSize: d => '12px',
    dx: d => '0.5em',
    dy: d => '0.5em',
    textAnchor: d => 'start'
}


export class PointLayer {
    constructor(opts) {
        this.key = opts.key
        this.geodata = opts.geodata
        this.features = opts.geodata.features
        this.style = {
            ...POINT_DEFAULT_STYLE,
            ...opts.pointStyle || {}
        }
        this.label = {
            ...DEFAULT_LABEL,
            ...opts.labelStyle || {}
        }
        // TODO - implement custom marker logic
        this.layerIndex = 0
    }

    plot(projection) {
        const pathGenerator = geoPath().projection(projection)
        return <g className="feature-layer" key={this.key}>
            {
                this.features.map((feature, i) => {
                    const point = pathGenerator.centroid(feature) // This may not work
                    const p = feature.properties
                    const marker = <circle
                        className="feature"
                        r={this.style.radius(p)}
                        cx={0} cy={0}
                        opacity={this.style.opacity(p)}
                        fill={this.style.fill(p)}
                        fillOpacity={this.style.fillOpacity(p)}
                        stroke={this.style.stroke(p)}
                        strokeOpacity={this.style.strokeOpacity(p)}
                    />
                    const label = <text
                        x={0} y={0}
                        fill={this.label.fill(p)}
                        fontSize={this.label.fontSize(p)}
                        dx={this.label.dx(p)}
                        dy={this.label.dy(p)}
                        textAnchor={this.label.textAnchor(p)}
                    >{this.label.text(p)}</text>
                    return <g transform={`translate(${point[0]},${point[1]})`} key={String(i)}>
                        {marker}
                        {label}
                    </g>
                })
            }
        </g>
    }
}