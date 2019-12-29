import React from "react"

const LocaleContext = React.createContext()

export const LocaleProvider = ({ children, locale }) => {
  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  )
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
