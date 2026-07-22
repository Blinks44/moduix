import type { CSSPropertiesEditorContext, CssProperty } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

export const dateInputExampleCss = `
  .date-input-state {
    margin-top: var(--moduix-spacing-3);
    color: var(--moduix-color-muted-foreground);
    font-size: var(--moduix-text-sm);
    line-height: var(--moduix-line-height-text-sm);
  }

  .date-input-state-grid {
    display: grid;
    gap: var(--moduix-spacing-3);
  }

  .date-input-range-control {
    gap: var(--moduix-spacing-2);
  }

  .date-input-root-provider-actions {
    display: flex;
    gap: var(--moduix-spacing-2);
    margin-top: var(--moduix-spacing-3);
  }

  .date-input-root-provider-actions button {
    border: var(--moduix-border-width-sm) solid var(--moduix-color-border);
    border-radius: var(--moduix-radius-sm);
    padding: var(--moduix-spacing-1) var(--moduix-spacing-2);
    background: var(--moduix-color-background);
    color: var(--moduix-color-foreground);
  }

  .date-input-custom-control {
    --moduix-date-input-bg: var(--moduix-color-muted);
    --moduix-date-input-border-color: var(--moduix-color-primary);
    --moduix-date-input-focus-ring-color: var(--moduix-color-primary);
  }

  .date-input-custom-segment {
    --moduix-date-input-segment-bg-focus: color-mix(in oklab, var(--moduix-color-primary) 14%, transparent);
    --moduix-date-input-segment-color-focus: var(--moduix-color-foreground);
  }

  .date-input-day-segment {
    --moduix-date-input-segment-bg-focus: color-mix(in oklab, var(--moduix-color-primary) 18%, transparent);
    --moduix-date-input-segment-color-focus: var(--moduix-color-primary);

    font-weight: var(--moduix-weight-semibold);
  }

`;

const dateInputOverrideCssProperties: CssProperty[] = [
  {
    name: '--moduix-date-input-bg',
    defaultValue: 'var(--moduix-color-background)',
    description: 'Controls the control background.',
  },
  {
    name: '--moduix-date-input-border-color',
    defaultValue: 'var(--moduix-color-border)',
    description: 'Controls the default control border color.',
  },
  {
    name: '--moduix-date-input-border-color-invalid',
    defaultValue: 'var(--moduix-color-destructive)',
    description: 'Controls invalid border and focus ring color.',
  },
  {
    name: '--moduix-date-input-border-style',
    defaultValue: 'solid',
    description: 'Controls the control border style.',
  },
  {
    name: '--moduix-date-input-border-width',
    defaultValue: 'var(--moduix-border-width-sm)',
    description: 'Controls the control border width.',
  },
  {
    name: '--moduix-date-input-color',
    defaultValue: 'var(--moduix-color-foreground)',
    description: 'Controls the control text color.',
  },
  {
    name: '--moduix-date-input-control-height',
    defaultValue: 'var(--moduix-size-md)',
    description: 'Controls the minimum control height.',
  },
  {
    name: '--moduix-date-input-control-width',
    defaultValue: '100%',
    description: 'Controls the visual control width.',
  },
  {
    name: '--moduix-date-input-disabled-opacity',
    defaultValue: 'var(--moduix-opacity-disabled)',
    description: 'Controls disabled root opacity.',
  },
  {
    name: '--moduix-date-input-focus-ring-color',
    defaultValue: 'var(--moduix-color-ring)',
    description: 'Controls the focused control outline color.',
  },
  {
    name: '--moduix-date-input-focus-ring-offset',
    defaultValue: '-1px',
    description: 'Controls the focused control outline offset.',
  },
  {
    name: '--moduix-date-input-focus-ring-width',
    defaultValue: 'var(--moduix-date-input-border-width, var(--moduix-border-width-sm))',
    description: 'Controls the focused control outline width.',
  },
  {
    name: '--moduix-date-input-gap',
    defaultValue: 'var(--moduix-spacing-1)',
    description: 'Controls spacing between root children.',
  },
  {
    name: '--moduix-date-input-label-color',
    defaultValue: 'var(--moduix-color-foreground)',
    description: 'Controls label text color.',
  },
  {
    name: '--moduix-date-input-label-font-size',
    defaultValue: 'var(--moduix-text-sm)',
    description: 'Controls label font size.',
  },
  {
    name: '--moduix-date-input-label-font-weight',
    defaultValue: 'var(--moduix-weight-medium)',
    description: 'Controls label font weight.',
  },
  {
    name: '--moduix-date-input-label-line-height',
    defaultValue: 'var(--moduix-line-height-text-sm)',
    description: 'Controls label line height.',
  },
  {
    name: '--moduix-date-input-max-width',
    defaultValue: 'none',
    description: 'Controls root maximum width.',
  },
  {
    name: '--moduix-date-input-padding-x',
    defaultValue: '0.75rem',
    description: 'Controls horizontal control padding.',
  },
  {
    name: '--moduix-date-input-padding-y',
    defaultValue: '0.5rem',
    description: 'Controls vertical control padding.',
  },
  {
    name: '--moduix-date-input-placeholder-color',
    defaultValue: 'var(--moduix-color-muted-foreground)',
    description: 'Controls placeholder segment color.',
  },
  {
    name: '--moduix-date-input-radius',
    defaultValue: 'var(--moduix-radius-md)',
    description: 'Controls the control corner radius.',
  },
  {
    name: '--moduix-date-input-segment-bg-focus',
    defaultValue: 'color-mix(in oklab, var(--moduix-color-ring) 18%, transparent)',
    description: 'Controls focused segment background.',
  },
  {
    name: '--moduix-date-input-segment-color',
    defaultValue: 'currentColor',
    description: 'Controls segment text color.',
  },
  {
    name: '--moduix-date-input-segment-color-focus',
    defaultValue: 'var(--moduix-color-foreground)',
    description: 'Controls focused segment text color.',
  },
  {
    name: '--moduix-date-input-segment-gap',
    defaultValue: 'var(--moduix-border-width-md)',
    description: 'Controls spacing between date segments.',
  },
  {
    name: '--moduix-date-input-segment-line-height',
    defaultValue: 'var(--moduix-line-height-text-md)',
    description: 'Controls segment line height.',
  },
  {
    name: '--moduix-date-input-segment-min-width',
    defaultValue: '2ch',
    description: 'Controls segment minimum width.',
  },
  {
    name: '--moduix-date-input-segment-padding-x',
    defaultValue: 'var(--moduix-spacing-1)',
    description: 'Controls segment horizontal padding.',
  },
  {
    name: '--moduix-date-input-segment-padding-y',
    defaultValue: '0',
    description: 'Controls segment vertical padding.',
  },
  {
    name: '--moduix-date-input-segment-radius',
    defaultValue: 'var(--moduix-radius-sm)',
    description: 'Controls segment corner radius.',
  },
  {
    name: '--moduix-date-input-separator-color',
    defaultValue: 'var(--moduix-color-muted-foreground)',
    description: 'Controls literal and separator text color.',
  },
  {
    name: '--moduix-date-input-transition',
    defaultValue: 'var(--moduix-transition-default)',
    description: 'Controls date input transition timing.',
  },
  {
    name: '--moduix-date-input-width',
    defaultValue: '100%',
    description: 'Controls root width.',
  },
];

export function DateInputCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return <CSSPropertiesReferenceTable properties={dateInputOverrideCssProperties} />;
}