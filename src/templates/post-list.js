import React from "react"
import { graphql } from "gatsby"
import PostItem from "../components/post-item"
import { withLocaleProvider } from "../contexts/locale"
import Layout from "../components/layout"
import { translate } from "../utils/i18n"

const PostList = ({ data, pageContext }) => {
  const posts = data.allPost.edges
  const { postType, locale } = pageContext

  return (
    <Layout>
      <h1>
        {translate(`post-list`, `all ${postType}`, locale, `en`)} (
        {posts.length})
      </h1>
      {posts.map(({ node }) => (
        <PostItem {...node} key={node.id} />
      ))}
    </Layout>
  )
}

export default withLocaleProvider(PostList)

export const query = graphql`
  query($postType: String!) {
    allPost(filter: { type: { eq: $postType } }) {
      edges {
        node {
          id
          title
          slug
          type
          updatedAt
        }
      }
    }
  }
`
