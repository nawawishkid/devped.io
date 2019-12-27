const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = props => {
  const { node } = props
  // console.log(`node: `, node);
  // console.log(`props: `, props);
  if (node.internal.type === `MarkdownRemark`) {
    createPostNode(props)
    createSlugField(props)
    // console.log(`MarkdownRemark!!!`)
  } else if (node.internal.type === `Post`) {
    // console.log(`Post node!!!`)
    // populatePostTree(props)
  }
}
const createSlugField = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  const slug = createFilePath({ node, getNode, basePath: `pages` })

  createNodeField({
    node,
    name: `slug`,
    value: slug,
  })
}
const createPostNode = ({
  node: mdNode,
  getNode,
  createNodeId,
  createContentDigest,
  actions,
}) => {
  const { createNode, createParentChildLink } = actions
  const { frontmatter } = mdNode
  const fileNode = getNode(mdNode.parent)
  const content = {
    title: frontmatter.title,
    status: frontmatter.status,
    type: frontmatter.type,
    frontmatter,
    createdAt: frontmatter.createdAt || fileNode.ctime,
    updatedAt: frontmatter.updatedAt || fileNode.mtime,
    treeRef: {
      children: frontmatter.children || [],
      prev: frontmatter.prev,
      next: frontmatter.next,
      parent: frontmatter.parent,
    },
  }

  content.slug = makeSlug(content, fileNode, getNode)

  // console.log(`content: `, content)
  const postNode = {
    id: createNodeId(content.slug),
    children: [],
    parent: mdNode.id,
    ...content,
    internal: {
      type: `Post`,
      contentDigest: createContentDigest(content),
    },
  }

  createNode(postNode)
  createParentChildLink({ parent: mdNode, child: postNode })
}
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type Post implements Node {
      tree: PostTree
      html: String
    }
    type PostTree {
      children: [Post]
      next: Post
      prev: Post
      parent: Post
    }
  `

  createTypes(typeDefs)
}
exports.createResolvers = ({ createResolvers }) => {
  const resolver = {
    Post: {
      html: {
        async resolve(source, args, context) {
          const mdNode = await context.nodeModel.runQuery({
            query: { filter: { id: { eq: source.parent }, html: { ne: `` } } },
            type: `MarkdownRemark`,
          })

          return Array.isArray(mdNode) ? mdNode[0].__gatsby_resolved.html : null
        },
      },
      tree: {
        async resolve(source, args, context, info) {
          const tree = {}
          const { treeRef } = source

          if (treeRef.parent) {
            const parents = await context.nodeModel.runQuery({
              query: { filter: { slug: { eq: treeRef.parent } } },
              type: `Post`,
            })

            tree.parent = Array.isArray(parents) ? parents[0] : null
          }

          if (Array.isArray(treeRef.children) && treeRef.children.length > 0) {
            const children = await context.nodeModel.runQuery({
              query: { filter: { slug: { in: treeRef.children } } },
              type: `Post`,
              firstOnly: false,
            })

            tree.children = children
          }

          if (treeRef.next) {
            const nexts = await context.nodeModel.runQuery({
              query: { filter: { slug: { eq: treeRef.next } } },
              type: `Post`,
            })

            tree.next = Array.isArray(nexts) ? nexts[0] : null
          }

          if (treeRef.prev) {
            const prevs = await context.nodeModel.runQuery({
              query: { filter: { slug: { eq: treeRef.prev } } },
              type: `Post`,
            })

            tree.prev = Array.isArray(prevs) ? prevs[0] : null
          }

          return tree
        },
      },
    },
  }

  createResolvers(resolver)
}

const makeSlug = (content, fileNode, getNode) => {
  let slug = createFilePath({
    node: fileNode,
    getNode,
    basePath: `content/posts`,
  })

  switch (content.type) {
    case `series`:
    case `standalone`:
    case `chapter`:
      return `/tutorials${slug}`

    default:
      return slug
  }
}

exports.createPages = async ({ graphql, actions }) => {
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
