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
      allPost {
        edges {
          node {
            slug
            type
            locale
          }
        }
      }
    }
  `)

  if (results.errors) {
    return
  }

  const { allPost, site } = results.data
  const { locales, defaultLocale } = site.siteMetadata

  // Create homepage for each locale
  locales.forEach(locale => {
    createPage({
      path: `/${locale}/`,
      component: path.resolve(`./src/templates/home-page.js`),
      context: {
        locale,
      },
    })
  })

  // Create index page
  createPage({
    path: `/`,
    component: path.resolve(`./src/templates/home-page.js`),
    context: {
      locale: defaultLocale,
    },
  })

  // Create page for each post
  locales.forEach(locale => {
    allPost.edges.forEach(({ node }) => {
      const url = `/` + locale + node.slug
      console.log(`url: `, url)
      createPage({
        path: url,
        component: path.resolve(`./src/templates/${node.type}-post.js`),
        context: {
          slug: node.slug,
          locale: locale,
        },
      })
    })
  })

  createPostListPages(createPage, locales)
}

const createPostListPages = (createPage, locales) => {
  const typesSlugsMap = {
    explain: `/explains/`,
    standalone: `/tutorials/standalones/`,
    series: `/tutorials/series/`,
    class: `/classes/`,
    requirement: `/requirements/`,
    tech: `/techs/`,
  }

  Object.entries(typesSlugsMap).forEach(([type, slug]) => {
    locales.forEach(locale => {
      createPage({
        path: `/` + locale + slug,
        component: path.resolve(`./src/templates/post-list.js`),
        context: {
          postType: type,
          locale,
        },
      })
    })
  })
}
