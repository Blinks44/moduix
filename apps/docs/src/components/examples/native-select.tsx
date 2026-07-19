import { Field, NativeSelect } from '@moduix/react';
import type { CSSPropertiesEditorContext, CssProperty } from '../mdx/preview';
import { CSSPropertiesReferenceTable } from '../mdx/preview';
import styles from './native-select.module.css';

const nativeSelectCssProperties: CssProperty[] = [
  { name: '--select-width', defaultValue: '14rem', description: 'Controls the select width.' },
  {
    name: '--select-max-width',
    defaultValue: '100%',
    description: 'Controls the maximum select width.',
  },
  {
    name: '--select-control-height',
    defaultValue: 'var(--size-lg)',
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

export function NativeSelectExample() {
  return (
    <NativeSelect defaultValue="">
      <option value="" disabled>
        Choose framework
      </option>
      <option value="react">React</option>
      <option value="vue">Vue</option>
      <option value="svelte">Svelte</option>
    </NativeSelect>
  );
}

export function NativeSelectFieldExample() {
  return (
    <Field.Root className={styles.field} invalid required>
      <Field.Label>Framework</Field.Label>
      <NativeSelect defaultValue="" name="framework">
        <option value="" disabled>
          Choose framework
        </option>
        <option value="react">React</option>
        <option value="vue">Vue</option>
        <option value="svelte">Svelte</option>
      </NativeSelect>
      <Field.ErrorText>Select a framework.</Field.ErrorText>
    </Field.Root>
  );
}

export function NativeSelectMultipleExample() {
  return (
    <NativeSelect defaultValue={['react', 'vue']} multiple size={3} aria-label="Frameworks">
      <option value="react">React</option>
      <option value="vue">Vue</option>
      <option value="svelte">Svelte</option>
    </NativeSelect>
  );
}