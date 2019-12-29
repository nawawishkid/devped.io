const { createFilePath } = require(`gatsby-source-filesystem`)

const pluralToSingular = {
  explains: `explain`,
  classes: `class`,
  series: `series`,
  requirements: `requirement`,
  standalones: `standalone`,
  techs: `tech`,
}

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
    type: frontmatter.type || pluralToSingular[fileNode.relativeDirectory],
    frontmatter,
    locale: frontmatter.locale || fileNode.name.split(`.`).slice(-1)[0],
    createdAt: frontmatter.createdAt || fileNode.ctime,
    updatedAt: frontmatter.updatedAt || fileNode.mtime,
    treeRef: {
      children: frontmatter.children || [],
      prev: frontmatter.prev,
      next: frontmatter.next,
      parent: frontmatter.parent,
    },
  }

  content.slug = frontmatter.slug || makeSlug(content, fileNode)

  // console.log(`content: `, content)
  const postNode = {
    id: createNodeId(`${content.slug}-${content.locale}`),
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

const makeSlug = (content, fileNode) => {
  let name = fileNode.name.split(`.`)[0]

  name = name === `index` ? `` : name + `/`
  const slug = `/${fileNode.relativeDirectory}/${name}`

  console.log(`slug: `, slug)

  switch (content.type) {
    case `series`:
    case `standalone`:
    case `chapter`:
      return `/tutorials${slug}`

    default:
      return slug
  }
}
