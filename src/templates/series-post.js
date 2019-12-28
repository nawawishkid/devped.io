import React from "react"
import { graphql, Link } from "gatsby"

const SeriesPost = ({ data }) => {
  const { post } = data
  const { parent, children } = post.tree

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.updatedAt}</p>
      <p>
        Implementations of <Link to={parent.slug}>{parent.title}</Link>{" "}
        requirement.
      </p>
      <ul>
        {children.map(chapter => (
          <li key={chapter.id}>
            <Link to={chapter.slug}>
              <h4>{chapter.title}</h4>
            </Link>
          </li>
        ))}
      </ul>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  )
}

export default SeriesPost

export const query = graphql`
  query($slug: String!) {
    post(slug: { eq: $slug }, type: { eq: "series" }) {
      html
      title
      updatedAt
      tree {
        children {
          id
          title
          slug
        }
        # parent is a requirement
        parent {
          title
          slug
        }
      }
    }
  }
`
