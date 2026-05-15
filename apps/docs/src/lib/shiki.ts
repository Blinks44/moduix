import css from '@shikijs/langs/css';
import html from '@shikijs/langs/html';
import javascript from '@shikijs/langs/javascript';
import typescript from '@shikijs/langs/typescript';
import githubDark from '@shikijs/themes/github-dark';
import githubLight from '@shikijs/themes/github-light';
import { createHighlighterCore } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';

const docsShikiThemes = {
  light: 'github-light',
  dark: 'github-dark',
} as const;

const docsShikiLangAlias = {
  js: 'javascript',
  jsx: 'javascript',
  ts: 'typescript',
  tsx: 'typescript',
} as const;

type DocsHighlighter = Awaited<ReturnType<typeof createHighlighterCore>>;
let highlighterPromise: Promise<DocsHighlighter> | undefined;

export function getDocsShikiHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighterCore({
      engine: createJavaScriptRegexEngine(),
      langs: [html, css, javascript, typescript].flat(),
      themes: [githubLight, githubDark],
      langAlias: docsShikiLangAlias,
    }).then((highlighter) => {
      patchLoadLanguage(highlighter);
      return highlighter;
    });
  }

  return highlighterPromise;
}

function patchLoadLanguage(highlighter: DocsHighlighter) {
  // Fumadocs calls `loadLanguage` for each highlight; with preloaded fixed langs we can skip it
  // to avoid Shiki alias/injection bug in the current upstream combination.
  highlighter.loadLanguage = async () => {};
}

export const docsShikiOptions = {
  themes: docsShikiThemes,
  langAlias: docsShikiLangAlias,
  fallbackLanguage: 'typescript',
} as const;