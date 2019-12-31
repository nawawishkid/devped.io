import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

const SEO = ({ title, description, image, pathname, article }) => {
  const data = useStaticQuery(graphql`
    query SEO {
      site {
        siteMetadata {
          defaultTitle: title
          titleTemplate
          defaultDescription: description
          defaultImage: image
          url
          socials {
            twitter
          }
        }
      }
    }
  `)
  const {
    defaultTitle,
    titleTemplate,
    defaultDescription,
    defaultImage,
    url,
    socials: { twitter },
  } = data.site.siteMetadata
  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: url + (image || defaultImage),
    url: url + (pathname || `/`),
  }

  return (
    <Helmet title={seo.title} titleTemplate={titleTemplate}>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      {seo.url && <meta property="og:url" content={seo.url} />}
      {(article ? true : null) && <meta property="og:type" content="article" />}
      {seo.title && <meta property="og:title" content={seo.title} />}
      {seo.description && (
        <meta property="og:description" content={seo.description} />
      )}
      {seo.image && <meta property="og:image" content={seo.image} />}
      <meta name="twitter:card" content="summary_large_image" />
      {twitter && <meta name="twitter:creator" content={twitter} />}
      {seo.title && <meta name="twitter:title" content={seo.title} />}
      {seo.description && (
        <meta name="twitter:description" content={seo.description} />
      )}
      {seo.image && <meta name="twitter:image" content={seo.image} />}
    </Helmet>
  )
}

export default SEO
