import React from "react"
import { useLocale } from "../contexts/locale"

const PostLocaleWarning = ({ locale: postLocale }) => {
  const { locale } = useLocale()

  return locale !== postLocale ? (
    <p style={{ background: `red`, color: `white` }}>
      WARNING: locale mismatch
    </p>
  ) : null
}

export default PostLocaleWarning
