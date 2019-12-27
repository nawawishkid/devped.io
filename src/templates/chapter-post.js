import React from "react"
import { graphql, Link } from "gatsby"

const ChapterPost = ({ data }) => {
  const { post } = data
  console.log(`post: `, post);

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
  query($slug: String!) {
    post(slug: { eq: $slug }, type: { eq: "chapter" }) {
      html
      title
      updatedAt
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
