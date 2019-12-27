const path = require(`path`)

module.exports = async ({ graphql, actions }) => {
  const { createPage } = actions
  const posts = await graphql(`
    query {
      allPost {
        edges {
          node {
            slug
            type
          }
        }
      }
    }
  `)

  posts.data.allPost.edges.forEach(({ node }) => {
    console.log(`node: `, node)
    createPage({
      path: node.slug,
      component: path.resolve(`./src/templates/${node.type}-post.js`),
      context: {
        slug: node.slug,
      },
    })
  })

  const typesSlugsMap = {
    explain: `/explains/`,
    standalone: `/tutorials/standalones/`,
    series: `/tutorials/series/`,
    class: `/classes/`,
  }
  const typesPluralMap = {
    explain: `explains`,
    standalones: `standalones`,
    series: `series`,
    class: `classes`,
  }

  Object.entries(typesSlugsMap).forEach(([type, slug]) => {
    createPage({
      path: slug,
      component: path.resolve(`./src/templates/post-list.js`),
      context: {
        type,
        typePlural: typesPluralMap[type],
      },
    })
  })
}
