import React from "react"
import { graphql } from "gatsby"

const IndexPage = () => {
  return `Homepage!!`
}

export default IndexPage

export const query = graphql`
  query($locale: String!, $defaultLocale: String!) {
    expectedTranslation: allLocale(
      filter: {
        locale: { eq: $locale }
        type: { in: ["page", "component"] }
        name: { in: ["nav"] }
      }
    ) {
      ...localeConnectionFields
    }
    defaultTranslation: allLocale(
      filter: {
        locale: { eq: $defaultLocale }
        type: { in: ["page", "component"] }
        name: { in: ["nav"] }
      }
    ) {
      ...localeConnectionFields
    }
  }
`
