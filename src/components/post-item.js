import React from "react"
import Link from "./link"
import { useLocale } from "../contexts/locale"

const PostItem = props => {
  const { translate } = useLocale()

  return (
    <div>
      <Link to={props.slug}>
        <h3>{props.title}</h3>
      </Link>
      <small>{props.updatedAt}</small>
      <br />
      <small>
        {translate(`language`, `post-item`, `component`)}: {props.locale}
      </small>
      {/* <p>
      {Array.isArray(props.tree.children)
        ? `${props.tree.children.length} lessons`
        : null}
    </p> */}
    </div>
  )
}

export default PostItem
