module.exports = ({ actions }) => {
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
