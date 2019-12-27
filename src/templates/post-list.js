import React from "react"
import { graphql } from "gatsby"
import PostItem from "../components/post-item"

const PostList = ({ data, pageContext, ...rest }) => {
  const posts = data.allPost.edges
  console.log(`posts: `, posts);

  return (
    <>
      <h1>
        All {pageContext.typePlural} ({posts.length})
      </h1>
      {posts.map(({ node }) => (
        <PostItem {...node} key={node.id} />
      ))}
    </>
  )
}

export default PostList

export const query = graphql`
  query($type: String!) {
    allPost(filter: { type: { eq: $type } }) {
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
