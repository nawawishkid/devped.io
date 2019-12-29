import locales from "../../content/locales"

export const translate = (ns, key, locale, fallbackLocale) => {
  const localeResource = locales[locale] || locales[fallbackLocale]

  if (!localeResource) throw new Error(`Unsupported locale: ${locale}`)

  const namespace = localeResource[ns]

  if (!namespace) throw new Error(`Unknown namespace: ${ns}`)

  const value = namespace[key]

  if (!value)
    throw new Error(
      `Unknown key "${key}" of "${ns}" namespace in "${locale}" locale`
    )

  return value
}
