import { CSSPropertiesReferenceTable } from '../mdx/reference';

export const listNoopCss = '';

export const listToneExampleCss = `
  .list-demo-tones {
    display: grid;
    gap: var(--spacing-4) var(--spacing-6);
    grid-template-columns: repeat(2, minmax(0, 1fr));
    width: fit-content;
    max-width: min(32rem, calc(100vw - var(--spacing-8)));
  }
`;

export const listCustomCompositionCss = `
  .list-demo-accent {
    max-width: min(32rem, calc(100vw - var(--spacing-8)));
    --list-padding-x: var(--spacing-6);
  }

  .list-demo-accent-item::marker {
    color: var(--color-chart-2);
    font-weight: var(--weight-semibold);
  }
`;

const listOverrideCssProperties = [
  {
    name: '--list-color',
    defaultValue: 'var(--list-default-color, var(--color-foreground))',
    description: 'Controls list text color.',
  },
  {
    name: '--list-default-color',
    defaultValue: 'var(--color-foreground)',
    description: 'Controls default tone color.',
  },
  {
    name: '--list-destructive-color',
    defaultValue: 'var(--color-destructive)',
    description: 'Controls destructive tone color.',
  },
  {
    name: '--list-font-family',
    defaultValue: 'var(--font-sans)',
    description: 'Controls list font family.',
  },
  {
    name: '--list-font-size',
    defaultValue: 'var(--list-font-size-md, var(--text-md))',
    description: 'Controls default list font size.',
  },
  {
    name: '--list-font-size-xs',
    defaultValue: 'var(--text-xs)',
    description: 'Controls extra-small list font size.',
  },
  {
    name: '--list-font-size-sm',
    defaultValue: 'var(--text-sm)',
    description: 'Controls small list font size.',
  },
  {
    name: '--list-font-size-md',
    defaultValue: 'var(--text-md)',
    description: 'Controls medium list font size.',
  },
  {
    name: '--list-font-size-lg',
    defaultValue: 'var(--text-lg)',
    description: 'Controls large list font size.',
  },
  {
    name: '--list-font-size-xl',
    defaultValue: 'var(--text-xl)',
    description: 'Controls extra-large list font size.',
  },
  {
    name: '--list-font-weight',
    defaultValue: 'var(--weight-regular)',
    description: 'Controls list font weight.',
  },
  {
    name: '--list-gap',
    defaultValue: 'var(--list-gap-sm, var(--spacing-2))',
    description: 'Controls default gap between items.',
  },
  {
    name: '--list-gap-xs',
    defaultValue: 'var(--spacing-1)',
    description: 'Controls extra-small list item gap.',
  },
  {
    name: '--list-gap-sm',
    defaultValue: 'var(--spacing-2)',
    description: 'Controls small list item gap.',
  },
  {
    name: '--list-gap-md',
    defaultValue: 'var(--spacing-3)',
    description: 'Controls medium list item gap.',
  },
  {
    name: '--list-gap-lg',
    defaultValue: 'var(--spacing-4)',
    description: 'Controls large list item gap.',
  },
  {
    name: '--list-gap-xl',
    defaultValue: 'var(--spacing-5)',
    description: 'Controls extra-large list item gap.',
  },
  {
    name: '--list-gap-2xl',
    defaultValue: 'var(--spacing-6)',
    description: 'Controls 2xl list item gap.',
  },
  {
    name: '--list-letter-spacing',
    defaultValue: '0',
    description: 'Controls list letter spacing.',
  },
  {
    name: '--list-line-height',
    defaultValue: 'var(--list-line-height-md, var(--line-height-text-md))',
    description: 'Controls default list line height.',
  },
  {
    name: '--list-line-height-xs',
    defaultValue: 'var(--line-height-text-xs)',
    description: 'Controls extra-small list line height.',
  },
  {
    name: '--list-line-height-sm',
    defaultValue: 'var(--line-height-text-sm)',
    description: 'Controls small list line height.',
  },
  {
    name: '--list-line-height-md',
    defaultValue: 'var(--line-height-text-md)',
    description: 'Controls medium list line height.',
  },
  {
    name: '--list-line-height-lg',
    defaultValue: 'var(--line-height-text-lg)',
    description: 'Controls large list line height.',
  },
  {
    name: '--list-line-height-xl',
    defaultValue: 'var(--line-height-text-xl)',
    description: 'Controls extra-large list line height.',
  },
  {
    name: '--list-marker-color',
    defaultValue: 'currentColor',
    description: 'Controls marker color.',
  },
  {
    name: '--list-marker-font-weight',
    defaultValue: 'inherit',
    description: 'Controls native marker font weight.',
  },
  {
    name: '--list-muted-color',
    defaultValue: 'var(--color-muted-foreground)',
    description: 'Controls muted tone color.',
  },
  {
    name: '--list-padding-x',
    defaultValue: 'var(--spacing-5)',
    description: 'Controls marker indentation.',
  },
  {
    name: '--list-primary-color',
    defaultValue: 'var(--color-primary)',
    description: 'Controls primary tone color.',
  },
  {
    name: '--list-subtle-color',
    defaultValue: 'var(--color-secondary-foreground)',
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