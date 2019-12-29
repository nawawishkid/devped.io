import React from "react"
import NavBar from "./nav-bar"
import { useLocale } from "../contexts/locale"
import navs from "../../content/data/navs"
import { translate } from "../utils/i18n"
import LanguageSelector from "./language-selector"

const Layout = ({ children }) => {
  const locale = useLocale()
  const navItems = Object.entries(navs).map(([key, value]) => ({
    label: translate(`nav`, key, locale, `en`),
    ...value,
    url: `/` + locale + value.url,
  }))

  return (
    <>
      <NavBar items={navItems}></NavBar>
      <LanguageSelector />
      {children}
    </>
  )
}

export default Layout
