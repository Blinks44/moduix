import { Steps } from '@moduix/react';
import { useState, type ComponentProps } from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../mdx/preview';
import { CSSPropertiesReferenceTable } from '../mdx/preview';
import styles from './steps.module.css';

const stepsItems = [
  {
    title: 'Account',
    description: 'Create the workspace owner account.',
  },
  {
    title: 'Profile',
    description: 'Set team details and locale.',
  },
  {
    title: 'Billing',
    description: 'Choose the plan and payment method.',
  },
  {
    title: 'Launch',
    description: 'Review everything and go live.',
  },
] as const;

export const stepsItemsData = `const items = [
  { title: 'Account', description: 'Create the workspace owner account.' },
  { title: 'Profile', description: 'Set team details and locale.' },
  { title: 'Billing', description: 'Choose the plan and payment method.' },
  { title: 'Launch', description: 'Review everything and go live.' },
];`;

const sharedStepsCss = `
  .stepText {
    display: grid;
    gap: 0.125rem;
  }

  .stepTitle {
    font-weight: var(--weight-medium);
  }

  .stepDescription {
    color: var(--color-muted-foreground);
    font-size: var(--text-xs);
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    gap: var(--spacing-2);
  }
`;

export const stepsExampleCss = sharedStepsCss;

export const controlledStepsCss = `
  ${sharedStepsCss}

  .stack {
    display: grid;
    gap: var(--spacing-3);
  }

  .output {
    color: var(--color-muted-foreground);
    font-size: var(--text-sm);
  }
`;

export const rootProviderStepsCss = `
  ${sharedStepsCss}

  .stack {
    display: grid;
    gap: var(--spacing-3);
  }

  .output {
    color: var(--color-muted-foreground);
    font-size: var(--text-sm);
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
    margin-block-end: var(--spacing-2);
  }
`;

export const customStylesStepsCss = `
  ${sharedStepsCss}

  .customSteps {
    --steps-content-bg: color-mix(in oklab, var(--color-primary) 10%, var(--color-muted) 90%);
    --steps-indicator-bg-current: color-mix(
      in oklab,
      var(--color-primary) 12%,
      var(--color-background) 88%
    );
    --steps-indicator-bg-complete: var(--color-primary);
    --steps-indicator-border-color-complete: var(--color-primary);
    --steps-indicator-border-color-current: var(--color-primary);
    --steps-indicator-color-current: var(--color-primary);
    --steps-indicator-radius: var(--radius-md);
    --steps-indicator-size: 2.5rem;
    --steps-next-action-bg: var(--color-primary);
    --steps-next-action-border-color: var(--color-primary);
    --steps-next-action-color: var(--color-primary-foreground, var(--color-background));
    --steps-separator-color-complete: var(--color-primary);
    --steps-separator-thickness: var(--border-width-md);
    --steps-progress-fill-bg: var(--color-primary);
  }
`;

export const stepsOverrideCssProperties: CssPropertyInput[] = [
  ['--steps-action-bg', 'var(--color-background)', 'Controls action button background.'],
  ['--steps-action-bg-hover', 'var(--color-accent)', 'Controls action button hover background.'],
  ['--steps-action-border-color', 'var(--color-border)', 'Controls action button border color.'],
  ['--steps-action-border-width', 'var(--border-width-sm)', 'Controls action button border width.'],
  ['--steps-action-color', 'var(--color-foreground)', 'Controls action button text color.'],
  ['--steps-action-font-size', 'var(--text-sm)', 'Controls action button font size.'],
  ['--steps-action-gap', 'var(--spacing-2)', 'Controls action button inner gap.'],
  ['--steps-action-height', 'var(--size-sm)', 'Controls action button minimum height.'],
  ['--steps-action-line-height', 'var(--line-height-text-sm)', 'Controls action line height.'],
  ['--steps-action-padding-x', 'var(--spacing-3)', 'Controls horizontal action padding.'],
  ['--steps-action-padding-y', 'var(--spacing-1-5)', 'Controls vertical action padding.'],
  ['--steps-action-radius', 'var(--radius-md)', 'Controls action button radius.'],
  ['--steps-color', 'var(--color-foreground)', 'Controls the base steps text color.'],
  [
    '--steps-completed-content-color',
    'var(--color-foreground)',
    'Controls completed panel text color.',
  ],
  [
    '--steps-completed-content-font-weight',
    'var(--weight-medium)',
    'Controls completed panel font weight.',
  ],
  ['--steps-content-bg', 'var(--color-muted)', 'Controls panel background.'],
  ['--steps-content-color', 'var(--color-foreground)', 'Controls panel text color.'],
  ['--steps-content-font-size', 'var(--text-sm)', 'Controls panel font size.'],
  ['--steps-content-line-height', 'var(--line-height-text-sm)', 'Controls panel line height.'],
  ['--steps-content-min-height', '10rem', 'Controls panel minimum height.'],
  ['--steps-content-padding-x', 'var(--spacing-4)', 'Controls horizontal panel padding.'],
  ['--steps-content-padding-y', 'var(--spacing-4)', 'Controls vertical panel padding.'],
  ['--steps-content-radius', 'var(--radius-md)', 'Controls panel radius.'],
  ['--steps-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled action opacity.'],
  ['--steps-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  ['--steps-focus-ring-offset', 'var(--focus-ring-offset)', 'Controls focus ring offset.'],
  [
    '--steps-focus-ring-width',
    'var(--focus-ring-inset-width, var(--border-width-sm))',
    'Controls focus ring width.',
  ],
  ['--steps-gap', 'var(--spacing-4)', 'Controls vertical spacing between step items.'],
  ['--steps-indicator-bg', 'var(--color-background)', 'Controls incomplete indicator background.'],
  [
    '--steps-indicator-bg-complete',
    'var(--color-foreground)',
    'Controls complete indicator background.',
  ],
  [
    '--steps-indicator-bg-current',
    'var(--steps-indicator-bg, var(--color-background))',
    'Controls current indicator background.',
  ],
  [
    '--steps-indicator-border-color',
    'var(--color-border)',
    'Controls incomplete indicator border color.',
  ],
  [
    '--steps-indicator-border-color-complete',
    'var(--color-foreground)',
    'Controls complete indicator border color.',
  ],
  [
    '--steps-indicator-border-color-current',
    'var(--steps-indicator-border-color-complete, var(--color-foreground))',
    'Controls current indicator border color.',
  ],
  [
    '--steps-indicator-border-color-hover',
    'var(--steps-indicator-border-color-current, var(--color-foreground))',
    'Controls incomplete indicator border color on hover.',
  ],
  ['--steps-indicator-border-width', 'var(--border-width-sm)', 'Controls indicator border width.'],
  [
    '--steps-indicator-color',
    'var(--color-muted-foreground)',
    'Controls incomplete indicator text color.',
  ],
  [
    '--steps-indicator-color-complete',
    'var(--color-background)',
    'Controls complete indicator text color.',
  ],
  [
    '--steps-indicator-color-current',
    'var(--color-foreground)',
    'Controls current indicator text color.',
  ],
  [
    '--steps-indicator-color-hover',
    'var(--steps-indicator-color-current, var(--color-foreground))',
    'Controls incomplete indicator text color on hover.',
  ],
  ['--steps-indicator-font-size', 'var(--text-sm)', 'Controls indicator font size.'],
  ['--steps-indicator-font-weight', 'var(--weight-semibold)', 'Controls indicator font weight.'],
  ['--steps-indicator-icon-size', 'var(--spacing-3-5)', 'Controls complete check icon size.'],
  ['--steps-indicator-radius', 'var(--radius-full)', 'Controls indicator radius.'],
  ['--steps-indicator-size', 'var(--spacing-8)', 'Controls indicator width and height.'],
  ['--steps-max-width', '52rem', 'Controls root maximum width.'],
  ['--steps-next-action-bg', 'var(--color-foreground)', 'Controls next button background.'],
  [
    '--steps-next-action-bg-hover',
    'var(--color-foreground)',
    'Controls next button hover background.',
  ],
  [
    '--steps-next-action-border-color',
    'var(--color-foreground)',
    'Controls next button border color.',
  ],
  ['--steps-next-action-color', 'var(--color-background)', 'Controls next button text color.'],
  ['--steps-progress-bg', 'var(--color-border)', 'Controls progress track background.'],
  ['--steps-progress-fill-bg', 'var(--color-foreground)', 'Controls progress fill background.'],
  ['--steps-progress-height', 'var(--border-width-md)', 'Controls progress height.'],
  ['--steps-progress-radius', 'var(--radius-full)', 'Controls progress radius.'],
  ['--steps-root-gap', 'var(--spacing-4)', 'Controls horizontal root spacing.'],
  ['--steps-separator-color', 'var(--color-border)', 'Controls incomplete separator color.'],
  [
    '--steps-separator-color-complete',
    'var(--color-foreground)',
    'Controls complete separator color.',
  ],
  ['--steps-separator-inset', 'var(--spacing-2)', 'Controls separator inset from the indicator.'],
  ['--steps-separator-min-width', 'var(--spacing-8)', 'Controls horizontal separator width.'],
  ['--steps-separator-thickness', 'var(--border-width-sm)', 'Controls separator thickness.'],
  ['--steps-trigger-color-incomplete', 'inherit', 'Controls incomplete trigger text color.'],
  ['--steps-trigger-gap', 'var(--spacing-3)', 'Controls trigger content gap.'],
  ['--steps-trigger-radius', 'var(--radius-md)', 'Controls trigger radius.'],
  ['--steps-vertical-gap', 'var(--spacing-6)', 'Controls vertical root column gap.'],
  ['--steps-vertical-item-min-height', '4rem', 'Controls vertical item minimum height.'],
];

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}

const stepsCssProperties = stepsOverrideCssProperties.map(normalizeCssProperty);

function StepsList() {
  return (
    <Steps.List>
      {stepsItems.map((item, index) => (
        <Steps.Item key={item.title} index={index}>
          <Steps.Trigger>
            <Steps.Indicator />
            <span className={styles.stepText}>
              <span className={styles.stepTitle}>{item.title}</span>
              <span className={styles.stepDescription}>{item.description}</span>
            </span>
          </Steps.Trigger>
          <Steps.Separator />
        </Steps.Item>
      ))}
    </Steps.List>
  );
}

function StepsPanels() {
  return (
    <>
      {stepsItems.map((item, index) => (
        <Steps.Content key={item.title} index={index}>
          <span className={styles.panelContent}>
            {item.title} - {item.description}
          </span>
        </Steps.Content>
      ))}
      <Steps.CompletedContent>
        <span className={styles.panelContent}>Steps complete. The workspace is ready.</span>
      </Steps.CompletedContent>
    </>
  );
}

function StepsActions() {
  return (
    <div className={styles.actions}>
      <Steps.PrevTrigger>Back</Steps.PrevTrigger>
      <Steps.NextTrigger>Next</Steps.NextTrigger>
    </div>
  );
}

function StepsDemo(props: ComponentProps<typeof Steps>) {
  return (
    <Steps count={stepsItems.length} {...props}>
      <StepsList />
      <StepsPanels />
      <StepsActions />
    </Steps>
  );
}

export function StepsCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return <CSSPropertiesReferenceTable properties={stepsCssProperties} />;
}

export function StepsExample(props: ComponentProps<typeof Steps>) {
  return (
    <div className={styles.stack}>
      <StepsDemo {...props} />
    </div>
  );
}

export function ControlledStepsExample() {
  const [step, setStep] = useState(1);

  return (
    <div className={styles.stack}>
      <output className={styles.output}>Current step: {step + 1}</output>
      <Steps
        count={stepsItems.length}
        step={step}
        onStepChange={(details) => {
          setStep(details.step);
        }}
      >
        <StepsList />
        <StepsPanels />
        <StepsActions />
      </Steps>
    </div>
  );
}

export function RootProviderStepsExample() {
  const steps = Steps.useSteps({ count: stepsItems.length });

  return (
    <div className={styles.stack}>
      <output className={styles.output}>Current step: {steps.value + 1}</output>
      <Steps.RootProvider value={steps}>
        <StepsList />
        <StepsPanels />
        <StepsActions />
      </Steps.RootProvider>
    </div>
  );
}

export function VerticalStepsExample() {
  return (
    <div className={`${styles.stack} ${styles.vertical}`}>
      <StepsDemo defaultStep={1} orientation="vertical" />
    </div>
  );
}

export function AsChildStepsExample() {
  return (
    <div className={styles.stack}>
      <Steps count={stepsItems.length} defaultStep={1} linear={false}>
        <Steps.List>
          {stepsItems.map((item, index) => (
            <Steps.Item key={item.title} index={index}>
              <Steps.Trigger asChild>
                <a href={`#step-${index + 1}`}>
                  <Steps.Indicator />
                  <span className={styles.stepText}>
                    <span className={styles.stepTitle}>{item.title}</span>
                  </span>
                </a>
              </Steps.Trigger>
              <Steps.Separator />
            </Steps.Item>
          ))}
        </Steps.List>
        <StepsPanels />
        <StepsActions />
      </Steps>
    </div>
  );
}

export function ProgressStepsExample() {
  return (
    <div className={styles.stack}>
      <Steps count={stepsItems.length} defaultStep={1}>
        <Steps.Progress />
        <StepsList />
        <StepsPanels />
        <StepsActions />
      </Steps>
    </div>
  );
}