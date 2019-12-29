import React from "react"
import Link from "./link"

const PostItem = props => (
  <div>
    <Link to={props.slug}>
      <h3>{props.title}</h3>
    </Link>
    <small>{props.updatedAt}</small>
    {/* <p>
      {Array.isArray(props.tree.children)
        ? `${props.tree.children.length} lessons`
        : null}
    </p> */}
  </div>
)

export default PostItem
