import type { CSSPropertiesEditorContext, CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

const tableOverrideCssProperties: CssPropertyInput[] = [
  ['--table-border-color', 'var(--color-border)', 'Controls table divider color.'],
  ['--table-border-width', 'var(--border-width-sm)', 'Controls table divider thickness.'],
  ['--table-caption-color', 'var(--color-muted-foreground)', 'Controls caption text color.'],
  ['--table-caption-font-size', 'var(--text-sm)', 'Controls caption font size.'],
  ['--table-caption-line-height', 'var(--line-height-text-sm)', 'Controls caption line height.'],
  [
    '--table-caption-padding-edge',
    'var(--spacing-2)',
    'Controls the outer top or bottom inset around the caption.',
  ],
  [
    '--table-caption-padding-x',
    'var(--table-cell-padding-x, var(--spacing-4))',
    'Controls caption horizontal inset.',
  ],
  [
    '--table-caption-padding-y',
    'var(--spacing-3)',
    'Controls spacing between the caption and the table.',
  ],
  ['--table-cell-padding-x', 'var(--spacing-4)', 'Controls cell horizontal padding.'],
  ['--table-cell-padding-y', 'var(--spacing-3)', 'Controls cell vertical padding.'],
  ['--table-color', 'var(--color-foreground)', 'Controls table text color.'],
  [
    '--table-column-border-color',
    'var(--table-border-color, var(--color-border))',
    'Controls column border color.',
  ],
  [
    '--table-column-border-width',
    'var(--table-border-width, var(--border-width-sm))',
    'Controls column border width.',
  ],
  [
    '--table-column-header-color',
    'var(--color-muted-foreground)',
    'Controls column header cell color.',
  ],
  [
    '--table-column-header-font-weight',
    'var(--weight-medium)',
    'Controls column header font weight.',
  ],
  ['--table-scroll-area-bg', 'var(--color-card)', 'Controls `Table.ScrollArea` background color.'],
  [
    '--table-scroll-area-border-color',
    'var(--table-border-color, var(--color-border))',
    'Controls `Table.ScrollArea` border color.',
  ],
  [
    '--table-scroll-area-border-width',
    'var(--table-border-width, var(--border-width-sm))',
    'Controls `Table.ScrollArea` border width.',
  ],
  ['--table-scroll-area-radius', 'var(--radius-lg)', 'Controls `Table.ScrollArea` border radius.'],
  ['--table-scroll-area-shadow', 'none', 'Controls `Table.ScrollArea` shadow.'],
  ['--table-empty-color', 'var(--color-muted-foreground)', 'Controls `Table.Empty` text color.'],
  [
    '--table-empty-padding-y',
    'calc(var(--table-cell-padding-y, var(--spacing-3)) * 2)',
    'Controls `Table.Empty` vertical padding.',
  ],
  ['--table-font-family', 'var(--font-sans)', 'Controls table font family.'],
  ['--table-font-size', 'var(--text-sm)', 'Controls table font size.'],
  ['--table-font-size-lg', 'var(--text-md)', 'Controls large table font size.'],
  ['--table-font-size-sm', 'var(--text-xs)', 'Controls small table font size.'],
  ['--table-footer-bg', 'var(--color-muted)', 'Controls footer background color.'],
  ['--table-footer-color', 'var(--table-color, var(--color-foreground))', 'Controls footer color.'],
  ['--table-footer-font-weight', 'var(--weight-medium)', 'Controls footer font weight.'],
  ['--table-line-height', 'var(--line-height-text-sm)', 'Controls table line height.'],
  ['--table-line-height-lg', 'var(--line-height-text-md)', 'Controls large table line height.'],
  ['--table-line-height-sm', 'var(--line-height-text-xs)', 'Controls small table line height.'],
  ['--table-row-bg-hover', 'var(--color-muted)', 'Controls body row hover background.'],
  [
    '--table-row-bg-striped',
    'color-mix(in oklab, var(--color-muted) 35%, transparent)',
    'Controls striped even-row background.',
  ],
  [
    '--table-row-transition',
    'background-color var(--transition-default)',
    'Controls body row hover transition.',
  ],
  [
    '--table-sticky-column-bg',
    'var(--table-scroll-area-bg, var(--color-card))',
    'Controls sticky column background.',
  ],
  ['--table-sticky-column-z-index', '2', 'Controls sticky column stacking.'],
  [
    '--table-sticky-header-bg',
    'var(--table-scroll-area-bg, var(--color-card))',
    'Controls sticky header background.',
  ],
  ['--table-sticky-header-z-index', '3', 'Controls sticky header stacking.'],
  ['--table-sticky-intersection-z-index', '4', 'Controls sticky header/column stacking.'],
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