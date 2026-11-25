import { pluginBabel } from '@rsbuild/plugin-babel';
import { pluginSolid } from '@rsbuild/plugin-solid';
import { pluginSvelte } from '@rsbuild/plugin-svelte';
import { pluginTailwindcss } from '@rsbuild/plugin-tailwindcss';
import { pluginVue } from '@rsbuild/plugin-vue';
import { defineConfig } from '@rspress/core';
import { pluginPreview } from '@rspress/plugin-preview';
import { globSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pluginLastUpdatedDate } from './plugins/last-updated-date';
import { pluginLlmsPerFramework } from './plugins/llms-per-framework';
import { moduixShikiTheme } from './theme/shiki-theme';

const siteOrigin = 'https://moduix.dev';
const brandName = 'moduix';
const defaultTitle = brandName;
const defaultDescription =
  'Accessible React, Solid, Vue, and Svelte components built on Ark UI. One API across frameworks, styled with CSS Modules or Tailwind CSS. Install from npm or copy the source with the shadcn CLI.';
// FR and RU docs remain frozen in `docs/fr` and `docs/ru`; only English is built and exposed.
const locales = [
  {
    lang: 'en',
    label: 'English',
    title: defaultTitle,
    description: defaultDescription,
  },
];
const websiteDir = fileURLToPath(new URL('.', import.meta.url));
const blockStyles = new Map(
  globSync('src/components/blocks/**/*.module.css', {
    cwd: websiteDir,
  }).map((file) => [`./${path.basename(file)}`, fileURLToPath(new URL(file, import.meta.url))]),
);
// Build a compact map of block slug -> UI component slugs so BlockInstall does not bundle the full
// 117 KB `registry.json` into the client.
const blockRegistry = JSON.parse(readFileSync(path.join(websiteDir, 'registry.json'), 'utf8')) as {
  items: { name: string; registryDependencies?: string[] }[];
};
const blockDependencies = Object.fromEntries(
  blockRegistry.items.map((item) => [
    item.name,
    (item.registryDependencies ?? []).map((url) =>
      (url.split('/').pop() ?? '').replace(/\.json$/, ''),
    ),
  ]),
);
const socialImage = `${siteOrigin}/banner.jpg`;
const socialImageAlt = 'moduix component library';

export default defineConfig({
  siteOrigin,
  title: defaultTitle,
  description: defaultDescription,
  lang: 'en',
  locales,
  search: {
    searchHooks: fileURLToPath(new URL('./theme/search-hooks.ts', import.meta.url)),
  },
  mediumZoom: false,
  route: {
    exclude: ['fr/**', 'ru/**'],
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
        excludes: [
          '/llms.txt',
          '/llms-full.txt',
          '/llms-react.txt',
          '/llms-solid.txt',
          '/llms-vue.txt',
          '/llms-svelte.txt',
        ],
      },
      // The anchor check skips headings and ids rendered inside JSX components such as QuickStartFlow.
      checkAnchors: {
        excludes: [
          '/docs/quick-start#add-styles',
          '/docs/quick-start#install-as-a-package',
          '/docs/quick-start#install-with-the-shadcn-cli',
        ],
      },
    },
  },
  builderConfig: {
    source: {
      define: {
        __MODUIX_BLOCK_DEPS__: JSON.stringify(blockDependencies),
      },
    },
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
      // `.jsx` files are the Solid builds of `@moduix/solid`, `@moduix/solid-tailwind`, Ark Solid, and Lucide Solid.
      pluginBabel({ include: [/[\\/]snippets[\\/].+[\\/]solid[\\/].+\.tsx$/, /\.jsx$/] }),
      pluginSolid(),
      pluginVue(),
      // Svelte 5 strips TypeScript itself; svelte-preprocess would downlevel `$props()` destructuring.
      pluginSvelte({ svelteLoaderOptions: { preprocess: [] } }),
      pluginTailwindcss(),
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
      rspack: (config, { addRules, appendPlugins, isDev, rspack }) => {
        // Pages compile lazily, but their snippets compile with them. Shared chunks would regroup as
        // more pages compile, changing the lazy-compilation proxy of the open page, which nothing
        // accepts, so the dev server reloaded that page instead of following the clicked link.
        if (isDev) config.optimization = { ...config.optimization, splitChunks: false };
        // Block snippets use the paths of installed registry code: components by their registry
        // paths and styles next to the block, which the site keeps in `src/components/blocks`.
        appendPlugins(
          new rspack.NormalModuleReplacementPlugin(
            /^(?:@\/|\.\/[\w-]+\.module\.css$)/,
            (resource) => {
              if (/[\\/]src[\\/]components[\\/]blocks-tailwind(?:[\\/]|$)/.test(resource.context)) {
                const component = resource.request.match(/^@\/registry\/react\/ui\/(.+)$/)?.[1];
                if (component) resource.request = `@moduix/react-tailwind/${component}`;
                return;
              }
              const match = resource.context.match(
                /[\\/]snippets[\\/](blocks-tailwind|.+)[\\/](solid|vue|svelte)$/,
              );
              if (!match) return;
              const [, scope, framework] = match;
              const component = resource.request.match(
                /^@\/(?:components|registry\/\w+)\/ui\/(.+)$/,
              )?.[1];
              if (component) {
                const pkg = scope === 'blocks-tailwind' ? `${framework}-tailwind` : framework;
                resource.request = `@moduix/${pkg}/${component}`;
              } else {
                resource.request = blockStyles.get(resource.request) ?? resource.request;
              }
            },
          ),
        );
        addRules({
          test: /\.(?:tsx|vue|svelte)$/,
          resourceQuery: /[?&]tailwind(?:&|=|$)/,
          enforce: 'pre',
          loader: fileURLToPath(new URL('./plugins/tailwind-example-loader.js', import.meta.url)),
        });
        addRules({
          test: /\.mdx$/,
          enforce: 'pre',
          loader: fileURLToPath(new URL('./plugins/example-loader.js', import.meta.url)),
        });
      },
    },
  },
  plugins: [pluginPreview(), pluginLastUpdatedDate(), pluginLlmsPerFramework()],
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