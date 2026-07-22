import { CSSPropertiesReferenceTable } from '../mdx/reference';

export const listNoopCss = '';

export const listToneExampleCss = `
  .list-demo-tones {
    display: grid;
    gap: var(--moduix-spacing-4) var(--moduix-spacing-6);
    grid-template-columns: repeat(2, minmax(0, 1fr));
    width: fit-content;
    max-width: min(32rem, calc(100vw - var(--moduix-spacing-8)));
  }
`;

export const listCustomCompositionCss = `
  .list-demo-accent {
    max-width: min(32rem, calc(100vw - var(--moduix-spacing-8)));
    --moduix-list-padding-x: var(--moduix-spacing-6);
  }

  .list-demo-accent-item::marker {
    color: var(--moduix-color-chart-2);
    font-weight: var(--moduix-weight-semibold);
  }
`;

const listOverrideCssProperties = [
  {
    name: '--moduix-list-color',
    defaultValue: 'var(--moduix-list-default-color, var(--moduix-color-foreground))',
    description: 'Controls list text color.',
  },
  {
    name: '--moduix-list-default-color',
    defaultValue: 'var(--moduix-color-foreground)',
    description: 'Controls default tone color.',
  },
  {
    name: '--moduix-list-destructive-color',
    defaultValue: 'var(--moduix-color-destructive)',
    description: 'Controls destructive tone color.',
  },
  {
    name: '--moduix-list-font-family',
    defaultValue: 'var(--moduix-font-sans)',
    description: 'Controls list font family.',
  },
  {
    name: '--moduix-list-font-size',
    defaultValue: 'var(--moduix-list-font-size-md, var(--moduix-text-md))',
    description: 'Controls default list font size.',
  },
  {
    name: '--moduix-list-font-size-xs',
    defaultValue: 'var(--moduix-text-xs)',
    description: 'Controls extra-small list font size.',
  },
  {
    name: '--moduix-list-font-size-sm',
    defaultValue: 'var(--moduix-text-sm)',
    description: 'Controls small list font size.',
  },
  {
    name: '--moduix-list-font-size-md',
    defaultValue: 'var(--moduix-text-md)',
    description: 'Controls medium list font size.',
  },
  {
    name: '--moduix-list-font-size-lg',
    defaultValue: 'var(--moduix-text-lg)',
    description: 'Controls large list font size.',
  },
  {
    name: '--moduix-list-font-size-xl',
    defaultValue: 'var(--moduix-text-xl)',
    description: 'Controls extra-large list font size.',
  },
  {
    name: '--moduix-list-font-weight',
    defaultValue: 'var(--moduix-weight-regular)',
    description: 'Controls list font weight.',
  },
  {
    name: '--moduix-list-gap',
    defaultValue: 'var(--moduix-list-gap-sm, var(--moduix-spacing-2))',
    description: 'Controls default gap between items.',
  },
  {
    name: '--moduix-list-gap-xs',
    defaultValue: 'var(--moduix-spacing-1)',
    description: 'Controls extra-small list item gap.',
  },
  {
    name: '--moduix-list-gap-sm',
    defaultValue: 'var(--moduix-spacing-2)',
    description: 'Controls small list item gap.',
  },
  {
    name: '--moduix-list-gap-md',
    defaultValue: 'var(--moduix-spacing-3)',
    description: 'Controls medium list item gap.',
  },
  {
    name: '--moduix-list-gap-lg',
    defaultValue: 'var(--moduix-spacing-4)',
    description: 'Controls large list item gap.',
  },
  {
    name: '--moduix-list-gap-xl',
    defaultValue: 'var(--moduix-spacing-5)',
    description: 'Controls extra-large list item gap.',
  },
  {
    name: '--moduix-list-gap-2xl',
    defaultValue: 'var(--moduix-spacing-6)',
    description: 'Controls 2xl list item gap.',
  },
  {
    name: '--moduix-list-letter-spacing',
    defaultValue: '0',
    description: 'Controls list letter spacing.',
  },
  {
    name: '--moduix-list-line-height',
    defaultValue: 'var(--moduix-list-line-height-md, var(--moduix-line-height-text-md))',
    description: 'Controls default list line height.',
  },
  {
    name: '--moduix-list-line-height-xs',
    defaultValue: 'var(--moduix-line-height-text-xs)',
    description: 'Controls extra-small list line height.',
  },
  {
    name: '--moduix-list-line-height-sm',
    defaultValue: 'var(--moduix-line-height-text-sm)',
    description: 'Controls small list line height.',
  },
  {
    name: '--moduix-list-line-height-md',
    defaultValue: 'var(--moduix-line-height-text-md)',
    description: 'Controls medium list line height.',
  },
  {
    name: '--moduix-list-line-height-lg',
    defaultValue: 'var(--moduix-line-height-text-lg)',
    description: 'Controls large list line height.',
  },
  {
    name: '--moduix-list-line-height-xl',
    defaultValue: 'var(--moduix-line-height-text-xl)',
    description: 'Controls extra-large list line height.',
  },
  {
    name: '--moduix-list-marker-color',
    defaultValue: 'currentColor',
    description: 'Controls marker color.',
  },
  {
    name: '--moduix-list-marker-font-weight',
    defaultValue: 'inherit',
    description: 'Controls native marker font weight.',
  },
  {
    name: '--moduix-list-muted-color',
    defaultValue: 'var(--moduix-color-muted-foreground)',
    description: 'Controls muted tone color.',
  },
  {
    name: '--moduix-list-padding-x',
    defaultValue: 'var(--moduix-spacing-5)',
    description: 'Controls marker indentation.',
  },
  {
    name: '--moduix-list-primary-color',
    defaultValue: 'var(--moduix-color-primary)',
    description: 'Controls primary tone color.',
  },
  {
    name: '--moduix-list-subtle-color',
    defaultValue: 'var(--moduix-color-secondary-foreground)',
    description: 'Controls subtle tone color.',
  },
] satisfies Array<{
  name: `--${string}`;
  defaultValue: string;
  description: string;
}>;

export function ListCssPropertiesPanel() {
  return <CSSPropertiesReferenceTable properties={listOverrideCssProperties} />;
}