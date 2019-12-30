import { graphql } from "gatsby"

export const allLocaleFields = graphql`
  fragment allLocaleFields on Locale {
    map {
      component___nav___class
      component___nav___explain
      component___nav___requirement
      component___nav___series
      component___nav___standalone
      component___nav___tech
      component___post_item___language
      page___lesson_post___class_title
      page___lesson_post___previous
      page___lesson_post___next
      page___class_post___lessons
      page___series_post___chapters
      page___post_list___all_class
      page___post_list___all_explain
      page___post_list___all_requirement
      page___post_list___all_series
      page___post_list___all_standalone
      page___post_list___all_tech
      page___requirement_post___user_stories
      page___requirement_post___implemented_by
    }
    locale
    type
    name
  }
`
export const localeConnectionFields = graphql`
  fragment localeConnectionFields on LocaleConnection {
    edges {
      node {
        ...allLocaleFields
      }
    }
  }
`

export const basicPostFields = graphql`
  fragment basicPostFields on Post {
    id
    title
    slug
    type
    updatedAt
    locale
  }
`

export const allPostFields = graphql`
  fragment allPostFields on Post {
    createdAt
    frontmatter {
      ...allPostFrontmatterFields
    }
    html
    id
    locale
    slug
    stack {
      logo
      slug
      summary
      title
      type
      websites
    }
    status
    title
    tree {
      ...allPostTreeFields
    }
    # treeRef
    type
    updatedAt
  }

  fragment allPostTreeFields on PostTree {
    children {
      ...basicPostFields
    }
    next {
      ...basicPostFields
    }
    parent {
      ...basicPostFields
    }
    prev {
      ...basicPostFields
    }
  }

  fragment allPostFrontmatterFields on PostFrontmatter {
    children
    date
    id
    locale
    logo
    next
    parent
    prev
    stack
    status
    stories
    techTypes
    title
    type
  }
`
