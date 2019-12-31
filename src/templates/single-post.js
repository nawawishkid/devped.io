import React from "react"
import { graphql } from "gatsby"
import * as postComponents from "../components/posts"

const SinglePost = props => {
  const { pageContext } = props
  const { postType } = pageContext
  const PostComponent =
    postComponents[`${postType[0].toUpperCase() + postType.slice(1)}Post`] ||
    postComponents.BasicPost

  return <PostComponent {...props} />
}

export default SinglePost

export const query = graphql`
  query(
    $slug: String!
    $locale: String!
    $defaultLocale: String!
    $postType: String!
  ) {
    localizedPost: post(
      status: { eq: "published" }
      slug: { eq: $slug }
      type: { eq: $postType }
      locale: { eq: $locale }
    ) {
      ...allPostFields
    }
    defaultPost: post(
      status: { eq: "published" }
      slug: { eq: $slug }
      type: { eq: $postType }
    ) {
      ...allPostFields
    }
    childrenPosts: allPost(filter: { frontmatter: { parent: { eq: $slug } } }) {
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
        name: {
          in: [
            "post-list"
            "post-item"
            "nav"
            "requirement-post"
            "lesson-post"
            "class-post"
            "series-post"
          ]
        }
      }
    ) {
      ...localeConnectionFields
    }
    defaultTranslation: allLocale(
      filter: {
        locale: { eq: $defaultLocale }
        type: { in: ["page", "component"] }
        name: {
          in: [
            "post-list"
            "post-item"
            "nav"
            "requirement-post"
            "lesson-post"
            "class-post"
            "series-post"
          ]
        }
      }
    ) {
      ...localeConnectionFields
    }
  }
`
