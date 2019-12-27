import React from "react"
import { graphql, Link } from "gatsby"

const TechsPage = ({ data }) => {
  const techs = data.allTechListYaml.edges

  return (
    <ul>
      {techs.map(({ node }) => (
        <Link to={`/techs/${node.slug}`} key={node.id}>
          <li>{node.title}</li>
        </Link>
      ))}
    </ul>
  )
}

export default TechsPage

export const query = graphql`
  query {
    allTechListYaml {
      edges {
        node {
          id
          title
          slug
          type
          summary
        }
      }
    }
  }
`
