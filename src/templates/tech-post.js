import React from "react"
import { graphql } from "gatsby"
import * as postComponents from "../components/posts"
import PostItem from "../components/post-item"

const TechPost = props => {
  const { localizedPostsAboutTech } = props.data
  const PostComponent = postComponents.BasicPost

  return (
    <PostComponent {...props}>
      <PostsAboutThisTech
        posts={localizedPostsAboutTech.edges.map(({ node }) => node)}
      />
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
    # @TODO: filter post by tech' slug instead
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
    defaultPost: post(
      status: { eq: "published" }
      slug: { eq: $slug }
      type: { eq: $postType }
      locale: { eq: $defaultLocale }
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
