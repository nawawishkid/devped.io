import React from "react"
import { graphql, Link } from "gatsby"

const TechPage = ({ data }) => {
  const tech = data.techListYaml
  const posts = data.allPost.edges
  console.log(`posts: `, posts)

  return (
    <>
      <h1>{tech.title}</h1>
      {tech.websites ? (
        <ul>
          {tech.websites.map((url, index) => (
            <a
              href={url}
              title={url}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
            >
              <li>{url}</li>
            </a>
          ))}
        </ul>
      ) : null}
      <PostsAboutThisTech posts={posts} />
    </>
  )
}

const PostsAboutThisTech = ({ posts }) => {
  return (
    <div>
      <h3>เนื้อหาที่เกี่ยวกับเทคฯ นี้ ({posts.length})</h3>
      <div>
        {posts.length === 0
          ? `Such empty!`
          : posts.map(({ node }) => (
              <PostAboutThisTech {...node} key={node.id} />
            ))}
      </div>
    </div>
  )
}
const PostAboutThisTech = ({ title, slug, type }) => {
  return (
    <Link to={slug}>
      <h4>{title}</h4>
      <small>{type}</small>
    </Link>
  )
}

export default TechPage

export const query = graphql`
  query($slug: String!, $title: String!) {
    techListYaml(slug: { eq: $slug }) {
      id
      title
      slug
      summary
      type
      websites
    }
    allPost(filter: { frontmatter: { stack: { eq: $title } } }) {
      edges {
        node {
          id
          title
          slug
          type
        }
      }
    }
  }
`
