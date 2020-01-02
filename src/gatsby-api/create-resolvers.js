module.exports = ({ createResolvers }) => {
  const resolver = {
    ...createPostResolver(),
    ...createPostTreeResolver(),
  }

  createResolvers(resolver)
}

const createPostResolver = () => ({
  Post: {
    excerpt: {
      async resolve(src, _, context) {
        let result
        const mdNode = await context.nodeModel.runQuery({
          query: { filter: { id: { eq: src.parent }, excerpt: { ne: null } } },
          type: `MarkdownRemark`,
          firstOnly: true,
        })

        if (mdNode && mdNode.__gatsby_resolved) {
          result = mdNode.__gatsby_resolved.excerpt
        }

        return result || ``
      },
    },
    tableOfContents: {
      async resolve(source, _, context) {
        const mdNode = await context.nodeModel.runQuery({
          query: {
            filter: {
              id: { eq: source.parent },
              tableOfContents: { ne: null },
            },
          },
          type: `MarkdownRemark`,
          firstOnly: true,
        })
        let result

        if (mdNode && mdNode.__gatsby_resolved) {
          result = mdNode.__gatsby_resolved.tableOfContents
        }

        return result || ``
      },
    },
    translations: {
      async resolve(source, args, context) {
        const localeFilter = { ne: source.locale }

        if (Array.isArray(args.locales) && args.locales.length) {
          localeFilter.in = args.locales
        }

        const translations = await context.nodeModel.runQuery({
          query: {
            filter: {
              slug: { eq: source.slug },
              locale: localeFilter,
              status: { eq: args.status || `published` },
            },
          },
          type: `Post`,
        })

        return translations || []
      },
    },
    stack: {
      async resolve(source, _, context) {
        const { stack } = source.frontmatter

        if (!stack) return []

        const results = await context.nodeModel.runQuery({
          query: {
            filter: {
              title: { in: stack },
            },
          },
          type: `Tech`,
        })

        return results || []
      },
    },
    html: {
      async resolve(source, _, context) {
        const mdNode = await context.nodeModel.runQuery({
          query: { filter: { id: { eq: source.parent }, html: { ne: `` } } },
          type: `MarkdownRemark`,
        })

        return Array.isArray(mdNode) ? mdNode[0].__gatsby_resolved.html : null
      },
    },
    tree: {
      resolve: source => source,
    },
  },
})

const createPostTreeResolver = () => ({
  PostTree: {
    children: {
      async resolve(source, args, context) {
        const { treeRef } = source
        let children

        if (Array.isArray(treeRef.children) && treeRef.children.length > 0) {
          children = await context.nodeModel.runQuery({
            query: {
              filter: {
                slug: { in: treeRef.children },
                status: { eq: args.status || `published` },
                original: { eq: true },
              },
            },
            type: `Post`,
            firstOnly: false,
          })
        }

        if (children && args.locale) {
          children = children.reduce((arr, child) => {
            let localizedChild

            if (child.locale !== args.locale && child.translations.length) {
              localizedChild = child.translations.find(
                l => l.locale === args.locale
              )
            }

            arr.push(localizedChild || child)

            return arr
          }, [])
        }

        return children || []
      },
    },
    parent: {
      async resolve(source, _, context) {
        const { treeRef } = source
        let parent

        if (treeRef.parent) {
          parent = await getPostsBySlug(context)(treeRef.parent, true)
        }

        return parent || null
      },
    },
    prev: {
      async resolve(source, _, context) {
        const { treeRef } = source
        let prev

        if (treeRef.prev) {
          prev = await getPostsBySlug(context)(treeRef.prev, true)
        }

        return prev || null
      },
    },
    next: {
      async resolve(source, _, context) {
        const { treeRef } = source
        let next

        if (treeRef.next) {
          next = await getPostsBySlug(context)(treeRef.next, true)
        }

        return next || null
      },
    },
  },
})

const getPostsBySlug = context => async (slug, single = false) => {
  const posts = await context.nodeModel.runQuery({
    query: {
      filter: { slug: { eq: slug }, status: { in: [`published`, `soon`] } },
    },
    type: `Post`,
  })

  if (single) {
    return Array.isArray(posts) ? posts[0] : null
  }

  return posts
}
