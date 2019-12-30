import React from "react"
import NavBar from "./nav-bar"
import { useLocale } from "../contexts/locale"
import LanguageSelector from "./language-selector"
import { useStaticQuery, graphql } from "gatsby"

const Layout = ({ children }) => {
  const { locale, translate } = useLocale()
  const navsDataQueriedResults = useStaticQuery(graphql`
    query {
      allNavsYaml {
        edges {
          node {
            key
            url
          }
        }
      }
    }
  `)
  // console.log(`allnavs: `, navsDataQueriedResults)

  const navItems = navsDataQueriedResults.allNavsYaml.edges.map(({ node }) => {
    return {
      label: translate(node.key, `nav`, `component`),
      url: `/` + locale + node.url,
    }
  })
  // console.log(`navItems: `, navItems)

  return (
    <>
      <NavBar items={navItems}></NavBar>
      <LanguageSelector />
      {children}
    </>
  )
}

export default Layout
