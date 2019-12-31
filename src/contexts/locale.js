import React from "react"

const LocaleContext = React.createContext()

export const LocaleProvider = ({
  children,
  locale,
  defaultLocale,
  supportedLocales,
  translations,
}) => {
  const translate = (key, name, type, handleError = null) => {
    let localeTranslations = translations[locale] || translations[defaultLocale]
    let typeLevel, nameLevel, value, shouldThrow, error

    try {
      if (!localeTranslations) {
        throw new Error(
          `No translations for "${locale}" and "${defaultLocale}" locale`
        )
      }

      typeLevel = localeTranslations[type]

      if (!typeLevel)
        throw new Error(
          `No translation type "${type}" in both "${locale}" and "${defaultLocale}" locale`
        )

      nameLevel = typeLevel[name]

      if (!nameLevel)
        throw new Error(
          `Unknown translation name "${name}" in both "${locale}" and "${defaultLocale}" locale`
        )

      const fieldName = makeFieldName(type, name, key)
      value = nameLevel[fieldName]

      if (!value)
        throw new Error(
          `No translations with "${key}" key in both "${locale}" and "${defaultLocale}" locales`
        )
    } catch (e) {
      if (typeof handleError === `function`) {
        handleError(e)
      } else {
        shouldThrow = true
        error = e
      }
    } finally {
      if (shouldThrow) throw error

      return value
    }
  }

  return (
    <LocaleContext.Provider value={{ locale, translate, supportedLocales }}>
      {children}
    </LocaleContext.Provider>
  )
}
const makeFieldName = (type, name, key) => {
  return [type, name, key].map(x => x.replace(/[ -\.]+/g, `_`)).join(`___`)
}
export const useLocale = () => React.useContext(LocaleContext)
export const withLocaleProvider = Page => props => {
  console.log(`withLocaleProvider`)
  console.log(`props: `, props)
  const { pageContext } = props

  return (
    <LocaleProvider locale={pageContext.locale}>
      <Page {...props} />
    </LocaleProvider>
  )
}
