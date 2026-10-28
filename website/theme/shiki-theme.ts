// The nine syntax roles from the "Content & menus" board in Moduix.sketch. Colors live in
// `theme/index.css` as `--shiki-*` variables, so one theme serves Light and Dark.
const role = (name: string) => `var(--shiki-token-${name})`;

export const moduixShikiTheme = {
  name: 'moduix',
  type: 'light' as const,
  colors: {
    'editor.foreground': 'var(--shiki-foreground)',
    'editor.background': 'var(--shiki-background)',
  },
  tokenColors: [
    {
      scope: ['source', 'variable', 'meta.embedded', 'meta.jsx.children'],
      settings: { foreground: 'var(--shiki-foreground)' },
    },
    {
      scope: ['keyword', 'storage', 'storage.type', 'storage.modifier'],
      settings: { foreground: role('keyword') },
    },
    {
      scope: ['punctuation', 'meta.brace', 'keyword.operator'],
      settings: { foreground: role('punctuation') },
    },
    {
      scope: ['string', 'string.quoted', 'string.template'],
      settings: { foreground: role('string') },
    },
    {
      scope: ['entity.name.function', 'support.function', 'meta.function-call'],
      settings: { foreground: role('function') },
    },
    {
      scope: [
        'entity.name.tag',
        'support.class.component',
        'punctuation.definition.tag',
        'entity.name.type',
      ],
      settings: { foreground: role('tag') },
    },
    {
      scope: ['entity.other.attribute-name', 'support.type.property-name'],
      settings: { foreground: role('attr') },
    },
    {
      scope: ['constant', 'constant.numeric', 'support.constant', 'variable.language'],
      settings: { foreground: role('constant') },
    },
    {
      scope: ['comment', 'punctuation.definition.comment'],
      settings: { foreground: role('comment'), fontStyle: 'italic' },
    },
    {
      scope: ['markup.inserted', 'punctuation.definition.inserted'],
      settings: { foreground: role('inserted') },
    },
    {
      scope: ['markup.deleted', 'punctuation.definition.deleted'],
      settings: { foreground: role('deleted') },
    },
  ],
};