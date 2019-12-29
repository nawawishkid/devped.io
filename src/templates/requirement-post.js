import React from "react"
import { graphql } from "gatsby"
import Link from "../components/link"

const RequirementPost = ({ data }) => {
  const { post, relatedPosts } = data

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.updatedAt}</p>
      <div>
        <h3>User stories</h3>
        <ul>
          {post.frontmatter.stories.map((story, index) => (
            <li key={index}>{story}</li>
          ))}
        </ul>
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
      <div>
        <h3>Related posts</h3>
        <ul>
          {relatedPosts.edges.map(({ node }) => (
            <Link to={node.slug} key={node.id}>
              <li>{node.title}</li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default RequirementPost

export const query = graphql`
  query($slug: String!, $locale: String!, $postType: String!) {
    localizedPost: post(
      slug: { eq: $slug }
      type: { eq: $postType }
      locale: { eq: $locale }
    ) {
      html
      title
      updatedAt
      locale
      frontmatter {
        stories
      }
    }
    defaultPost: post(slug: { eq: $slug }, type: { eq: $postType }) {
      html
      title
      updatedAt
      locale
      frontmatter {
        stories
      }
    }
    relatedPosts: allPost(filter: { frontmatter: { parent: { eq: $slug } } }) {
      edges {
        node {
          id
          title
          slug
        }
      }
    }
  }
`
