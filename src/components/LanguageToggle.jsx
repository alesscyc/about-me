import { useTranslation } from 'react-i18next'

function LanguageToggle() {
  const { i18n, t } = useTranslation()
  const nextLang = i18n.language.startsWith('zh') ? 'en' : 'zh'

  return (
    <button
      className="lang-toggle"
      onClick={() => i18n.changeLanguage(nextLang)}
      aria-label={`Switch to ${nextLang === 'zh' ? 'Chinese' : 'English'}`}
    >
      {t('switchLang')}
    </button>
  )
}

export default LanguageToggle
