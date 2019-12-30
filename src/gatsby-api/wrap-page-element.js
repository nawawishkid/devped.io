import React from "react"
import { LocaleProvider } from "../contexts/locale"
import Layout from "../components/layout"
import PostLayout from "../components/post-layout"

export default ({ element: initialElement, props }) => {
  console.log(`props: `, props)
  if (props.custom404 || !props.pageContext.pageType) {
    return initialElement
  }

  const { data, pageContext } = props
  const { pageType, locale, defaultLocale } = pageContext
  let translations = {},
    element

  if (data) {
    const { expectedTranslation, defaultTranslation } = data

    if (expectedTranslation && defaultTranslation) {
      const translationList = [expectedTranslation, defaultTranslation]
      translations = transform(translationList)
    }
  }

  console.log(`translations: `, translations)

  if (pageType === `post`) {
    if (data) {
      props.data.post = data.localizedPost || data.defaultPost
    }

    element = <PostLayout {...props}>{initialElement}</PostLayout>
  } else {
    element = initialElement
  }

  return (
    <LocaleProvider
      locale={locale}
      defaultLocale={defaultLocale}
      translations={translations}
    >
      <Layout>{element}</Layout>
    </LocaleProvider>
  )
}

const transform = translations => {
  return translations.reduce((obj, translation) => {
    return translation.edges.reduce((o, nodeWrapper) => {
      const { node } = nodeWrapper

      if (!o[node.locale]) {
        o[node.locale] = {}
      }

      if (!o[node.locale][node.type]) {
        o[node.locale][node.type] = {}
      }

      if (!o[node.locale][node.type][node.name]) {
        o[node.locale][node.type][node.name] = node.map
      }

      return o
    }, obj)
  }, {})
}
