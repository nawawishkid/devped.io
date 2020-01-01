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

  // console.log(`node: `, node)
  if (node.internal.type === `MarkdownRemark`) {
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
    original: frontmatter.original || true,
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

  switch (content.type) {
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
  getNode,
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const mdNode = getNode(postNode.parent)
  const {
    type,
    techTypes,
    slug,
    original,
    ...restFrontmatter
  } = postNode.frontmatter
  const detectedSlug = mdNode.fileAbsolutePath
    .split(`/`)
    .slice(-1)[0]
    .split(`.`)[0]
  const content = {
    ...restFrontmatter,
    types: techTypes,
    original: original || true,
    slug: slug || detectedSlug,
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
