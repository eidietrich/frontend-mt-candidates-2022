import * as React from "react"
import { Map, FeatureLayer, PointLayer } from '../library/SvgMap'

// Data layers
import counties from '../data/geo-counties.json'
import cities from '../data/geo-cities.json'
import lakes from '../data/geo-lakes.json'
import highways from '../data/geo-highways.json'
import reservations from '../data/geo-reservations.json'

const BASE_MAP = [
    new FeatureLayer({
        key: 'counties',
        geodata: counties,
        featureStyle: {
            // fill: d => d.NAME === 'GALLATIN' ? 'red' : 'blue'
        }
    }),
    new FeatureLayer({
        key: 'lakes',
        geodata: lakes,
        featureStyle: {
            fill: d => '#fff',
            stroke: d => 'none',
        }
    }),
    new FeatureLayer({
        key: 'highways',
        geodata: highways,
        featureStyle: {
            fill: d => 'none',
            stroke: d => '#a18c4d',
            opacity: d => 0.5,
        }
    }),
    new FeatureLayer({
        key: 'reservations',
        geodata: reservations,
        featureStyle: {
            fill: d => '#666',
            opacity: d => 0.3,
            stroke: d => 'none',
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
]

export const raceMaps = [
    {
        "key": "US-House-1-West",
        "map": <Map
            width={600}
            height={350}
            margin={{ top: 10, left: 10, right: 10, bottom: 10 }}
            layers={[
                ...BASE_MAP
            ]}
        />
    },
    {
        "key": "US-House-2-East",
        "map": <Map
            width={600}
            height={350}
            margin={{ top: 10, left: 10, right: 10, bottom: 10 }}
            layers={[
                ...BASE_MAP
            ]}
        />
    },
    {
        "key": "PSC-District-1",
        "map": <Map
            width={600}
            height={350}
            margin={{ top: 10, left: 10, right: 10, bottom: 10 }}
            layers={[
                ...BASE_MAP
            ]}
        />
    },
    {
        "key": "PSC-District-5",
        "map": <Map
            width={600}
            height={350}
            margin={{ top: 10, left: 10, right: 10, bottom: 10 }}
            layers={[
                ...BASE_MAP
            ]}
        />
    },
    {
        "key": "SupCo-1",
        "map": null
    },
    {
        "key": "SupCo-2",
        "map": null
    }
]