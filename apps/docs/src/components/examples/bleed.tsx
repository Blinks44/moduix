import { Bleed, Text } from '@moduix/react';
import type { CssProperty } from '../preview';

const basicContent = {
  before: 'Container content stays constrained.',
  surface: 'This block bleeds to the viewport edges.',
  after: 'Following content returns to the container width.',
};

const inlineAmounts = [
  { label: 'Small inline bleed', value: 'sm' },
  { label: 'Large inline bleed', value: 'lg' },
  { label: 'Full inline bleed', value: 'full' },
] as const;

const blockContent = {
  before: 'Container padding above.',
  surface: 'Inline and block bleed',
  after: 'Container padding below.',
};

const semanticContent = {
  caption: 'Full-width media with a constrained parent.',
};

const customContent = {
  surface: 'Customized bleed amount.',
};

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

export function BleedExample() {
  return (
    <div className="bleed-demo-container">
      <Text tone="muted">{basicContent.before}</Text>
      <Bleed className="bleed-demo-surface">
        <Text weight="semibold">{basicContent.surface}</Text>
      </Bleed>
      <Text tone="muted">{basicContent.after}</Text>
    </div>
  );
}

export function BleedInlineAmountsExample() {
  return (
    <div className="bleed-demo-container">
      {inlineAmounts.map((amount) => (
        <Bleed key={amount.value} inline={amount.value} className="bleed-demo-panel">
          <Text>{amount.label}</Text>
        </Bleed>
      ))}
    </div>
  );
}

export function BleedBlockExample() {
  return (
    <div className="bleed-demo-padded-container">
      <Text tone="muted">{blockContent.before}</Text>
      <Bleed inline="md" block="md" className="bleed-demo-panel">
        <Text>{blockContent.surface}</Text>
      </Bleed>
      <Text tone="muted">{blockContent.after}</Text>
    </div>
  );
}

export function BleedSemanticExample() {
  return (
    <div className="bleed-demo-container">
      <Bleed asChild className="bleed-demo-figure">
        <figure>
          <div className="bleed-demo-media" />
          <Text tone="muted" size="sm">
            {semanticContent.caption}
          </Text>
        </figure>
      </Bleed>
    </div>
  );
}

export function CustomStylingBleedExample() {
  return (
    <div className="bleed-demo-container">
      <Bleed className="bleed-demo-custom-surface">
        <Text weight="semibold">{customContent.surface}</Text>
      </Bleed>
    </div>
  );
}