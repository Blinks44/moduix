import type { CssPropertyInput } from '../../mdx/reference';

export const tableOverrideCssProperties: CssPropertyInput[] = [
  [
    '--moduix-table-bg',
    'var(--moduix-card)',
    'Controls the TableScrollArea, sticky header, and sticky cell background.',
  ],
  [
    '--moduix-table-border-color',
    'var(--moduix-border)',
    'Controls row, column, footer, and TableScrollArea border color.',
  ],
  [
    '--moduix-table-cell-padding-x',
    'var(--moduix-spacing-4), sm var(--moduix-spacing-3), lg var(--moduix-spacing-5)',
    'Overrides cell and caption horizontal padding for every size.',
    'table-cell',
  ],
  [
    '--moduix-table-cell-padding-y',
    'var(--moduix-spacing-3), sm var(--moduix-spacing-2), lg var(--moduix-spacing-4)',
    'Overrides cell vertical padding for every size; the empty cell uses twice this value.',
  ],
  [
    '--moduix-table-row-bg-hover',
    'var(--moduix-muted)',
    'Controls interactive row background on hover and focus within.',
    'table-body',
  ],
  [
    '--moduix-table-row-bg-striped',
    'color-mix(in oklab, var(--moduix-muted) 35%, transparent)',
    'Controls the background of even striped rows.',
    'table-body',
  ],
];