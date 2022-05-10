module.exports = {
  siteMetadata: {
    title: `Election Guide '22`,
    description: `The candidates and issues on Montana's 2022 ballot`,
    author: `Eric Dietrich / Montana Free Press`,
    seoTitle: '2022 Montana election guide',
    siteUrl: `https://apps.montanafreepress.org/election-guide-2022`,
    keywords: ['Montana', '2022 election', 'campaign', 'candidates', 'politics', 'vote'],
    image: `https://apps.montanafreepress.org/election-guide-2022/election-guide-2022-feature-v1.png`,
  },
  pathPrefix: `/election-guide-2022`, // for S3
  // pathPrefix: `/demo-montana-2022-voter-guide`, // for S3
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
    // {
    //   resolve: 'gatsby-plugin-google-analytics',
    //   options: {
    //     "trackingId": "G-EEZKLGXQBX"
    //   }
    // },
    {
      resolve: `gatsby-plugin-anchor-links`,
      options: {
        offset: -100,
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `MTFP 2022 Election Guide`,
        short_name: `Election Guide '22`,
        description: `Find the latest information on candidates, legislative races and how to vote in Montana’s 2022 elections.`,
        start_url: `/`,
        icon: `static/mtfp-icon.png`,
        background_color: `#eae3da`,
        theme_color: `#F85028`,
        display: `standalone`,
      },
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