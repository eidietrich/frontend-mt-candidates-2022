module.exports = {
  siteMetadata: {
    title: `siteTitleTK`,
    description: 'Description TK',
    author: `Eric Dietrich / Montana Free Press`,
    siteUrl: `https://www.yourdomain.tld`,
    keywords: ['Montana', 'elections', 'voters', 'candidates', 'politicians', '2022'],
    // hacky as hell
    image: "https://apps.montanafreepress.org/montana-legislature-lawsuit-tracker/images/lawsuit-tracker.png"
  },
  pathPrefix: `/url-tk`, // for S3
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-emotion",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data`,
      },
    },
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        "trackingId": "G-ZVEKZ4L9EE"
      }
    },
    {
      resolve: `gatsby-plugin-anchor-links`,
      options: {
        offset: -100,
      }
    },
    // {
    //   resolve: `gatsby-plugin-parsely-analytics`,
    //   options: {
    //     apikey: 'montanafreepress.org',
    //     enableInDevelopment: false // send page views when NODE_ENV !== prod
    //   }
    // },
  ]
};