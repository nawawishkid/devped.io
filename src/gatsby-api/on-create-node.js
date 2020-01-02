const fs = require(`fs`)
const yaml = require(`js-yaml`)

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
    addSlugFieldToMarkdowRemarkNode(props)
    createPostNode(props)
  }

  if (node.internal.type === `Post` && node.type === `tech`) {
    createTechNode(props)
  }

  if (
    node.internal.type === `File` &&
    node.internal.mediaType === `text/yaml` &&
    node.sourceInstanceName === `locales`
  ) {
    createLocaleNode(props)
  }
}

/**
 * I have to add 'slug' field in order to make .tableOfContents works
 * @see https://www.gatsbyjs.org/packages/gatsby-transformer-remark/#getting-table-of-contents
 */
const addSlugFieldToMarkdowRemarkNode = ({ node, actions, getNode }) => {
  const fileNode = getNode(node.parent)
  const { frontmatter } = node
  const { createNodeField } = actions

  createNodeField({
    node,
    name: `slug`,
    value: frontmatter.slug || makeSlug(frontmatter.type, fileNode),
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
    status: frontmatter.status || `published`,
    original: frontmatter.original === false ? false : true,
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

  content.slug = frontmatter.slug || makeSlug(content.type, fileNode)

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

const makeSlug = (contentType, fileNode) => {
  let name = fileNode.name.split(`.`)[0]

  name = name === `index` ? `` : name + `/`
  const slug = `/${fileNode.relativeDirectory}/${name}`

  switch (contentType) {
    case `series`:
    case `standalone`:
    case `chapter`:
      return `/tutorials${slug}`

    default:
      return slug
  }
}

const createLocaleNode = ({
  node: fileNode,
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode, createParentChildLink } = actions
  const [localeName, localeType, localeFilename] = fileNode.relativePath.split(
    `/`
  )
  const name = localeFilename
    .split(`.`)
    .slice(0, -1)
    .join(`.`)
  const doc = yaml.safeLoad(fs.readFileSync(fileNode.absolutePath, `utf8`))
  const content = {
    locale: localeName,
    type: localeType,
    name,
    map: Object.entries(doc).reduce(
      (obj, [key, value]) => ({
        ...obj,
        [[localeType, name, key].join(`___`)]: value,
      }),
      {}
    ),
  }
  const localeNode = {
    ...content,
    id: createNodeId(fileNode.relativePath),
    parent: fileNode.id,
    children: [],
    internal: {
      type: `Locale`,
      contentDigest: createContentDigest(content),
    },
  }

  createNode(localeNode)
  createParentChildLink({ parent: fileNode, child: localeNode })
}

const createTechNode = ({
  node: postNode,
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const {
    type,
    techTypes,
    slug,
    original,
    ...restFrontmatter
  } = postNode.frontmatter
  const content = {
    ...restFrontmatter,
    types: techTypes,
    original: original === false ? false : true,
    slug: slug || postNode.slug,
  }
  const techNode = {
    id: createNodeId(`tech-${content.slug}`),
    children: [],
    parent: postNode.id,
    ...content,
    internal: {
      type: `Tech`,
      contentDigest: createContentDigest(content),
    },
  }
  const { createNode, createParentChildLink } = actions

  createNode(techNode)
  createParentChildLink({ parent: postNode, child: techNode })
}
