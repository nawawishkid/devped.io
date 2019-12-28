const path = require(`path`)

module.exports = async props => {
  await createPostPages(props)
  await createPostListPages(props)
  await createTechPages(props)
}

const createPostPages = async ({ graphql, actions }) => {
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
}

const createPostListPages = ({ actions: { createPage } }) => {
  const typesSlugsMap = {
    explain: `/explains/`,
    standalone: `/tutorials/standalones/`,
    series: `/tutorials/series/`,
    class: `/classes/`,
    requirement: `/requirements/`,
  }
  const typesPluralMap = {
    explain: `explains`,
    standalones: `standalones`,
    series: `series`,
    class: `classes`,
    requirement: `requirements`,
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

const createTechPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const results = await graphql(`
    query {
      allTechListYaml {
        edges {
          node {
            title
            slug
            summary
            type
            logo
          }
        }
      }
    }
  `)

  results.data.allTechListYaml.edges.forEach(({ node }) => {
    createPage({
      path: `/techs/${node.slug}`,
      component: path.resolve(`./src/templates/tech-page.js`),
      context: {
        slug: node.slug,
        title: node.title,
      },
    })
  })
}
