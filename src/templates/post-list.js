import React from "react"
import { graphql } from "gatsby"
import PostItem from "../components/post-item"
import { useLocale } from "../contexts/locale"
import SEO from "../components/seo"

const PostList = ({ data, pageContext, path }) => {
  const posts = data.allPost.edges
  const { postType, locale } = pageContext
  const { translate } = useLocale()
  const heading = translate(`all_${postType}`, `post-list`, `page`)
  const localizedPosts = posts.reduce((arr, edge) => {
    const { node: post } = edge
    console.log(`post: `, post)
    let localizedPost

    if (post.locale !== locale) {
      localizedPost = post.translations.find(p => p.locale === locale) || post
    } else {
      localizedPost = post
    }

    arr.push({ node: localizedPost })

    return arr
  }, [])
  console.log(`locPosts: `, localizedPosts)

  return (
    <>
      <SEO title={heading} pathname={path} />
      <h1>
        {heading} ({posts.length})
      </h1>
      {localizedPosts.map(({ node }) => (
        <PostItem {...node} key={node.id} />
      ))}
    </>
  )
}

export default PostList

export const query = graphql`
  query($postType: String!, $locale: String!, $defaultLocale: String!) {
    allPost(
      filter: {
        status: { eq: "published" }
        type: { eq: $postType }
        original: { eq: true }
      }
    ) {
      edges {
        node {
          ...basicPostFields
          ...postTranslationsFields
        }
      }
    }
    expectedTranslation: allLocale(
      filter: {
        locale: { eq: $locale }
        type: { in: ["page", "component"] }
        name: { in: ["post-list", "post-item", "nav"] }
      }
    ) {
      ...localeConnectionFields
    }
    defaultTranslation: allLocale(
      filter: {
        locale: { eq: $defaultLocale }
        type: { in: ["page", "component"] }
        name: { in: ["post-list", "post-item", "nav"] }
      }
    ) {
      ...localeConnectionFields
    }
  }
`
