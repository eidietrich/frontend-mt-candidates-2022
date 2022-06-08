// colors

export const parties = [
    { key: 'R', label: 'Republican' },
    { key: 'D', label: 'Democratic' },
    { key: 'L', label: 'Libertarian' },
    { key: 'I', label: 'Independent' },
]

export const statusColors = (billStatus) => {
    return {
        live: '#e8dc74',
        stalled: '#fc8d59',
        'became-law': '#91cf60',
    }[billStatus] || '#666'
}

export const partyColor = (partyLetter, variant = null) => {
    if (variant === 'lighter') {
        return {
            'R': '#f2b4b1',
            'D': '#b6cff0',
            'L': '#efcf7f',

        }[partyLetter] || '#666'
    }
    if (variant === 'darker') {
        return {
            'R': '#b51910',
            'D': '#285a9c',
            'L': '#a35b05',
        }[partyLetter] || '#666'
    }
    return {
        'R': '#d73027',
        'D': '#4575b4',
        'L': '#e89a0b',
        'G': '#4b9441',
        'I': '#666',
    }[partyLetter] || '#666'
}

export const positionColors = (positionLetter) => {
    return {
        Y: '#91cf60',
        N: '#fc8d59'
    }[positionLetter] || '#bbb'
}


// Donation URls
export const headerDonateUrl = 'https://checkout.fundjournalism.org/memberform?org_id=montanafreepress&campaign=7014o000000JnFkAAK'
export const footerDonateUrl = 'https://checkout.fundjournalism.org/memberform?org_id=montanafreepress&campaign=7013s000000UezrAAC'

// Menus
export const footerLogoUrl = 'https://montanafreepress.org/wp-content/uploads/2020/05/website-footer-logo-1.png'
export const footerMenus = [
    {
        label: 'Projects',
        items: [
            {
                label: 'COVID-19 Pandemic',
                url: 'https://montanafreepress.org/covid-19-pandemic/',
            },
            {
                label: 'Shared State',
                url: 'https://montanafreepress.org/podcasts/shared-state/',
            },
            {
                label: 'The Long Streets Project',
                url: 'https://montanafreepress.org/long-streets/',
            },
        ]
    },
    {
        label: 'About',
        items: [
            {
                label: 'About MTFP',
                url: 'https://montanafreepress.org/about-mtfp/',
            },
            {
                label: 'Jobs',
                url: 'https://montanafreepress.org/jobs/',
            },
            {
                label: 'Publish our work',
                url: 'https://montanafreepress.org/publish-our-work/',
            },
            {
                label: 'Contact us',
                url: 'https://montanafreepress.org/contact/',
            }
        ]
    },
    {
        label: 'Join',
        items: [
            {
                label: 'Subscribe',
                url: 'https://montanafreepress.org/newsletters-sign-up/',
            },
            {
                label: 'Donate',
                url: 'footerDonateUrl',
            }
        ]
    }
]