import React from "react"
import { graphql } from "gatsby"

const RequirementPost = ({ data }) => {
  const { post } = data

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.updatedAt}</p>
      <div>
        <h3>User stories</h3>
        <ul>
          {post.frontmatter.stories.map(story => (
            <li>{story}</li>
          ))}
        </ul>
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  )
}

export default RequirementPost

export const query = graphql`
  query($slug: String!) {
    post(slug: { eq: $slug }, type: { eq: "requirement" }) {
      title
      frontmatter {
        stories
      }
      updatedAt
      slug
      html
    }
  }
`
