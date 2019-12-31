module.exports = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type Post implements Node {
      tree: PostTree
      html: String
      stack: [Tech]!
      locale: String
      translations(status: String = "published", locales: [String!]): [Post]!
    }

    type PostTree {
      children(status: String = "published", locale: String): [Post]!
      next: Post
      prev: Post
      parent: Post
    }
    type Tech {
      title: String
      summary: String
      type: String
      logo: String
      websites: [String]!
      slug: String
    }
  `

  createTypes(typeDefs)
}
