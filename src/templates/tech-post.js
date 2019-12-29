import React from "react"
import { graphql } from "gatsby"
import { withLocaleProvider } from "../contexts/locale"

const TechPost = ({ data }) => {
  const { post } = data

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.updatedAt}</p>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  )
}

export default withLocaleProvider(TechPost)

export const query = graphql`
  query($slug: String!) {
    post(slug: { eq: $slug }, type: { eq: "tech" }) {
      html
      title
      updatedAt
    }
  }
`
