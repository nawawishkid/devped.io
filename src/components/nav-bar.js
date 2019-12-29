import React from "react"
import { Link } from "gatsby"

const NavBar = ({ items }) => {
  return (
    <nav>
      <ul>
        {items.map((item, index) => (
          <Link to={item.url} key={item.id || item.key || index}>
            <li>{item.label}</li>
          </Link>
        ))}
      </ul>
    </nav>
  )
}

export default NavBar
