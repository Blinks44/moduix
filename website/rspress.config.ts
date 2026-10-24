import { defineConfig } from '@rspress/core';
import { pluginPreview } from '@rspress/plugin-preview';
import { pluginSitemap } from '@rspress/plugin-sitemap';
import { fileURLToPath } from 'node:url';

const siteOrigin = 'https://moduix.dev';
const brandName = 'moduix';
const defaultTitle = brandName;
const defaultDescription =
  'Accessible React, Solid, and Vue components built on Ark UI. One API across frameworks, styled with CSS Modules or Tailwind CSS. Install from npm or copy the source with the shadcn CLI.';
const locales = [
  {
    lang: 'en',
    label: 'English',
    title: defaultTitle,
    description: defaultDescription,
  },
  {
    lang: 'fr',
    label: 'Français',
    title: brandName,
    description:
      'Composants React, Solid et Vue accessibles basés sur Ark UI. Une même API pour chaque framework, avec des styles CSS Modules ou Tailwind CSS. Installation via npm ou copie du code avec la CLI shadcn.',
  },
  {
    lang: 'ru',
    label: 'Русский',
    title: brandName,
    description:
      'Доступные компоненты для React, Solid и Vue на базе Ark UI. Один API во всех фреймворках, стили на CSS Modules или Tailwind CSS. Установка из npm или копирование исходников через CLI shadcn.',
  },
];
const socialImage = `${siteOrigin}/banner.jpg`;
const socialImageAlt = 'moduix component library';

export default defineConfig({
  siteOrigin,
  title: defaultTitle,
  description: defaultDescription,
  lang: 'en',
  locales,
  icon: '/favicon/favicon.svg',
  llms: true,
  mediumZoom: false,
  route: {
    cleanUrls: true,
  },
  head: [
    ['meta', { name: 'apple-mobile-web-app-title', content: brandName }],
    ['meta', { name: 'robots', content: 'index, follow' }],
    ['meta', { property: 'og:site_name', content: brandName }],
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
      height: 520,
      behavior: 'scroll',
    },
    link: {
      checkDeadLinks: {
        excludes: ['/llms.txt', '/llms-full.txt'],
      },
    },
  },
  builderConfig: {
    resolve: {
      alias: {
        '@/registry/react/ui': fileURLToPath(
          new URL('../packages/react/dist/components', import.meta.url),
        ),
      },
    },
    html: {
      template: fileURLToPath(new URL('./index.html', import.meta.url)),
    },
    tools: {
      rspack: (_, { addRules }) => {
        addRules({
          test: /\.mdx$/,
          enforce: 'pre',
          loader: fileURLToPath(new URL('./plugins/example-loader.js', import.meta.url)),
        });
      },
    },
  },
  plugins: [pluginPreview(), pluginSitemap()],
  themeConfig: {
    locales,
    llmsUI: false,
    search: true,
    lastUpdated: true,
    editLink: {
      docRepoBaseUrl: 'https://github.com/Blinks44/moduix/tree/main/website/docs',
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