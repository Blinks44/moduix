import type { CSSPropertiesEditorContext, CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

export const splitterExampleCss = `
.splitter-demo {
  --moduix-splitter-width: min(56rem, 100%);
  --moduix-splitter-height: 28rem;
}

.splitter-panel {
  display: grid;
  place-items: center;
  font-weight: var(--moduix-weight-medium);
}
`;

export const splitterVerticalCss = `
.splitter-vertical {
  --moduix-splitter-width: min(34rem, 100%);
  --moduix-splitter-height: 28rem;
}

.splitter-panel {
  display: grid;
  place-items: center;
  font-weight: var(--moduix-weight-medium);
}

.splitter-vertical > .splitter-panel {
  min-height: 0;
}
`;

export const splitterStackCss = `
.splitter-stack {
  display: grid;
  gap: var(--moduix-spacing-4);
  width: min(56rem, 100%);
  min-width: min(42rem, 100%);
}

.splitter-demo {
  --moduix-splitter-width: min(56rem, 100%);
  --moduix-splitter-height: 28rem;
}

.splitter-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: var(--moduix-spacing-2);
}

.splitter-status {
  color: var(--moduix-color-muted-foreground);
  font-size: var(--moduix-text-sm);
  line-height: var(--moduix-line-height-text-sm);
}

.splitter-panel {
  display: grid;
  place-items: center;
  font-weight: var(--moduix-weight-medium);
}
`;

export const splitterNestedCss = `
.splitter-nested {
  --moduix-splitter-width: min(56rem, 100%);
  --moduix-splitter-height: 30rem;
}

.splitter-panel {
  display: grid;
  place-items: center;
  font-weight: var(--moduix-weight-medium);
}

.splitter-nested [data-orientation="vertical"] {
  --moduix-splitter-height: 100%;
  min-height: 0;
}

.splitter-nested [data-orientation="vertical"] > [data-slot="splitter-panel"] {
  min-height: 0;
}
`;

const splitterOverrideCssProperties: CssPropertyInput[] = [
  ['--moduix-splitter-height', '28rem', 'Controls the root height.'],
  ['--moduix-splitter-width', '100%', 'Controls the root width.'],
  ['--moduix-splitter-min-height', '0', 'Controls the root minimum height.'],
  ['--moduix-splitter-min-width', '0', 'Controls the root minimum width.'],
  ['--moduix-splitter-bg', 'var(--moduix-color-card)', 'Controls the root background.'],
  [
    '--moduix-splitter-border-color',
    'var(--moduix-color-border)',
    'Controls the root border color.',
  ],
  [
    '--moduix-splitter-border-width',
    'var(--moduix-border-width-sm)',
    'Controls the root border width.',
  ],
  ['--moduix-splitter-radius', 'var(--moduix-radius-md)', 'Controls the root corner radius.'],
  ['--moduix-splitter-shadow', 'var(--moduix-shadow-sm)', 'Controls the root shadow.'],
  ['--moduix-splitter-color', 'var(--moduix-color-foreground)', 'Controls default text color.'],
  ['--moduix-splitter-panel-bg', 'var(--moduix-color-card)', 'Controls panel background color.'],
  [
    '--moduix-splitter-panel-border-color',
    'var(--moduix-color-border)',
    'Controls panel border color.',
  ],
  ['--moduix-splitter-panel-border-width', '0', 'Controls optional panel border width.'],
  [
    '--moduix-splitter-panel-color',
    'var(--moduix-color-card-foreground)',
    'Controls panel text color.',
  ],
  ['--moduix-splitter-panel-min-height', '12.5rem', 'Controls panel minimum height.'],
  ['--moduix-splitter-panel-min-height-vertical', '0', 'Controls vertical panel minimum height.'],
  ['--moduix-splitter-panel-min-width', '0', 'Controls panel minimum width.'],
  ['--moduix-splitter-panel-padding', 'var(--moduix-spacing-4)', 'Controls panel padding.'],
  ['--moduix-splitter-panel-radius', '0', 'Controls optional panel corner radius.'],
  ['--moduix-splitter-panel-shadow', 'none', 'Controls optional panel shadow.'],
  ['--moduix-splitter-resize-trigger-bg', 'transparent', 'Controls the resize trigger background.'],
  [
    '--moduix-splitter-resize-trigger-size',
    'var(--moduix-spacing-2-5)',
    'Controls the resize handle hit area.',
  ],
  [
    '--moduix-splitter-resize-trigger-line-length',
    '100%',
    'Controls the visible splitter line length.',
  ],
  [
    '--moduix-splitter-resize-trigger-line-radius',
    'var(--moduix-radius-full)',
    'Controls the visible splitter line radius.',
  ],
  [
    '--moduix-splitter-resize-trigger-line-size',
    '1px',
    'Controls the splitter layout divider size.',
  ],
  [
    '--moduix-splitter-resize-trigger-line-thickness',
    '0.5px',
    'Controls the visual splitter line thickness without changing layout.',
  ],
  [
    '--moduix-splitter-resize-trigger-line-color',
    'var(--moduix-color-border)',
    'Controls the idle splitter line color.',
  ],
  [
    '--moduix-splitter-resize-trigger-line-color-dragging',
    'color-mix(in oklab, var(--moduix-splitter-resize-trigger-line-color, var(--moduix-color-border)) 72%, var(--moduix-color-muted-foreground))',
    'Controls the splitter line color while dragging.',
  ],
  [
    '--moduix-splitter-resize-trigger-line-color-hover',
    'color-mix(in oklab, var(--moduix-splitter-resize-trigger-line-color, var(--moduix-color-border)) 72%, var(--moduix-color-muted-foreground))',
    'Controls the splitter line color on hover.',
  ],
  [
    '--moduix-splitter-resize-trigger-indicator-bg',
    'var(--moduix-color-background)',
    'Controls the handle indicator background.',
  ],
  [
    '--moduix-splitter-resize-trigger-indicator-bg-dragging',
    'var(--moduix-splitter-resize-trigger-indicator-bg, var(--moduix-color-background))',
    'Controls the handle indicator background while dragging.',
  ],
  [
    '--moduix-splitter-resize-trigger-indicator-border-color',
    'var(--moduix-color-border)',
    'Controls the handle indicator border color.',
  ],
  [
    '--moduix-splitter-resize-trigger-indicator-border-width',
    'var(--moduix-border-width-sm)',
    'Controls the handle indicator border width.',
  ],
  [
    '--moduix-splitter-resize-trigger-indicator-border-color-dragging',
    'var(--moduix-splitter-resize-trigger-indicator-border-color, var(--moduix-color-border))',
    'Controls the handle indicator border color while dragging.',
  ],
  [
    '--moduix-splitter-resize-trigger-indicator-border-color-hover',
    'color-mix(in oklab, var(--moduix-splitter-resize-trigger-indicator-border-color, var(--moduix-color-border)) 72%, var(--moduix-color-muted-foreground))',
    'Controls the handle indicator border color on hover.',
  ],
  [
    '--moduix-splitter-resize-trigger-indicator-height',
    'var(--moduix-size-xs)',
    'Controls the handle indicator length.',
  ],
  [
    '--moduix-splitter-resize-trigger-indicator-radius',
    'var(--moduix-radius-full)',
    'Controls the handle indicator radius.',
  ],
  [
    '--moduix-splitter-resize-trigger-indicator-shadow',
    'var(--moduix-shadow-sm)',
    'Controls the handle indicator shadow.',
  ],
  [
    '--moduix-splitter-resize-trigger-indicator-shadow-dragging',
    'var(--moduix-shadow-md)',
    'Controls the handle indicator shadow while dragging.',
  ],
  [
    '--moduix-splitter-resize-trigger-indicator-shadow-hover',
    'var(--moduix-shadow-md)',
    'Controls the handle indicator shadow on hover.',
  ],
  [
    '--moduix-splitter-resize-trigger-indicator-width',
    'var(--moduix-spacing-1-5)',
    'Controls the handle indicator thickness.',
  ],
  [
    '--moduix-splitter-disabled-opacity',
    'var(--moduix-opacity-disabled)',
    'Controls disabled trigger opacity.',
  ],
  [
    '--moduix-splitter-transition',
    'var(--moduix-transition-default)',
    'Controls splitter visual transitions.',
  ],
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