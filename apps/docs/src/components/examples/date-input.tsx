import type { CSSPropertiesEditorContext, CssProperty } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

export const dateInputExampleCss = `
  .rp-preview [data-scope='date-input'][data-part='root'] {
    width: min(10rem, 100%);
    max-width: 10rem;
  }

  .rp-preview [data-scope='date-input'][data-part='root'].date-input-wide-preview {
    width: min(24rem, 100%);
    max-width: 24rem;
  }

  .date-input-state {
    margin-top: var(--spacing-3);
    color: var(--color-muted-foreground);
    font-size: var(--text-sm);
    line-height: var(--line-height-text-sm);
  }

  .date-input-state-grid {
    display: grid;
    gap: var(--spacing-3);
  }

  .date-input-range-control {
    gap: var(--spacing-2);
  }

  .date-input-root-provider-actions {
    display: flex;
    gap: var(--spacing-2);
    margin-top: var(--spacing-3);
  }

  .date-input-root-provider-actions button {
    border: var(--border-width-sm) solid var(--color-border);
    border-radius: var(--radius-sm);
    padding: var(--spacing-1) var(--spacing-2);
    background: var(--color-background);
    color: var(--color-foreground);
  }

  .date-input-custom-control {
    --date-input-bg: var(--color-muted);
    --date-input-border-color: var(--color-primary);
    --date-input-focus-ring-color: var(--color-primary);
  }

  .date-input-custom-segment {
    --date-input-segment-bg-focus: color-mix(in oklab, var(--color-primary) 14%, transparent);
    --date-input-segment-color-focus: var(--color-foreground);
  }

  .date-input-day-segment {
    --date-input-segment-bg-focus: color-mix(in oklab, var(--color-primary) 18%, transparent);
    --date-input-segment-color-focus: var(--color-primary);

    font-weight: var(--weight-semibold);
  }

  .date-input-field-preview {
    width: fit-content;
    margin-inline: auto;
  }
`;

const dateInputOverrideCssProperties: CssProperty[] = [
  {
    name: '--date-input-bg',
    defaultValue: 'var(--color-background)',
    description: 'Controls the control background.',
  },
  {
    name: '--date-input-border-color',
    defaultValue: 'var(--color-border)',
    description: 'Controls the default control border color.',
  },
  {
    name: '--date-input-border-color-invalid',
    defaultValue: 'var(--color-destructive)',
    description: 'Controls invalid border and focus ring color.',
  },
  {
    name: '--date-input-border-style',
    defaultValue: 'solid',
    description: 'Controls the control border style.',
  },
  {
    name: '--date-input-border-width',
    defaultValue: 'var(--border-width-sm)',
    description: 'Controls the control border width.',
  },
  {
    name: '--date-input-color',
    defaultValue: 'var(--color-foreground)',
    description: 'Controls the control text color.',
  },
  {
    name: '--date-input-control-height',
    defaultValue: 'var(--size-md)',
    description: 'Controls the minimum control height.',
  },
  {
    name: '--date-input-control-width',
    defaultValue: '100%',
    description: 'Controls the visual control width.',
  },
  {
    name: '--date-input-disabled-opacity',
    defaultValue: 'var(--opacity-disabled)',
    description: 'Controls disabled root opacity.',
  },
  {
    name: '--date-input-focus-ring-color',
    defaultValue: 'var(--color-ring)',
    description: 'Controls the focused control outline color.',
  },
  {
    name: '--date-input-focus-ring-offset',
    defaultValue: '-1px',
    description: 'Controls the focused control outline offset.',
  },
  {
    name: '--date-input-focus-ring-width',
    defaultValue: 'var(--date-input-border-width, var(--border-width-sm))',
    description: 'Controls the focused control outline width.',
  },
  {
    name: '--date-input-gap',
    defaultValue: 'var(--spacing-1)',
    description: 'Controls spacing between root children.',
  },
  {
    name: '--date-input-label-color',
    defaultValue: 'var(--color-foreground)',
    description: 'Controls label text color.',
  },
  {
    name: '--date-input-label-font-size',
    defaultValue: 'var(--text-sm)',
    description: 'Controls label font size.',
  },
  {
    name: '--date-input-label-font-weight',
    defaultValue: 'var(--weight-medium)',
    description: 'Controls label font weight.',
  },
  {
    name: '--date-input-label-line-height',
    defaultValue: 'var(--line-height-text-sm)',
    description: 'Controls label line height.',
  },
  {
    name: '--date-input-max-width',
    defaultValue: 'none',
    description: 'Controls root maximum width.',
  },
  {
    name: '--date-input-padding-x',
    defaultValue: '0.75rem',
    description: 'Controls horizontal control padding.',
  },
  {
    name: '--date-input-padding-y',
    defaultValue: '0.5rem',
    description: 'Controls vertical control padding.',
  },
  {
    name: '--date-input-placeholder-color',
    defaultValue: 'var(--color-muted-foreground)',
    description: 'Controls placeholder segment color.',
  },
  {
    name: '--date-input-radius',
    defaultValue: 'var(--radius-md)',
    description: 'Controls the control corner radius.',
  },
  {
    name: '--date-input-segment-bg-focus',
    defaultValue: 'color-mix(in oklab, var(--color-ring) 18%, transparent)',
    description: 'Controls focused segment background.',
  },
  {
    name: '--date-input-segment-color',
    defaultValue: 'currentColor',
    description: 'Controls segment text color.',
  },
  {
    name: '--date-input-segment-color-focus',
    defaultValue: 'var(--color-foreground)',
    description: 'Controls focused segment text color.',
  },
  {
    name: '--date-input-segment-gap',
    defaultValue: 'var(--border-width-md)',
    description: 'Controls spacing between date segments.',
  },
  {
    name: '--date-input-segment-line-height',
    defaultValue: 'var(--line-height-text-md)',
    description: 'Controls segment line height.',
  },
  {
    name: '--date-input-segment-min-width',
    defaultValue: '2ch',
    description: 'Controls segment minimum width.',
  },
  {
    name: '--date-input-segment-padding-x',
    defaultValue: 'var(--spacing-1)',
    description: 'Controls segment horizontal padding.',
  },
  {
    name: '--date-input-segment-padding-y',
    defaultValue: '0',
    description: 'Controls segment vertical padding.',
  },
  {
    name: '--date-input-segment-radius',
    defaultValue: 'var(--radius-sm)',
    description: 'Controls segment corner radius.',
  },
  {
    name: '--date-input-separator-color',
    defaultValue: 'var(--color-muted-foreground)',
    description: 'Controls literal and separator text color.',
  },
  {
    name: '--date-input-transition',
    defaultValue: 'var(--transition-default)',
    description: 'Controls date input transition timing.',
  },
  {
    name: '--date-input-width',
    defaultValue: '100%',
    description: 'Controls root width.',
  },
];

export function DateInputCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return <CSSPropertiesReferenceTable properties={dateInputOverrideCssProperties} />;
}