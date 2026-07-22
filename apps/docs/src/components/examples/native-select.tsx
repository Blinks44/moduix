import type { CSSPropertiesEditorContext, CssProperty } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

const nativeSelectCssProperties: CssProperty[] = [
  {
    name: '--moduix-select-width',
    defaultValue: '14rem',
    description: 'Controls the select width.',
  },
  {
    name: '--moduix-select-max-width',
    defaultValue: '100%',
    description: 'Controls the maximum select width.',
  },
  {
    name: '--moduix-select-control-height',
    defaultValue: 'var(--moduix-size-md)',
    description: 'Controls the single-select height.',
  },
  {
    name: '--moduix-select-border-width',
    defaultValue: 'var(--moduix-border-width-sm)',
    description: 'Controls the border width.',
  },
  {
    name: '--moduix-select-border-color',
    defaultValue: 'var(--moduix-color-border)',
    description: 'Controls the border color.',
  },
  {
    name: '--moduix-select-radius',
    defaultValue: 'var(--moduix-radius-md)',
    description: 'Controls the border radius.',
  },
  {
    name: '--moduix-select-trigger-padding-x-start',
    defaultValue: 'var(--moduix-spacing-3)',
    description: 'Controls text padding and spacing after the indicator.',
  },
  {
    name: '--moduix-select-action-offset-right',
    defaultValue: 'var(--moduix-spacing-1)',
    description: 'Controls the indicator offset from the inline end.',
  },
  {
    name: '--moduix-select-action-size',
    defaultValue: 'var(--moduix-spacing-6)',
    description: 'Controls the indicator box size.',
  },
  {
    name: '--moduix-select-icon-color',
    defaultValue: 'var(--moduix-color-muted-foreground)',
    description: 'Controls the indicator color.',
  },
  {
    name: '--moduix-select-icon-size',
    defaultValue: 'var(--moduix-spacing-4)',
    description: 'Controls the indicator icon size.',
  },
  {
    name: '--moduix-select-bg',
    defaultValue: 'var(--moduix-color-background)',
    description: 'Controls the background.',
  },
  {
    name: '--select-bg-hover',
    defaultValue: 'var(--moduix-color-accent)',
    description: 'Controls the hover background.',
  },
  {
    name: '--moduix-select-color',
    defaultValue: 'var(--moduix-color-foreground)',
    description: 'Controls the text color.',
  },
  {
    name: '--moduix-select-focus-ring-width',
    defaultValue: 'var(--moduix-border-width-sm)',
    description: 'Controls the focus ring width.',
  },
  {
    name: '--moduix-select-focus-ring-color',
    defaultValue: 'var(--moduix-color-ring)',
    description: 'Controls the focus border and ring color.',
  },
  {
    name: '--moduix-select-invalid-color',
    defaultValue: 'var(--moduix-color-destructive)',
    description: 'Controls the invalid border and ring.',
  },
  {
    name: '--moduix-select-disabled-opacity',
    defaultValue: 'var(--moduix-opacity-disabled)',
    description: 'Controls disabled opacity.',
  },
  {
    name: '--moduix-select-transition',
    defaultValue: 'var(--moduix-transition-default)',
    description: 'Controls visual transitions.',
  },
];

export function NativeSelectCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return <CSSPropertiesReferenceTable properties={nativeSelectCssProperties} />;
}