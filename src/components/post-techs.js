import React from "react"
import Link from "./link"

const PostTechs = ({ stack }) => (
  <div>
    <h4>Techs in this post:</h4>
    <ul>
      {stack.map((stk, index) => (
        <Link to={stk.slug} key={stk.id || index}>
          <li>{stk.title}</li>
        </Link>
      ))}
    </ul>
  </div>
)

export default PostTechs
