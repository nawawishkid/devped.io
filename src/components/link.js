import React from "react"
import { Link as GLink } from "gatsby"
import { useLocale } from "../contexts/locale"

const Link = ({ to, locale: customLocale = null, ...props }) => {
  const { locale } = useLocale()
  const newUrl = `/` + (customLocale || locale) + to
  console.log(`locale: `, locale)
  console.log(`newUrl: `, newUrl)

  return <GLink to={newUrl} {...props} />
}

export default Link
