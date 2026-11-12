import { pluginBabel } from '@rsbuild/plugin-babel';
import { pluginSolid } from '@rsbuild/plugin-solid';
import { pluginSvelte } from '@rsbuild/plugin-svelte';
import { pluginVue } from '@rsbuild/plugin-vue';
import { defineConfig } from '@rspress/core';
import { pluginPreview } from '@rspress/plugin-preview';
import { globSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pluginLastUpdatedDate } from './plugins/last-updated-date';
import { moduixShikiTheme } from './theme/shiki-theme';

const siteOrigin = 'https://moduix.dev';
const brandName = 'moduix';
const defaultTitle = brandName;
const defaultDescription =
  'Accessible React, Solid, Vue, and Svelte components built on Ark UI. One API across frameworks, styled with CSS Modules or Tailwind CSS. Install from npm or copy the source with the shadcn CLI.';
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
      'Composants React, Solid, Vue et Svelte accessibles basés sur Ark UI. Une même API pour chaque framework, avec des styles CSS Modules ou Tailwind CSS. Installation via npm ou copie du code avec la CLI shadcn.',
  },
  {
    lang: 'ru',
    label: 'Русский',
    title: brandName,
    description:
      'Доступные компоненты для React, Solid, Vue и Svelte на базе Ark UI. Один API во всех фреймворках, стили на CSS Modules или Tailwind CSS. Установка из npm или копирование исходников через CLI shadcn.',
  },
];
const blockStyles = new Map(
  globSync('src/components/blocks/**/*.module.css', {
    cwd: fileURLToPath(new URL('.', import.meta.url)),
  }).map((file) => [`./${path.basename(file)}`, fileURLToPath(new URL(file, import.meta.url))]),
);
const socialImage = `${siteOrigin}/banner.jpg`;
const socialImageAlt = 'moduix component library';

export default defineConfig({
  siteOrigin,
  title: defaultTitle,
  description: defaultDescription,
  lang: 'en',
  locales,
  icon: '/favicon/favicon.svg',
  search: {
    searchHooks: fileURLToPath(new URL('./theme/search-hooks.ts', import.meta.url)),
  },
  mediumZoom: false,
  route: {
    // In dev, hover prefetch triggers lazy compilation of the hovered page, and the HMR update of
    // the route list remounts the current page. Production builds keep prefetching.
    prefetchLink: process.env.NODE_ENV !== 'development',
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
    shiki: { theme: moduixShikiTheme },
    defaultCodeOverflow: {
      height: 520,
      behavior: 'scroll',
    },
    link: {
      checkDeadLinks: {
        excludes: ['/llms.txt', '/llms-full.txt'],
      },
      // The anchor check skips headings nested in JSX, such as `<Steps>` sections.
      checkAnchors: {
        excludes: [
          '/docs/quick-start#add-styles',
          '/docs/quick-start#ajouter-les-styles',
          '/docs/quick-start#подключите-стили',
        ],
      },
    },
  },
  builderConfig: {
    dev: {
      // Live previews import snippets and framework runtimes on demand. Lazily compiled, they arrive
      // as hot updates that fail on the first load in dev, so they compile with their page instead.
      lazyCompilation: {
        test: (module) =>
          !/[\\/](?:snippets|node_modules)[\\/]/.test(module.nameForCondition() ?? ''),
      },
    },
    plugins: [
      // Solid JSX goes through Babel before SWC compiles the React JSX of the rest of the site. The
      // `.jsx` files are the Solid builds of `@moduix/solid`, Ark Solid, and Lucide Solid.
      pluginBabel({ include: [/[\\/]snippets[\\/].+[\\/]solid[\\/].+\.tsx$/, /\.jsx$/] }),
      pluginSolid(),
      pluginVue(),
      // Svelte 5 strips TypeScript itself; svelte-preprocess would downlevel `$props()` destructuring.
      pluginSvelte({ svelteLoaderOptions: { preprocess: [] } }),
    ],
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
      // The example loader imports `?raw` sources, which the Vue and Svelte loaders would compile.
      bundlerChain: (chain, { CHAIN_ID }) => {
        for (const id of [CHAIN_ID.RULE.VUE, CHAIN_ID.RULE.SVELTE]) {
          chain.module.rule(id).resourceQuery({ not: /[?&]raw(?:&|=|$)/ });
        }
      },
      rspack: (_, { addRules, appendPlugins, rspack }) => {
        // Block snippets use the paths of installed registry code: components by their registry
        // paths and styles next to the block, which the site keeps in `src/components/blocks`.
        appendPlugins(
          new rspack.NormalModuleReplacementPlugin(
            /^(?:@\/|\.\/[\w-]+\.module\.css$)/,
            (resource) => {
              const framework = resource.context.match(
                /[\\/]snippets[\\/].+[\\/](solid|vue|svelte)$/,
              )?.[1];
              if (!framework) return;
              const component = resource.request.match(
                /^@\/(?:components|registry\/\w+)\/ui\/(.+)$/,
              )?.[1];
              if (component) resource.request = `@moduix/${framework}/${component}`;
              else resource.request = blockStyles.get(resource.request) ?? resource.request;
            },
          ),
        );
        addRules({
          test: /\.mdx$/,
          enforce: 'pre',
          loader: fileURLToPath(new URL('./plugins/example-loader.js', import.meta.url)),
        });
      },
    },
  },
  plugins: [pluginPreview(), pluginLastUpdatedDate()],
  themeConfig: {
    locales,
    llmsUI: false,
    search: true,
    socialLinks: [{ icon: 'github', mode: 'link', content: 'https://github.com/Blinks44/moduix' }],
    editLink: {
      docRepoBaseUrl: 'https://github.com/Blinks44/moduix/tree/main/website/docs',
    },
    footer: {
      message: 'Built with Rspress, Ark UI, and moduix.',
    },
  },
});