import React from "react"
import { graphql, Link } from "gatsby"

const LessonPost = ({ data }) => {
  const { post } = data
  const { parent, next, prev } = post.tree

  return (
    <div>
      <Link to={parent.slug}>
        <small>คลาส: {parent.title}</small>
      </Link>
      <h1>{post.title}</h1>
      <p>{post.updatedAt}</p>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
      <div>
        {next ? <SiblingLesson {...next} /> : null}
        {prev ? <SiblingLesson {...prev} type="prev" /> : null}
      </div>
    </div>
  )
}

const SiblingLesson = ({ title, slug, type = `next` }) => {
  return (
    <div>
      <Link to={slug}>
        {type === `next` ? type : `previous`} <h4>{title}</h4>
      </Link>
    </div>
  )
}

export default LessonPost

export const query = graphql`
  query($slug: String!) {
    post(slug: { eq: $slug }, type: { eq: "lesson" }) {
      html
      title
      updatedAt
      tree {
        parent {
          title
          slug
        }
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
