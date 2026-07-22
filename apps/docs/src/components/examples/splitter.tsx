import type { CSSPropertiesEditorContext, CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

export const splitterExampleCss = `
.splitter-demo {
  --splitter-width: min(56rem, 100%);
  --splitter-height: 28rem;
}

.splitter-panel {
  display: grid;
  place-items: center;
  font-weight: var(--weight-medium);
}
`;

export const splitterVerticalCss = `
.splitter-vertical {
  --splitter-width: min(34rem, 100%);
  --splitter-height: 28rem;
}

.splitter-panel {
  display: grid;
  place-items: center;
  font-weight: var(--weight-medium);
}

.splitter-vertical > .splitter-panel {
  min-height: 0;
}
`;

export const splitterStackCss = `
.splitter-stack {
  display: grid;
  gap: var(--spacing-4);
  width: min(56rem, 100%);
  min-width: min(42rem, 100%);
}

.splitter-demo {
  --splitter-width: min(56rem, 100%);
  --splitter-height: 28rem;
}

.splitter-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-2);
}

.splitter-status {
  color: var(--color-muted-foreground);
  font-size: var(--text-sm);
  line-height: var(--line-height-text-sm);
}

.splitter-panel {
  display: grid;
  place-items: center;
  font-weight: var(--weight-medium);
}
`;

export const splitterNestedCss = `
.splitter-nested {
  --splitter-width: min(56rem, 100%);
  --splitter-height: 30rem;
}

.splitter-panel {
  display: grid;
  place-items: center;
  font-weight: var(--weight-medium);
}

.splitter-nested [data-orientation="vertical"] {
  --splitter-height: 100%;
  min-height: 0;
}

.splitter-nested [data-orientation="vertical"] > [data-slot="splitter-panel"] {
  min-height: 0;
}
`;

const splitterOverrideCssProperties: CssPropertyInput[] = [
  ['--splitter-height', '28rem', 'Controls the root height.'],
  ['--splitter-width', '100%', 'Controls the root width.'],
  ['--splitter-min-height', '0', 'Controls the root minimum height.'],
  ['--splitter-min-width', '0', 'Controls the root minimum width.'],
  ['--splitter-bg', 'var(--color-card)', 'Controls the root background.'],
  ['--splitter-border-color', 'var(--color-border)', 'Controls the root border color.'],
  ['--splitter-border-width', 'var(--border-width-sm)', 'Controls the root border width.'],
  ['--splitter-radius', 'var(--radius-md)', 'Controls the root corner radius.'],
  ['--splitter-shadow', 'var(--shadow-sm)', 'Controls the root shadow.'],
  ['--splitter-color', 'var(--color-foreground)', 'Controls default text color.'],
  ['--splitter-panel-bg', 'var(--color-card)', 'Controls panel background color.'],
  ['--splitter-panel-border-color', 'var(--color-border)', 'Controls panel border color.'],
  ['--splitter-panel-border-width', '0', 'Controls optional panel border width.'],
  ['--splitter-panel-color', 'var(--color-card-foreground)', 'Controls panel text color.'],
  ['--splitter-panel-min-height', '12.5rem', 'Controls panel minimum height.'],
  ['--splitter-panel-min-height-vertical', '0', 'Controls vertical panel minimum height.'],
  ['--splitter-panel-min-width', '0', 'Controls panel minimum width.'],
  ['--splitter-panel-padding', 'var(--spacing-4)', 'Controls panel padding.'],
  ['--splitter-panel-radius', '0', 'Controls optional panel corner radius.'],
  ['--splitter-panel-shadow', 'none', 'Controls optional panel shadow.'],
  ['--splitter-resize-trigger-bg', 'transparent', 'Controls the resize trigger background.'],
  ['--splitter-resize-trigger-size', 'var(--spacing-2-5)', 'Controls the resize handle hit area.'],
  ['--splitter-resize-trigger-line-length', '100%', 'Controls the visible splitter line length.'],
  [
    '--splitter-resize-trigger-line-radius',
    'var(--radius-full)',
    'Controls the visible splitter line radius.',
  ],
  ['--splitter-resize-trigger-line-size', '1px', 'Controls the splitter layout divider size.'],
  [
    '--splitter-resize-trigger-line-thickness',
    '0.5px',
    'Controls the visual splitter line thickness without changing layout.',
  ],
  [
    '--splitter-resize-trigger-line-color',
    'var(--color-border)',
    'Controls the idle splitter line color.',
  ],
  [
    '--splitter-resize-trigger-line-color-dragging',
    'color-mix(in oklab, var(--splitter-resize-trigger-line-color, var(--color-border)) 72%, var(--color-muted-foreground))',
    'Controls the splitter line color while dragging.',
  ],
  [
    '--splitter-resize-trigger-line-color-hover',
    'color-mix(in oklab, var(--splitter-resize-trigger-line-color, var(--color-border)) 72%, var(--color-muted-foreground))',
    'Controls the splitter line color on hover.',
  ],
  [
    '--splitter-resize-trigger-indicator-bg',
    'var(--color-background)',
    'Controls the handle indicator background.',
  ],
  [
    '--splitter-resize-trigger-indicator-bg-dragging',
    'var(--splitter-resize-trigger-indicator-bg, var(--color-background))',
    'Controls the handle indicator background while dragging.',
  ],
  [
    '--splitter-resize-trigger-indicator-border-color',
    'var(--color-border)',
    'Controls the handle indicator border color.',
  ],
  [
    '--splitter-resize-trigger-indicator-border-width',
    'var(--border-width-sm)',
    'Controls the handle indicator border width.',
  ],
  [
    '--splitter-resize-trigger-indicator-border-color-dragging',
    'var(--splitter-resize-trigger-indicator-border-color, var(--color-border))',
    'Controls the handle indicator border color while dragging.',
  ],
  [
    '--splitter-resize-trigger-indicator-border-color-hover',
    'color-mix(in oklab, var(--splitter-resize-trigger-indicator-border-color, var(--color-border)) 72%, var(--color-muted-foreground))',
    'Controls the handle indicator border color on hover.',
  ],
  [
    '--splitter-resize-trigger-indicator-height',
    'var(--size-xs)',
    'Controls the handle indicator length.',
  ],
  [
    '--splitter-resize-trigger-indicator-radius',
    'var(--radius-full)',
    'Controls the handle indicator radius.',
  ],
  [
    '--splitter-resize-trigger-indicator-shadow',
    'var(--shadow-sm)',
    'Controls the handle indicator shadow.',
  ],
  [
    '--splitter-resize-trigger-indicator-shadow-dragging',
    'var(--shadow-md)',
    'Controls the handle indicator shadow while dragging.',
  ],
  [
    '--splitter-resize-trigger-indicator-shadow-hover',
    'var(--shadow-md)',
    'Controls the handle indicator shadow on hover.',
  ],
  [
    '--splitter-resize-trigger-indicator-width',
    'var(--spacing-1-5)',
    'Controls the handle indicator thickness.',
  ],
  ['--splitter-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled trigger opacity.'],
  ['--splitter-transition', 'var(--transition-default)', 'Controls splitter visual transitions.'],
];

function normalizeCssProperty(property: CssPropertyInput) {
  if ('name' in property) return property;

  const [name, defaultValue, description] = property;

  return {
    name,
    defaultValue,
    description,
  };
}

export function SplitterCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={splitterOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}