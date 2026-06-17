import type { ComponentProps } from 'react';
import { Bleed, Text } from 'moduix';
import type { CSSPropertiesEditorContext, CssProperty } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';

export const bleedCssProperties: CssProperty[] = [
  {
    name: '--bleed-block-xs',
    defaultValue: 'var(--spacing-1)',
    description: 'Controls extra-small block bleed.',
  },
  {
    name: '--bleed-block-sm',
    defaultValue: 'var(--spacing-2)',
    description: 'Controls small block bleed.',
  },
  {
    name: '--bleed-block-md',
    defaultValue: 'var(--spacing-3)',
    description: 'Controls medium block bleed.',
  },
  {
    name: '--bleed-block-lg',
    defaultValue: 'var(--spacing-4)',
    description: 'Controls large block bleed.',
  },
  {
    name: '--bleed-block-xl',
    defaultValue: 'var(--spacing-6)',
    description: 'Controls extra-large block bleed.',
  },
  {
    name: '--bleed-inline-full',
    defaultValue: 'calc(50% - 50vw)',
    description: 'Controls full viewport inline bleed.',
  },
  {
    name: '--bleed-inline-full-size',
    defaultValue: '100vw',
    description: 'Controls the width used by full viewport inline bleed.',
  },
  {
    name: '--bleed-inline-xs',
    defaultValue: 'var(--spacing-1)',
    description: 'Controls extra-small inline bleed.',
  },
  {
    name: '--bleed-inline-sm',
    defaultValue: 'var(--spacing-2)',
    description: 'Controls small inline bleed.',
  },
  {
    name: '--bleed-inline-md',
    defaultValue: 'var(--spacing-3)',
    description: 'Controls medium inline bleed.',
  },
  {
    name: '--bleed-inline-lg',
    defaultValue: 'var(--spacing-4)',
    description: 'Controls large inline bleed.',
  },
  {
    name: '--bleed-inline-xl',
    defaultValue: 'var(--spacing-6)',
    description: 'Controls extra-large inline bleed.',
  },
];

export function BleedCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return <CSSPropertiesReferenceTable properties={bleedCssProperties} />;
}

export function BleedExample(props: ComponentProps<typeof Bleed.Root>) {
  return (
    <div className="bleed-demo-container">
      <Text tone="muted">Container content stays constrained.</Text>
      <Bleed.Root className="bleed-demo-surface" {...props}>
        <Text weight="semibold">This block bleeds to the viewport edges.</Text>
      </Bleed.Root>
      <Text tone="muted">Following content returns to the container width.</Text>
    </div>
  );
}

export function BleedInlineAmountsExample() {
  return (
    <div className="bleed-demo-container">
      <Bleed.Root inline="sm" className="bleed-demo-panel">
        <Text>Small inline bleed</Text>
      </Bleed.Root>
      <Bleed.Root inline="lg" className="bleed-demo-panel">
        <Text>Large inline bleed</Text>
      </Bleed.Root>
      <Bleed.Root inline="full" className="bleed-demo-panel">
        <Text>Full inline bleed</Text>
      </Bleed.Root>
    </div>
  );
}

export function BleedBlockExample() {
  return (
    <div className="bleed-demo-padded-container">
      <Text tone="muted">Container padding above.</Text>
      <Bleed.Root inline="md" block="md" className="bleed-demo-panel">
        <Text>Inline and block bleed</Text>
      </Bleed.Root>
      <Text tone="muted">Container padding below.</Text>
    </div>
  );
}

export function BleedSemanticExample() {
  return (
    <div className="bleed-demo-container">
      <Bleed.Root asChild className="bleed-demo-figure">
        <figure>
          <div className="bleed-demo-media" />
          <Text tone="muted" size="sm">
            Full-width media with a constrained parent.
          </Text>
        </figure>
      </Bleed.Root>
    </div>
  );
}

export function CustomStylingBleedExample() {
  return (
    <div className="bleed-demo-container">
      <Bleed.Root className="bleed-demo-custom-surface">
        <Text weight="semibold">Customized bleed amount.</Text>
      </Bleed.Root>
    </div>
  );
}