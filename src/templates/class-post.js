import React from "react"
import { graphql } from "gatsby"
import Link from "../components/link"
import { withLocaleProvider } from "../contexts/locale"

const ClassPost = ({ data }) => {
  const { post } = data

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.updatedAt}</p>
      <ul>
        {post.tree.children.map(lesson => (
          <li key={lesson.id}>
            <Link to={lesson.slug}>
              <h4>{lesson.title}</h4>
            </Link>
          </li>
        ))}
      </ul>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  )
}

export default withLocaleProvider(ClassPost)

export const query = graphql`
  query($slug: String!) {
    post(slug: { eq: $slug }, type: { eq: "class" }) {
      html
      title
      updatedAt
      tree {
        children {
          id
          title
          slug
        }
      }
    }
  }
`
