import { useTranslation } from 'react-i18next'
import { profile } from '../data/profile'

/**
 * Returns profile data resolved to the current language.
 * For any field FOO that has a FOO_zh counterpart, the Chinese
 * version is used when the current language is zh; otherwise
 * the default (English) field is used.
 */
function resolveLang(obj, lang) {
  if (Array.isArray(obj)) {
    return obj.map((item) => resolveLang(item, lang))
  }
  if (obj && typeof obj === 'object') {
    const resolved = {}
    for (const key of Object.keys(obj)) {
      if (key.endsWith('_zh') || key.endsWith('_en')) continue
      const zhKey = key + '_zh'
      if (lang === 'zh' && zhKey in obj && obj[zhKey] != null) {
        resolved[key] = resolveLang(obj[zhKey], lang)
      } else {
        resolved[key] = resolveLang(obj[key], lang)
      }
    }
    return resolved
  }
  return obj
}

export function useProfile() {
  const { i18n } = useTranslation()
  const lang = i18n.language.startsWith('zh') ? 'zh' : 'en'
  return resolveLang(profile, lang)
}
