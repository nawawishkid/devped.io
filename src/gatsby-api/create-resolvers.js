module.exports = ({ createResolvers }) => {
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
