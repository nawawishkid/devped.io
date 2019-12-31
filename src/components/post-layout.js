import React from "react"
import PostLocaleWarning from "./post-locale-warning"
import SEO from "./seo"

const PostLayout = ({ data, path, children }) => {
  const { post } = data

  return (
    <>
      <SEO
        title={post.title}
        pathname={path}
        description={post.summary}
        image={post.image}
        article
      />
      <PostLocaleWarning locale={post.locale} />
      {children}
    </>
  )
}

export default PostLayout
