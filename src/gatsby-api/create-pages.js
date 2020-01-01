const path = require(`path`)

module.exports = async ({ graphql, actions: { createPage } }) => {
  const results = await graphql(`
    query {
      site {
        siteMetadata {
          locales
          defaultLocale
        }
      }
      allPost(filter: { status: { eq: "published" } }) {
        edges {
          node {
            slug
            # // @TODO: Exclude 'title' and use 'slug' instead
            title # for 'tech' post only
            type
            locale
          }
        }
      }
      allNavsYaml {
        edges {
          node {
            key
            url
          }
        }
      }
    }
  `)

  if (results.errors) {
    return
  }

  const { allPost, site, allNavsYaml } = results.data
  const { locales, defaultLocale } = site.siteMetadata

  // Create homepage for each locale
  locales.forEach(locale => {
    createPage({
      path: `/${locale}/`,
      component: path.resolve(`./src/templates/home-page.js`),
      context: {
        locale,
        defaultLocale,
        pageType: `page`,
        supportedLocales: locales,
      },
    })
  })

  // Create index page
  createPage({
    path: `/`,
    component: path.resolve(`./src/templates/home-page.js`),
    context: {
      locale: defaultLocale,
      defaultLocale,
      pageType: `page`,
      supportedLocales: locales,
    },
  })

  // Create page for each post
  locales.forEach(locale => {
    allPost.edges.forEach(({ node }) => {
      const url = `/` + locale + node.slug
      const templatePrefix = node.type === `tech` ? `tech` : `single`
      const techTitle = node.type === `tech` ? node.title : null

      createPage({
        path: url,
        component: path.resolve(`./src/templates/${templatePrefix}-post.js`),
        context: {
          slug: node.slug,
          locale: locale,
          pageType: `post`,
          postType: node.type,
          defaultLocale,
          supportedLocales: locales,
          // @TODO: Exclude 'techTtle' and use 'slug' instead
          techTitle,
        },
      })
    })
  })

  allNavsYaml.edges.forEach(({ node }) => {
    locales.forEach(locale => {
      createPage({
        path: `/` + locale + node.url,
        component: path.resolve(`./src/templates/post-list.js`),
        context: {
          postType: node.key,
          locale,
          defaultLocale,
          pageType: `page`,
          supportedLocales: locales,
        },
      })
    })
  })
}
