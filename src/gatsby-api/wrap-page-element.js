import React from "react"
import { LocaleProvider } from "../contexts/locale"
import Layout from "../components/layout"
import PostLayout from "../components/post-layout"

export default ({ element: initialElement, props }) => {
  const { pageContext } = props
  let element

  if (pageContext.pageType === `post`) {
    element = <PostLayout {...props}>{initialElement}</PostLayout>
  } else {
    element = initialElement
  }

  return (
    <LocaleProvider locale={pageContext.locale}>
      <Layout>{element}</Layout>
    </LocaleProvider>
  )
}
