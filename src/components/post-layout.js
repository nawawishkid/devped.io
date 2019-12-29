import React from "react"
import PostLocaleWarning from "./post-locale-warning"

const PostLayout = ({ data, children }) => {
  const { post } = data

  return (
    <>
      <PostLocaleWarning locale={post.locale} />
      {children}
    </>
  )
}

export default PostLayout
