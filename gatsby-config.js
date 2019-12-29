module.exports = {
  siteMetadata: {
    title: `Pandas eating lots`,
    locales: [`en`, `th`],
    defaultLocale: `en`
  },
  plugins: [
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
  ],
}
