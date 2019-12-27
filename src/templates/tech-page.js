import React from "react"
import { graphql } from "gatsby"

const TechPage = ({ data }) => {
  const tech = data.techListYaml

  return (
    <>
      <h1>{tech.title}</h1>
      {tech.websites ? (
        <ul>
          {tech.websites.map(url => (
            <a href={url} title={url} target="_blank">
              <li>{url}</li>
            </a>
          ))}
        </ul>
      ) : null}
    </>
  )
}

export default TechPage

export const query = graphql`
  query($slug: String!) {
    techListYaml(slug: { eq: $slug }) {
      title
      slug
      summary
      type
      websites
    }
  }
`
