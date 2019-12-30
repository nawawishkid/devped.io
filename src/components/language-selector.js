import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { useLocale } from "../contexts/locale"

/**
 * Add window.location inside useEffect to avoid error in SSR
 */
const LanguageSelector = () => {
  const [pathname, setPathname] = React.useState(null)
  const { locale } = useLocale()
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          locales
        }
      }
    }
  `)
  const { locales } = data.site.siteMetadata

  React.useEffect(() => {
    setPathname(window.location.pathname)
  }, [])

  return (
    <span>
      <ul>
        {locales.map(lc => {
          let url

          if (pathname) {
            const split = window.location.pathname.split(`/`)

            url = [`/${lc}`, ...split.slice(2)].join(`/`)
          } else {
            url = `/${lc}/`
          }

          return (
            <Link to={url} key={lc}>
              <li>{lc}</li>
            </Link>
          )
        })}
      </ul>
    </span>
  )
}

export default LanguageSelector
