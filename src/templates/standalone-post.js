import React from "react"
import { graphql } from "gatsby"

const StandalonePost = ({ data }) => {
  const { post } = data

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.updatedAt}</p>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  )
}

export default StandalonePost

export const query = graphql`
  query($slug: String!) {
    post(slug: { eq: $slug }, type: { eq: "standalone" }) {
      html
      title
      updatedAt
      locale
    }
  }
`
