import { useLang } from '@rspress/core/runtime';

export function getLocalizedPath(path: string, lang: string) {
  if (lang === 'en' || !path.startsWith('/') || path.startsWith('//')) return path;

  const localePrefix = `/${lang}`;
  return path === localePrefix || path.startsWith(`${localePrefix}/`)
    ? path
    : `${localePrefix}${path}`;
}

export function useLocalizedPath(path: string) {
  return getLocalizedPath(path, useLang());
}