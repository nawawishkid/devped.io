const React = require(`react`)
const { LocaleProvider } = require(`./src/contexts/locale`)
const Layout = require(`./src/components/layout`)

exports.wrapPageElement = ({ element, props }) => {
  const { pageContext } = props

  return (
    <LocaleProvider locale={pageContext.locale}>
      <Layout>{element}</Layout>
    </LocaleProvider>
  )
}
