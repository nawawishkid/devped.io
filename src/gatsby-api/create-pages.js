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
    },
  })

  // Create page for each post
  locales.forEach(locale => {
    allPost.edges.forEach(({ node }) => {
      const url = `/` + locale + node.slug
      console.log(`url: `, url)
      createPage({
        path: url,
        component: path.resolve(`./src/templates/single-post.js`),
        context: {
          slug: node.slug,
          locale: locale,
          pageType: `post`,
          postType: node.type,
          defaultLocale,
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
        },
      })
    })
  })
}
