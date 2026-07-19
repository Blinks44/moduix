import { appName, siteUrl } from './shared';

const socialImage = `${siteUrl}/banner.png`;
const socialImageAlt = 'moduix component library';

export function getCanonicalUrl(pathname: string) {
  return pathname === '/' ? siteUrl : `${siteUrl}${pathname}`;
}

export function createSeoMeta({
  title,
  description,
  pathname,
  type = 'website',
}: {
  title: string;
  description: string;
  pathname: string;
  type?: 'article' | 'website';
}) {
  const url = getCanonicalUrl(pathname);

  return [
    { title },
    { name: 'description', content: description },
    { name: 'robots', content: 'index, follow' },
    { property: 'og:site_name', content: appName },
    { property: 'og:type', content: type },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: url },
    { property: 'og:image', content: socialImage },
    { property: 'og:image:alt', content: socialImageAlt },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: socialImage },
    { name: 'twitter:image:alt', content: socialImageAlt },
  ];
}