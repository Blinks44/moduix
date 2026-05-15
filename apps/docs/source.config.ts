import {
  createRehypeCode,
  type RehypeCodeOptionsCommon,
} from 'fumadocs-core/mdx-plugins/rehype-code.core';
import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import { getDocsShikiHighlighter } from './src/lib/shiki';

const docsShikiRehypeOptions: RehypeCodeOptionsCommon = {
  themes: {
    light: 'github-light',
    dark: 'github-dark',
  },
  langs: ['html', 'css', 'javascript', 'typescript'],
  langAlias: {
    js: 'javascript',
    jsx: 'javascript',
    ts: 'typescript',
    tsx: 'typescript',
  },
  fallbackLanguage: 'typescript',
  lazy: false,
  icon: false,
};

const rehypeCode = createRehypeCode(async () => ({
  highlighter: await getDocsShikiHighlighter(),
  options: docsShikiRehypeOptions,
}));

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
});

export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: false,
    rehypePlugins: (plugins) => [...plugins, [rehypeCode]],
  },
});