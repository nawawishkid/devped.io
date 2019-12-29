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

  allPost.edges.forEach(({ node }) => {
    console.log(`node: `, node)
    const url = `/` + node.locale + node.slug
    console.log(`url: `, url)
    createPage({
      path: url,
      component: path.resolve(`./src/templates/${node.type}-post.js`),
      context: {
        slug: node.slug,
        locale: node.locale,
      },
    })
  })

  // await createPostPages(props)
  createPostListPages(createPage, locales)
  // await createTechPages(props)
  // await createHomePages(props)
}

/**
 * Create homepage for each locale
 */
// const createHomePages = async ({ graphql, actions }) => {
//   const { createPage } = actions
//   const results = await graphql(localeQueryString)

//   if (results.errors) {
//     return
//   }

//   const { locales, defaultLocale } = results.data.site.siteMetadata

//   locales.forEach(locale => {
//     createPage({
//       path: `/${locale}/`,
//       component: path.resolve(`./src/templates/home-page.js`),
//       context: {
//         locale,
//       },
//     })
//   })

//   // Create index page
//   createPage({
//     path: `/`,
//     component: path.resolve(`./src/templates/home-page.js`),
//     context: {
//       locale: defaultLocale,
//     },
//   })
// }

// const createPostPages = async ({ graphql, actions }) => {
//   const { createPage } = actions
//   const posts = await graphql(`
//     query {
//       allPost {
//         edges {
//           node {
//             slug
//             type
//           }
//         }
//       }
//     }
//   `)

//   posts.data.allPost.edges.forEach(({ node }) => {
//     console.log(`node: `, node)
//     createPage({
//       path: node.slug,
//       component: path.resolve(`./src/templates/${node.type}-post.js`),
//       context: {
//         slug: node.slug,
//       },
//     })
//   })
// }

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

// const createTechPages = async ({ graphql, actions }) => {
//   const { createPage } = actions
//   const results = await graphql(`
//     query {
//       allTechListYaml {
//         edges {
//           node {
//             title
//             slug
//             summary
//             type
//             logo
//           }
//         }
//       }
//     }
//   `)

//   results.data.allTechListYaml.edges.forEach(({ node }) => {
//     createPage({
//       path: `/techs/${node.slug}`,
//       component: path.resolve(`./src/templates/tech-page.js`),
//       context: {
//         slug: node.slug,
//         title: node.title,
//       },
//     })
//   })
// }
