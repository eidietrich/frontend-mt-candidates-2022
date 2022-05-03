module.exports = {
  siteMetadata: {
    title: `Election Guide '22`,
    description: `The candidates and issues on Montana's 2022 ballot`,
    author: `Eric Dietrich / Montana Free Press`,
    seoTitle: '2022 Montana election guide',
    siteUrl: `https://www.tk.tld`,
    keywords: ['Montana', '2022 election', 'campaign', 'candidates', 'politics', 'vote'],
    // hacky as hell
    image: "https://apps.montanafreepress.org/montana-legislature-lawsuit-tracker/images/lawsuit-tracker.png"
  },
  pathPrefix: `/demo-montana-2022-voter-guide`, // for S3
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-emotion",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `portraits`,
        path: `${__dirname}/src/images/candidates`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `maps`,
        path: `${__dirname}/src/images/maps`,
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: `data`,
    //     path: `${__dirname}/src/data`,
    //   },
    // },
    // `gatsby-transformer-json`,
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