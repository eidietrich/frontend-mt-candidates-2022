import * as React from "react"
import { Map, FeatureLayer, PointLayer } from '../library/SvgMap'

// Base layers
import counties from '../data/geo-counties.json'
import cities from '../data/geo-cities.json'
import lakes from '../data/geo-lakes.json'
import highways from '../data/geo-highways.json'
import reservations from '../data/geo-reservations.json'

// District layers
import psc from '../data/geo-psc-districts.json'
import congressional from '../data/geo-congressional.json'

const BASE_MAP_CONFIG = {
    width: 600,
    height: 400,
    margin: { top: 20, left: 10, right: 10, bottom: 20 },
}

const BASE_MAP_LAYERS = [
    new FeatureLayer({
        key: 'counties',
        geodata: counties,
        featureStyle: {
            fill: d => '#e0d4b8',
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

const districtFeatureStyle = (selAccessor) => {
    return {
        fill: d => '#fff',
        fillOpacity: d => (selAccessor(d)) ? 0 : 0.8,
        stroke: d => '#222',
        strokeWidth: d => 1,
        strokeOpacity: d => 0.2,
    }
}
const highlightStyle = {
    fill: d => 'none',
    stroke: d => 'black',
    strokeWidth: d => 2,
}

export const raceMaps = [
    {
        "key": "US-House-1-West",
        "map": <Map
            {...BASE_MAP_CONFIG}
            layers={[
                ...BASE_MAP_LAYERS,
                new FeatureLayer({
                    key: 'district',
                    geodata: congressional,
                    featureStyle: districtFeatureStyle(d => d.ID === 1),
                }),
                new FeatureLayer({
                    key: 'highlight',
                    geodata: {
                        ...congressional,
                        features: congressional.features.filter(d => d.properties.ID === 1)
                    },
                    featureStyle: highlightStyle,
                })
            ]}
        />
    },
    {
        "key": "US-House-2-East",
        "map": <Map
            {...BASE_MAP_CONFIG}
            layers={[
                ...BASE_MAP_LAYERS,
                new FeatureLayer({
                    key: 'district',
                    geodata: congressional,
                    featureStyle: districtFeatureStyle(d => d.ID === 2),
                }),
                new FeatureLayer({
                    key: 'highlight',
                    geodata: {
                        ...congressional,
                        features: congressional.features.filter(d => d.properties.ID === 2)
                    },
                    featureStyle: highlightStyle,
                })
            ]}
        />
    },
    {
        "key": "PSC-District-1",
        "map": <Map
            {...BASE_MAP_CONFIG}
            layers={[
                ...BASE_MAP_LAYERS,
                new FeatureLayer({
                    key: 'district',
                    geodata: psc,
                    featureStyle: districtFeatureStyle(d => d.district === '1'),
                }),
                new FeatureLayer({
                    key: 'highlight',
                    geodata: {
                        ...psc,
                        features: psc.features.filter(d => d.properties.district === '1')
                    },
                    featureStyle: highlightStyle,
                })
            ]}
        />
    },
    {
        "key": "PSC-District-5",
        "map": <Map
            {...BASE_MAP_CONFIG}
            layers={[
                ...BASE_MAP_LAYERS,
                new FeatureLayer({
                    key: 'district',
                    geodata: psc,
                    featureStyle: districtFeatureStyle(d => d.district === '5'),
                }),
                new FeatureLayer({
                    key: 'highlight',
                    geodata: {
                        ...psc,
                        features: psc.features.filter(d => d.properties.district === '5')
                    },
                    featureStyle: highlightStyle,
                })
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