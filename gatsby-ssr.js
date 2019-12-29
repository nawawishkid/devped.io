import React from "react"
import { LocaleProvider } from "./src/contexts/locale"
import Layout from "./src/components/layout"

export const wrapPageElement = ({ element, props }) => {
  console.log(`SSR: wrapPageElement: `, props)
  const { pageContext } = props

  return (
    <LocaleProvider locale={pageContext.locale}>
      <Layout>{element}</Layout>
    </LocaleProvider>
  )
}
