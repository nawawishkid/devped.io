import React from "react"
import Layout from "../components/layout"
import { withLocaleProvider } from "../contexts/locale"

const IndexPage = () => {
  return <Layout>Homepage!!</Layout>
}

export default withLocaleProvider(IndexPage)
