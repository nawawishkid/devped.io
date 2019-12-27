const { createFilePath } = require(`gatsby-source-filesystem`)

module.exports = props => {
  const { node } = props

  if (node.internal.type === `MarkdownRemark`) {
    createPostNode(props)
  }
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
