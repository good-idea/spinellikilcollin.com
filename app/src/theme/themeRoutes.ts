import { DefaultTheme } from '@xstyled/styled-components'
import { defaultTheme } from './defaultTheme'
import { journalTheme } from './journalTheme'
import { magazineTheme } from './magazineTheme'

interface ThemeRoute {
  pattern: RegExp
  theme: ((t: DefaultTheme) => DefaultTheme) | DefaultTheme
}

const routes: ThemeRoute[] = [
  {
    pattern: /^\/journal/,
    theme: journalTheme,
  },
  {
    pattern: /^\/925/,
    theme: magazineTheme,
  },
]

export const getThemeByRoute = (path: string): DefaultTheme => {
  const route = routes.find((r) => r.pattern.test(path))
  console.log(path, route)
  if (!route) return defaultTheme
  const { theme } = route
  if (typeof theme === 'function') {
    return theme(defaultTheme)
  }
  return theme
}