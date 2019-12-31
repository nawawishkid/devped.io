module.exports = {
  siteMetadata: {
    title: `DevPed.io`,
    titleTemplate: `%s | DevPed.io`,
    description: `Project`,
    locales: [`en`, `th`],
    defaultLocale: `en`,
    image: ``,
    url: `https://devped.io`,
    socials: {
      twitter: `devped.io`,
      facebook: `devped.io`,
      instagram: `devped.io`,
      github: `devped.io`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-118059742-3`,
      },
    },
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/content/posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/content/data`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `locales`,
        path: `${__dirname}/content/locales`,
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-emojis`,
            options: {
              active: true,
              size: 32,
            },
          },
          {
            // Plugin above does not support ASCII, so here we are.
            resolve: `gatsby-remark-emoji`,
            options: { ascii: true },
          },
        ],
      },
    },
    `gatsby-transformer-yaml`,
    `gatsby-plugin-react-helmet`,
  ],
}
