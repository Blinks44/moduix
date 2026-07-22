import { defineConfig } from '@rspress/core';
import { pluginPreview } from '@rspress/plugin-preview';
import { pluginSitemap } from '@rspress/plugin-sitemap';

const siteOrigin = 'https://moduix.dev';
const siteTitle = 'moduix';
const siteDescription =
  'Accessible React components with calm defaults, explicit composition, and token-first CSS.';
const socialImage = `${siteOrigin}/banner.png`;
const socialImageAlt = 'moduix component library';

export default defineConfig({
  title: siteTitle,
  description: siteDescription,
  siteOrigin,
  lang: 'en',
  locales: [
    {
      lang: 'en',
      label: 'English',
      title: siteTitle,
      description: siteDescription,
    },
  ],
  icon: '/favicon/favicon.svg',
  llms: true,
  mediumZoom: false,
  head: [
    ['meta', { name: 'apple-mobile-web-app-title', content: siteTitle }],
    ['meta', { name: 'robots', content: 'index, follow' }],
    ['meta', { property: 'og:site_name', content: siteTitle }],
    ['meta', { property: 'og:image', content: socialImage }],
    ['meta', { property: 'og:image:alt', content: socialImageAlt }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: socialImage }],
    ['meta', { name: 'twitter:image:alt', content: socialImageAlt }],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        href: '/favicon/favicon-96x96.png',
        sizes: '96x96',
      },
    ],
    ['link', { rel: 'shortcut icon', href: '/favicon/favicon.ico' }],
    [
      'link',
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/favicon/apple-touch-icon.png',
      },
    ],
    ['link', { rel: 'manifest', href: '/favicon/site.webmanifest' }],
    (route) => ['meta', { property: 'og:url', content: new URL(route.routePath, siteOrigin).href }],
    (route) => ['link', { rel: 'canonical', href: new URL(route.routePath, siteOrigin).href }],
  ],
  markdown: {
    defaultCodeOverflow: {
      height: 600,
      behavior: 'scroll',
    },
    link: {
      checkDeadLinks: {
        excludes: ['/llms.txt', '/llms-full.txt'],
      },
    },
  },
  plugins: [pluginPreview(), pluginSitemap()],
  themeConfig: {
    llmsUI: false,
    search: true,
    lastUpdated: true,
    editLink: {
      docRepoBaseUrl: 'https://github.com/Blinks44/moduix/tree/main/apps/docs/docs',
    },
    footer: {
      message: 'Built with Rspress, Ark UI, and moduix.',
    },
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/Blinks44/moduix',
      },
    ],
  },
});