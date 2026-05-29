import type { ComponentProps } from 'react';
import { Bleed, Text } from 'moduix';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './bleed.module.css';

export const bleedOverrideCssProperties: CssPropertyInput[] = [
  ['--bleed-block-xs', 'var(--spacing-1)', 'Controls extra-small block bleed.'],
  ['--bleed-block-sm', 'var(--spacing-2)', 'Controls small block bleed.'],
  ['--bleed-block-md', 'var(--spacing-3)', 'Controls medium block bleed.'],
  ['--bleed-block-lg', 'var(--spacing-4)', 'Controls large block bleed.'],
  ['--bleed-block-xl', 'var(--spacing-6)', 'Controls extra-large block bleed.'],
  ['--bleed-inline-full', 'calc(50% - 50vw)', 'Controls full viewport inline bleed.'],
  ['--bleed-inline-full-size', '100vw', 'Controls the width used by full viewport inline bleed.'],
  ['--bleed-inline-xs', 'var(--spacing-1)', 'Controls extra-small inline bleed.'],
  ['--bleed-inline-sm', 'var(--spacing-2)', 'Controls small inline bleed.'],
  ['--bleed-inline-md', 'var(--spacing-3)', 'Controls medium inline bleed.'],
  ['--bleed-inline-lg', 'var(--spacing-4)', 'Controls large inline bleed.'],
  ['--bleed-inline-xl', 'var(--spacing-6)', 'Controls extra-large inline bleed.'],
];

export const bleedPlaygroundCssProperties: CssPropertyInput[] = [
  ['--bleed-inline-full', 'calc(50% - 50vw)', 'Controls full viewport inline bleed.'],
  ['--bleed-inline-full-size', '100vw', 'Controls the width used by full viewport inline bleed.'],
];

export function BleedCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={bleedOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

export function BleedCssPlaygroundPanel({ values, onChange, onReset }: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesEditor
      properties={bleedPlaygroundCssProperties.map(normalizeCssProperty)}
      values={values}
      onChange={onChange}
      onReset={onReset}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}

export function BleedExample(props: ComponentProps<typeof Bleed>) {
  return (
    <div className={styles.container}>
      <Text tone="muted">Container content stays constrained.</Text>
      <Bleed className={styles.bleed} {...props}>
        <Text weight="semibold">This block bleeds to the viewport edges.</Text>
      </Bleed>
      <Text tone="muted">Following content returns to the container width.</Text>
    </div>
  );
}

export function BleedInlineAmountsExample() {
  return (
    <div className={styles.container}>
      <Bleed inline="sm" className={styles.panel}>
        <Text>Small inline bleed</Text>
      </Bleed>
      <Bleed inline="lg" className={styles.panel}>
        <Text>Large inline bleed</Text>
      </Bleed>
      <Bleed inline="full" className={styles.panel}>
        <Text>Full inline bleed</Text>
      </Bleed>
    </div>
  );
}

export function BleedBlockExample() {
  return (
    <div className={styles.paddedContainer}>
      <Text tone="muted">Container padding above.</Text>
      <Bleed inline="md" block="md" className={styles.panel}>
        <Text>Inline and block bleed</Text>
      </Bleed>
      <Text tone="muted">Container padding below.</Text>
    </div>
  );
}

export function BleedSemanticExample() {
  return (
    <div className={styles.container}>
      <Bleed as="figure" className={styles.figure}>
        <div className={styles.media} />
        <Text tone="muted" size="sm">
          Full-width media with a constrained parent.
        </Text>
      </Bleed>
    </div>
  );
}

export function CustomCompositionBleedExample() {
  return (
    <div className={styles.container}>
      <Bleed className={styles.customBleed}>
        <Text weight="semibold">Customized bleed amount.</Text>
      </Bleed>
    </div>
  );
}