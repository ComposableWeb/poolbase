import * as React from "react"
import { useTranslation } from "react-i18next"
import Layout from "../components/Layout"

const IndexPage = () => {
  const [t] = useTranslation(`index`)

  return (
    <Layout>
      <div>
        {t(`title`)} <br />
      </div>
    </Layout>
  )
}

export default IndexPage
