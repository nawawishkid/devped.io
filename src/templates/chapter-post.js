import React from "react"
import { graphql } from "gatsby"
import Link from "../components/link"

const ChapterPost = ({ data }) => {
  const { post } = data

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.updatedAt}</p>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
      <div>
        {post.tree.next ? <SiblingChapter {...post.tree.next} /> : null}
        {post.tree.prev ? <SiblingChapter {...post.tree.prev} /> : null}
      </div>
    </div>
  )
}

const SiblingChapter = ({ title, slug }) => {
  return (
    <div>
      <Link to={slug}>
        <h4>{title}</h4>
      </Link>
    </div>
  )
}

export default ChapterPost

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
      tree {
        next {
          title
          slug
        }
        prev {
          title
          slug
        }
      }
    }
    defaultPost: post(slug: { eq: $slug }, type: { eq: $postType }) {
      html
      title
      updatedAt
      locale
      tree {
        next {
          title
          slug
        }
        prev {
          title
          slug
        }
      }
    }
  }
`
