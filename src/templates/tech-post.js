import React from "react"
import { graphql } from "gatsby"
import * as postComponents from "../components/posts"
import PostItem from "../components/post-item"

const TechPost = props => {
  const { localizedPostsAboutTech, originalPostsAboutTech } = props.data
  const PostComponent = postComponents.BasicPost
  /**
   * Merge localized posts with the original posts that don't have a matched translation of website's locale.
   * Below algorithm is not performant, you can fix this if you want to.
   */
  const postsAboutTech = [
    ...localizedPostsAboutTech.edges,
    ...originalPostsAboutTech.edges,
  ].reduce((list, { node: post }) => {
    if (list.find(n => n.id === post.id || n.slug === post.slug)) {
      return list
    }

    list.push(post)

    return list
  }, [])

  return (
    <PostComponent {...props}>
      <PostsAboutThisTech posts={postsAboutTech} />
    </PostComponent>
  )
}

export default TechPost

const PostsAboutThisTech = ({ posts }) => {
  return (
    <div>
      <h4>Posts about this technology</h4>
      <ul>
        {posts.map(post => (
          <PostItem {...post} key={post.id} />
        ))}
      </ul>
    </div>
  )
}

export const query = graphql`
  fragment validTranslations on Post {
    validTranslations: translations(locales: $supportedLocales) {
      ...basicPostFields
    }
  }

  fragment postsAboutTechFields on PostConnection {
    edges {
      node {
        ...basicPostFields
        ...postTranslationsFields
      }
    }
  }

  query(
    $slug: String!
    $locale: String!
    $defaultLocale: String!
    $postType: String!
    $supportedLocales: [String!]!
    $techTitle: String!
  ) {
    # // @TODO: filter post by tech' slug instead
    localizedPostsAboutTech: allPost(
      filter: {
        status: { eq: "published" }
        locale: { eq: $locale }
        stack: { elemMatch: { title: { eq: $techTitle } } }
      }
    ) {
      ...postsAboutTechFields
    }
    originalPostsAboutTech: allPost(
      filter: {
        status: { eq: "published" }
        original: { eq: true }
        stack: { elemMatch: { title: { eq: $techTitle } } }
      }
    ) {
      ...postsAboutTechFields
    }
    localizedPost: post(
      status: { eq: "published" }
      slug: { eq: $slug }
      type: { eq: $postType }
      locale: { eq: $locale }
    ) {
      ...allPostFields
      ...validTranslations
    }
    originalPost: post(
      status: { eq: "published" }
      slug: { eq: $slug }
      type: { eq: $postType }
      original: { eq: true }
    ) {
      ...allPostFields
      ...validTranslations
    }
    expectedTranslation: allLocale(
      filter: {
        locale: { eq: $locale }
        type: { in: ["page", "component"] }
        name: {
          in: [
            "post-list"
            "post-item"
            "nav"
            "requirement-post"
            "lesson-post"
            "class-post"
            "series-post"
          ]
        }
      }
    ) {
      ...localeConnectionFields
    }
    defaultTranslation: allLocale(
      filter: {
        locale: { eq: $defaultLocale }
        type: { in: ["page", "component"] }
        name: {
          in: [
            "post-list"
            "post-item"
            "nav"
            "requirement-post"
            "lesson-post"
            "class-post"
            "series-post"
          ]
        }
      }
    ) {
      ...localeConnectionFields
    }
  }
`
