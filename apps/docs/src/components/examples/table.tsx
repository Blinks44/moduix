import type { CSSPropertiesEditorContext, CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

const tableOverrideCssProperties: CssPropertyInput[] = [
  ['--moduix-table-border-color', 'var(--moduix-color-border)', 'Controls table divider color.'],
  [
    '--moduix-table-border-width',
    'var(--moduix-border-width-sm)',
    'Controls table divider thickness.',
  ],
  [
    '--moduix-table-caption-color',
    'var(--moduix-color-muted-foreground)',
    'Controls caption text color.',
  ],
  ['--moduix-table-caption-font-size', 'var(--moduix-text-sm)', 'Controls caption font size.'],
  [
    '--moduix-table-caption-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls caption line height.',
  ],
  [
    '--moduix-table-caption-padding-edge',
    'var(--moduix-spacing-2)',
    'Controls the outer top or bottom inset around the caption.',
  ],
  [
    '--moduix-table-caption-padding-x',
    'var(--moduix-table-cell-padding-x, var(--moduix-spacing-4))',
    'Controls caption horizontal inset.',
  ],
  [
    '--moduix-table-caption-padding-y',
    'var(--moduix-spacing-3)',
    'Controls spacing between the caption and the table.',
  ],
  ['--moduix-table-cell-padding-x', 'var(--moduix-spacing-4)', 'Controls cell horizontal padding.'],
  ['--moduix-table-cell-padding-y', 'var(--moduix-spacing-3)', 'Controls cell vertical padding.'],
  ['--moduix-table-color', 'var(--moduix-color-foreground)', 'Controls table text color.'],
  [
    '--moduix-table-column-border-color',
    'var(--moduix-table-border-color, var(--moduix-color-border))',
    'Controls column border color.',
  ],
  [
    '--moduix-table-column-border-width',
    'var(--moduix-table-border-width, var(--moduix-border-width-sm))',
    'Controls column border width.',
  ],
  [
    '--moduix-table-column-header-color',
    'var(--moduix-color-muted-foreground)',
    'Controls column header cell color.',
  ],
  [
    '--moduix-table-column-header-font-weight',
    'var(--moduix-weight-medium)',
    'Controls column header font weight.',
  ],
  [
    '--moduix-table-scroll-area-bg',
    'var(--moduix-color-card)',
    'Controls `Table.ScrollArea` background color.',
  ],
  [
    '--moduix-table-scroll-area-border-color',
    'var(--moduix-table-border-color, var(--moduix-color-border))',
    'Controls `Table.ScrollArea` border color.',
  ],
  [
    '--moduix-table-scroll-area-border-width',
    'var(--moduix-table-border-width, var(--moduix-border-width-sm))',
    'Controls `Table.ScrollArea` border width.',
  ],
  [
    '--moduix-table-scroll-area-radius',
    'var(--moduix-radius-lg)',
    'Controls `Table.ScrollArea` border radius.',
  ],
  ['--moduix-table-scroll-area-shadow', 'none', 'Controls `Table.ScrollArea` shadow.'],
  [
    '--moduix-table-empty-color',
    'var(--moduix-color-muted-foreground)',
    'Controls `Table.Empty` text color.',
  ],
  [
    '--moduix-table-empty-padding-y',
    'calc(var(--moduix-table-cell-padding-y, var(--moduix-spacing-3)) * 2)',
    'Controls `Table.Empty` vertical padding.',
  ],
  ['--moduix-table-font-family', 'var(--moduix-font-sans)', 'Controls table font family.'],
  ['--moduix-table-font-size', 'var(--moduix-text-sm)', 'Controls table font size.'],
  ['--moduix-table-font-size-lg', 'var(--moduix-text-md)', 'Controls large table font size.'],
  ['--moduix-table-font-size-sm', 'var(--moduix-text-xs)', 'Controls small table font size.'],
  ['--moduix-table-footer-bg', 'var(--moduix-color-muted)', 'Controls footer background color.'],
  [
    '--moduix-table-footer-color',
    'var(--moduix-table-color, var(--moduix-color-foreground))',
    'Controls footer color.',
  ],
  [
    '--moduix-table-footer-font-weight',
    'var(--moduix-weight-medium)',
    'Controls footer font weight.',
  ],
  [
    '--moduix-table-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls table line height.',
  ],
  [
    '--moduix-table-line-height-lg',
    'var(--moduix-line-height-text-md)',
    'Controls large table line height.',
  ],
  [
    '--moduix-table-line-height-sm',
    'var(--moduix-line-height-text-xs)',
    'Controls small table line height.',
  ],
  [
    '--moduix-table-row-bg-hover',
    'var(--moduix-color-muted)',
    'Controls body row hover background.',
  ],
  [
    '--moduix-table-row-bg-striped',
    'color-mix(in oklab, var(--moduix-color-muted) 35%, transparent)',
    'Controls striped even-row background.',
  ],
  [
    '--moduix-table-row-transition',
    'background-color var(--moduix-transition-default)',
    'Controls body row hover transition.',
  ],
  [
    '--moduix-table-sticky-column-bg',
    'var(--moduix-table-scroll-area-bg, var(--moduix-color-card))',
    'Controls sticky column background.',
  ],
  ['--moduix-table-sticky-column-z-index', '2', 'Controls sticky column stacking.'],
  [
    '--moduix-table-sticky-header-bg',
    'var(--moduix-table-scroll-area-bg, var(--moduix-color-card))',
    'Controls sticky header background.',
  ],
  ['--moduix-table-sticky-header-z-index', '3', 'Controls sticky header stacking.'],
  ['--moduix-table-sticky-intersection-z-index', '4', 'Controls sticky header/column stacking.'],
] as const;

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { defaultValue: property[1], description: property[2], name: property[0] };
  }

  return property;
}

export function TableCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={tableOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}