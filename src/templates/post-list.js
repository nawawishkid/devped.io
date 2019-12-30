import React from "react"
import { graphql } from "gatsby"
import PostItem from "../components/post-item"
import { useLocale } from "../contexts/locale"

const PostList = ({ data, pageContext }) => {
  const posts = data.allPost.edges
  const { postType } = pageContext
  const { translate } = useLocale()

  return (
    <>
      <h1>
        {translate(`all_${postType}`, `post-list`, `page`)} ({posts.length})
      </h1>
      {posts.map(({ node }) => (
        <PostItem {...node} key={node.id} />
      ))}
    </>
  )
}

export default PostList

export const query = graphql`
  query($postType: String!, $locale: String!, $defaultLocale: String!) {
    allPost(filter: { type: { eq: $postType } }) {
      edges {
        node {
          ...basicPostFields
        }
      }
    }
    expectedTranslation: allLocale(
      filter: {
        locale: { eq: $locale }
        type: { in: ["page", "component"] }
        name: { in: ["post-list", "post-item", "nav"] }
      }
    ) {
      ...localeConnectionFields
    }
    defaultTranslation: allLocale(
      filter: {
        locale: { eq: $defaultLocale }
        type: { in: ["page", "component"] }
        name: { in: ["post-list", "post-item", "nav"] }
      }
    ) {
      ...localeConnectionFields
    }
  }
`
