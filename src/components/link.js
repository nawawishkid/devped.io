import React from "react"
import { Link as GLink } from "gatsby"
import { useLocale } from "../contexts/locale"

const Link = ({ to, ...props }) => {
  const locale = useLocale()

  return <GLink to={`/` + locale + to} {...props} />
}

export default Link
