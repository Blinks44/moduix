import type { CSSPropertiesEditorContext, CssProperty } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

const nativeSelectCssProperties: CssProperty[] = [
  { name: '--select-width', defaultValue: '14rem', description: 'Controls the select width.' },
  {
    name: '--select-max-width',
    defaultValue: '100%',
    description: 'Controls the maximum select width.',
  },
  {
    name: '--select-control-height',
    defaultValue: 'var(--size-md)',
    description: 'Controls the single-select height.',
  },
  {
    name: '--select-border-width',
    defaultValue: 'var(--border-width-sm)',
    description: 'Controls the border width.',
  },
  {
    name: '--select-border-color',
    defaultValue: 'var(--color-border)',
    description: 'Controls the border color.',
  },
  {
    name: '--select-radius',
    defaultValue: 'var(--radius-md)',
    description: 'Controls the border radius.',
  },
  {
    name: '--select-trigger-padding-x-start',
    defaultValue: 'var(--spacing-3)',
    description: 'Controls text padding and spacing after the indicator.',
  },
  {
    name: '--select-action-offset-right',
    defaultValue: 'var(--spacing-1)',
    description: 'Controls the indicator offset from the inline end.',
  },
  {
    name: '--select-action-size',
    defaultValue: 'var(--spacing-6)',
    description: 'Controls the indicator box size.',
  },
  {
    name: '--select-icon-color',
    defaultValue: 'var(--color-muted-foreground)',
    description: 'Controls the indicator color.',
  },
  {
    name: '--select-icon-size',
    defaultValue: 'var(--spacing-4)',
    description: 'Controls the indicator icon size.',
  },
  {
    name: '--select-bg',
    defaultValue: 'var(--color-background)',
    description: 'Controls the background.',
  },
  {
    name: '--select-bg-hover',
    defaultValue: 'var(--color-accent)',
    description: 'Controls the hover background.',
  },
  {
    name: '--select-color',
    defaultValue: 'var(--color-foreground)',
    description: 'Controls the text color.',
  },
  {
    name: '--select-focus-ring-width',
    defaultValue: 'var(--border-width-sm)',
    description: 'Controls the focus ring width.',
  },
  {
    name: '--select-focus-ring-color',
    defaultValue: 'var(--color-ring)',
    description: 'Controls the focus border and ring color.',
  },
  {
    name: '--select-invalid-color',
    defaultValue: 'var(--color-destructive)',
    description: 'Controls the invalid border and ring.',
  },
  {
    name: '--select-disabled-opacity',
    defaultValue: 'var(--opacity-disabled)',
    description: 'Controls disabled opacity.',
  },
  {
    name: '--select-transition',
    defaultValue: 'var(--transition-default)',
    description: 'Controls visual transitions.',
  },
];

export function NativeSelectCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return <CSSPropertiesReferenceTable properties={nativeSelectCssProperties} />;
}