import React from "react"
import PostItem from "./post-item"

const PostList = ({ posts }) => {
  return (
    <>
      <h1>All tutorials ({posts.length})</h1>
      {posts.map(post => (
        <PostItem {...post} key={post.id} />
      ))}
    </>
  )
}


export default PostList
