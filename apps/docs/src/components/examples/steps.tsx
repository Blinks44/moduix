import type { CSSPropertiesEditorContext, CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

const sharedStepsCss = `
  .stepText {
    display: grid;
    gap: 0.125rem;
  }

  .stepTitle {
    font-weight: var(--moduix-weight-medium);
  }

  .stepDescription {
    color: var(--moduix-color-muted-foreground);
    font-size: var(--moduix-text-xs);
  }

  .steps-demo [data-slot='steps-item'],
  .steps-demo [data-slot='steps-item']:last-child {
    flex: 1 1 0;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    gap: var(--moduix-spacing-2);
  }
`;

export const stepsExampleCss = sharedStepsCss;

export const controlledStepsCss = `
  ${sharedStepsCss}

  .stack {
    display: grid;
    gap: var(--moduix-spacing-3);
  }

  .output {
    color: var(--moduix-color-muted-foreground);
    font-size: var(--moduix-text-sm);
  }
`;

export const rootProviderStepsCss = `
  ${sharedStepsCss}

  .stack {
    display: grid;
    gap: var(--moduix-spacing-3);
  }

  .output {
    color: var(--moduix-color-muted-foreground);
    font-size: var(--moduix-text-sm);
  }
`;

export const verticalStepsCss = `
  ${sharedStepsCss}

  .vertical {
    max-width: min(100%, 40rem);
  }
`;

export const asChildStepsCss = `
  ${sharedStepsCss}

  a[data-scope='steps'][data-part='trigger'] {
    text-decoration: none;
  }
`;

export const progressStepsCss = `
  ${sharedStepsCss}

  [data-slot='steps-progress'] {
    margin-block-end: var(--moduix-spacing-2);
  }
`;

const stepsOverrideCssProperties: CssPropertyInput[] = [
  [
    '--moduix-steps-action-bg',
    'var(--moduix-color-background)',
    'Controls action button background.',
  ],
  [
    '--moduix-steps-action-bg-hover',
    'var(--moduix-color-accent)',
    'Controls action button hover background.',
  ],
  [
    '--moduix-steps-action-border-color',
    'var(--moduix-color-border)',
    'Controls action button border color.',
  ],
  [
    '--moduix-steps-action-border-width',
    'var(--moduix-border-width-sm)',
    'Controls action button border width.',
  ],
  [
    '--moduix-steps-action-color',
    'var(--moduix-color-foreground)',
    'Controls action button text color.',
  ],
  ['--moduix-steps-action-font-size', 'var(--moduix-text-sm)', 'Controls action button font size.'],
  ['--moduix-steps-action-gap', 'var(--moduix-spacing-2)', 'Controls action button inner gap.'],
  [
    '--moduix-steps-action-height',
    'var(--moduix-size-sm)',
    'Controls action button minimum height.',
  ],
  [
    '--moduix-steps-action-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls action line height.',
  ],
  [
    '--moduix-steps-action-padding-x',
    'var(--moduix-spacing-3)',
    'Controls horizontal action padding.',
  ],
  [
    '--moduix-steps-action-padding-y',
    'var(--moduix-spacing-1-5)',
    'Controls vertical action padding.',
  ],
  ['--moduix-steps-action-radius', 'var(--moduix-radius-md)', 'Controls action button radius.'],
  ['--moduix-steps-color', 'var(--moduix-color-foreground)', 'Controls the base steps text color.'],
  [
    '--moduix-steps-completed-content-color',
    'var(--moduix-color-foreground)',
    'Controls completed panel text color.',
  ],
  [
    '--moduix-steps-completed-content-font-weight',
    'var(--moduix-weight-medium)',
    'Controls completed panel font weight.',
  ],
  ['--moduix-steps-content-bg', 'var(--moduix-color-muted)', 'Controls panel background.'],
  ['--moduix-steps-content-color', 'var(--moduix-color-foreground)', 'Controls panel text color.'],
  ['--moduix-steps-content-font-size', 'var(--moduix-text-sm)', 'Controls panel font size.'],
  [
    '--moduix-steps-content-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls panel line height.',
  ],
  ['--moduix-steps-content-min-height', '10rem', 'Controls panel minimum height.'],
  [
    '--moduix-steps-content-padding-x',
    'var(--moduix-spacing-4)',
    'Controls horizontal panel padding.',
  ],
  [
    '--moduix-steps-content-padding-y',
    'var(--moduix-spacing-4)',
    'Controls vertical panel padding.',
  ],
  ['--moduix-steps-content-radius', 'var(--moduix-radius-md)', 'Controls panel radius.'],
  [
    '--moduix-steps-disabled-opacity',
    'var(--moduix-opacity-disabled)',
    'Controls disabled action opacity.',
  ],
  ['--moduix-steps-focus-ring-color', 'var(--moduix-color-ring)', 'Controls focus ring color.'],
  [
    '--moduix-steps-focus-ring-offset',
    'var(--moduix-focus-ring-offset)',
    'Controls focus ring offset.',
  ],
  [
    '--moduix-steps-focus-ring-width',
    'var(--moduix-focus-ring-inset-width, var(--moduix-border-width-sm))',
    'Controls focus ring width.',
  ],
  [
    '--moduix-steps-gap',
    'var(--moduix-spacing-4)',
    'Controls vertical spacing between step items.',
  ],
  [
    '--moduix-steps-indicator-bg',
    'var(--moduix-color-background)',
    'Controls incomplete indicator background.',
  ],
  [
    '--moduix-steps-indicator-bg-complete',
    'var(--moduix-color-foreground)',
    'Controls complete indicator background.',
  ],
  [
    '--moduix-steps-indicator-bg-current',
    'var(--moduix-steps-indicator-bg, var(--moduix-color-background))',
    'Controls current indicator background.',
  ],
  [
    '--moduix-steps-indicator-border-color',
    'var(--moduix-color-border)',
    'Controls incomplete indicator border color.',
  ],
  [
    '--moduix-steps-indicator-border-color-complete',
    'var(--moduix-color-foreground)',
    'Controls complete indicator border color.',
  ],
  [
    '--moduix-steps-indicator-border-color-current',
    'var(--moduix-steps-indicator-border-color-complete, var(--moduix-color-foreground))',
    'Controls current indicator border color.',
  ],
  [
    '--moduix-steps-indicator-border-color-hover',
    'var(--moduix-steps-indicator-border-color-current, var(--moduix-color-foreground))',
    'Controls incomplete indicator border color on hover.',
  ],
  [
    '--moduix-steps-indicator-border-width',
    'var(--moduix-border-width-sm)',
    'Controls indicator border width.',
  ],
  [
    '--moduix-steps-indicator-color',
    'var(--moduix-color-muted-foreground)',
    'Controls incomplete indicator text color.',
  ],
  [
    '--moduix-steps-indicator-color-complete',
    'var(--moduix-color-background)',
    'Controls complete indicator text color.',
  ],
  [
    '--moduix-steps-indicator-color-current',
    'var(--moduix-color-foreground)',
    'Controls current indicator text color.',
  ],
  [
    '--moduix-steps-indicator-color-hover',
    'var(--moduix-steps-indicator-color-current, var(--moduix-color-foreground))',
    'Controls incomplete indicator text color on hover.',
  ],
  ['--moduix-steps-indicator-font-size', 'var(--moduix-text-sm)', 'Controls indicator font size.'],
  [
    '--moduix-steps-indicator-font-weight',
    'var(--moduix-weight-semibold)',
    'Controls indicator font weight.',
  ],
  [
    '--moduix-steps-indicator-icon-size',
    'var(--moduix-spacing-3-5)',
    'Controls complete check icon size.',
  ],
  ['--moduix-steps-indicator-radius', 'var(--moduix-radius-full)', 'Controls indicator radius.'],
  [
    '--moduix-steps-indicator-size',
    'var(--moduix-spacing-8)',
    'Controls indicator width and height.',
  ],
  ['--moduix-steps-max-width', '52rem', 'Controls root maximum width.'],
  [
    '--moduix-steps-next-action-bg',
    'var(--moduix-color-foreground)',
    'Controls next button background.',
  ],
  [
    '--moduix-steps-next-action-bg-hover',
    'var(--moduix-color-foreground)',
    'Controls next button hover background.',
  ],
  [
    '--moduix-steps-next-action-border-color',
    'var(--moduix-color-foreground)',
    'Controls next button border color.',
  ],
  [
    '--moduix-steps-next-action-color',
    'var(--moduix-color-background)',
    'Controls next button text color.',
  ],
  [
    '--moduix-steps-progress-bg',
    'var(--moduix-color-border)',
    'Controls progress track background.',
  ],
  [
    '--moduix-steps-progress-fill-bg',
    'var(--moduix-color-foreground)',
    'Controls progress fill background.',
  ],
  ['--moduix-steps-progress-height', 'var(--moduix-border-width-md)', 'Controls progress height.'],
  ['--moduix-steps-progress-radius', 'var(--moduix-radius-full)', 'Controls progress radius.'],
  ['--moduix-steps-root-gap', 'var(--moduix-spacing-4)', 'Controls horizontal root spacing.'],
  [
    '--moduix-steps-separator-color',
    'var(--moduix-color-border)',
    'Controls incomplete separator color.',
  ],
  [
    '--moduix-steps-separator-color-complete',
    'var(--moduix-color-foreground)',
    'Controls complete separator color.',
  ],
  [
    '--moduix-steps-separator-inset',
    'var(--moduix-spacing-2)',
    'Controls separator inset from the indicator.',
  ],
  [
    '--moduix-steps-separator-min-width',
    'var(--moduix-spacing-8)',
    'Controls horizontal separator width.',
  ],
  [
    '--moduix-steps-separator-thickness',
    'var(--moduix-border-width-sm)',
    'Controls separator thickness.',
  ],
  ['--moduix-steps-trigger-color-incomplete', 'inherit', 'Controls incomplete trigger text color.'],
  ['--moduix-steps-trigger-gap', 'var(--moduix-spacing-3)', 'Controls trigger content gap.'],
  ['--moduix-steps-trigger-radius', 'var(--moduix-radius-md)', 'Controls trigger radius.'],
  ['--moduix-steps-vertical-gap', 'var(--moduix-spacing-6)', 'Controls vertical root column gap.'],
  ['--moduix-steps-vertical-item-min-height', '4rem', 'Controls vertical item minimum height.'],
];

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}

const stepsCssProperties = stepsOverrideCssProperties.map(normalizeCssProperty);

export function StepsCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return <CSSPropertiesReferenceTable properties={stepsCssProperties} />;
}