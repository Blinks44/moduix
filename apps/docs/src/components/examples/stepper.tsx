import {
  Stepper,
  StepperContent,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperList,
  StepperTitle,
  StepperTrigger,
} from 'moduix';
import { useState, type ComponentProps } from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './stepper.module.css';

const steps = [
  {
    step: 1,
    title: 'Account',
    description: 'Create the workspace owner account.',
  },
  {
    step: 2,
    title: 'Profile',
    description: 'Set team details and locale.',
  },
  {
    step: 3,
    title: 'Billing',
    description: 'Choose the plan and payment method.',
  },
  {
    step: 4,
    title: 'Launch',
    description: 'Review everything and go live.',
  },
] as const;

export const stepperOverrideCssProperties: CssPropertyInput[] = [
  ['--stepper-color', 'var(--color-foreground)', 'Controls the base stepper text color.'],
  ['--stepper-connector-color', 'var(--color-border)', 'Controls inactive connector color.'],
  [
    '--stepper-connector-color-active',
    'var(--color-foreground)',
    'Controls completed connector color.',
  ],
  ['--stepper-connector-inset', '0.5rem', 'Controls connector inset from the indicator.'],
  ['--stepper-connector-thickness', 'var(--border-width-sm)', 'Controls connector thickness.'],
  ['--stepper-content-gap', '0.25rem', 'Controls compact content spacing within each step.'],
  [
    '--stepper-description-color',
    'var(--color-muted-foreground)',
    'Controls description text color.',
  ],
  [
    '--stepper-description-color-current',
    'var(--stepper-description-color)',
    'Controls current-step description color.',
  ],
  ['--stepper-description-font-size', 'var(--text-xs)', 'Controls description font size.'],
  [
    '--stepper-description-line-height',
    'var(--line-height-text-xs)',
    'Controls description line height.',
  ],
  ['--stepper-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled trigger opacity.'],
  ['--stepper-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  ['--stepper-focus-ring-offset', '2px', 'Controls focus ring offset.'],
  ['--stepper-focus-ring-width', 'var(--border-width-sm)', 'Controls focus ring width.'],
  ['--stepper-gap', 'var(--spacing-4)', 'Controls spacing between steps.'],
  ['--stepper-indicator-bg', 'var(--color-background)', 'Controls inactive indicator background.'],
  [
    '--stepper-indicator-bg-completed',
    'var(--color-foreground)',
    'Controls completed indicator background.',
  ],
  [
    '--stepper-indicator-bg-current',
    'var(--stepper-indicator-bg)',
    'Controls current-step indicator background.',
  ],
  [
    '--stepper-indicator-border-color',
    'var(--color-border)',
    'Controls inactive indicator border color.',
  ],
  [
    '--stepper-indicator-border-color-completed',
    'var(--color-foreground)',
    'Controls completed indicator border color.',
  ],
  [
    '--stepper-indicator-border-color-current',
    'var(--stepper-indicator-border-color-completed)',
    'Controls current-step indicator border color.',
  ],
  [
    '--stepper-indicator-border-color-hover',
    'var(--stepper-indicator-border-color-current)',
    'Controls inactive indicator border color on hover.',
  ],
  [
    '--stepper-indicator-color',
    'var(--color-muted-foreground)',
    'Controls inactive indicator content color.',
  ],
  [
    '--stepper-indicator-color-completed',
    'var(--color-background)',
    'Controls completed indicator content color.',
  ],
  [
    '--stepper-indicator-color-current',
    'var(--color-foreground)',
    'Controls current-step indicator content color.',
  ],
  [
    '--stepper-indicator-color-hover',
    'var(--stepper-indicator-color-current)',
    'Controls inactive indicator content color on hover.',
  ],
  ['--stepper-indicator-font-size', 'var(--text-sm)', 'Controls indicator number font size.'],
  [
    '--stepper-indicator-font-weight',
    'var(--weight-semibold)',
    'Controls indicator number font weight.',
  ],
  ['--stepper-indicator-icon-size', '0.875rem', 'Controls completed check icon size.'],
  ['--stepper-indicator-radius', 'var(--radius-full)', 'Controls indicator corner radius.'],
  ['--stepper-indicator-size', '2rem', 'Controls indicator width and height.'],
  ['--stepper-title-color', 'currentColor', 'Controls title text color.'],
  [
    '--stepper-title-color-current',
    'var(--stepper-title-color)',
    'Controls current-step title color.',
  ],
  ['--stepper-title-color-hover', 'var(--color-foreground)', 'Controls title hover color.'],
  ['--stepper-title-font-size', 'var(--text-sm)', 'Controls title font size.'],
  ['--stepper-title-font-weight', 'var(--weight-medium)', 'Controls title font weight.'],
  ['--stepper-title-line-height', 'var(--line-height-text-sm)', 'Controls title line height.'],
  ['--stepper-trigger-gap', 'var(--spacing-3)', 'Controls vertical trigger gap.'],
];

export const stepperPlaygroundCssProperties: CssPropertyInput[] = [
  ['--stepper-connector-color', 'var(--color-border)', 'Controls inactive connector color.'],
  [
    '--stepper-connector-color-active',
    'var(--color-foreground)',
    'Controls active connector color.',
  ],
  ['--stepper-gap', 'var(--spacing-4)', 'Controls spacing between steps.'],
  ['--stepper-indicator-bg', 'var(--color-background)', 'Controls inactive indicator background.'],
  [
    '--stepper-indicator-bg-completed',
    'var(--color-foreground)',
    'Controls completed indicator background.',
  ],
  [
    '--stepper-indicator-border-color-current',
    'var(--stepper-indicator-border-color-completed)',
    'Controls current-step indicator border color.',
  ],
  [
    '--stepper-indicator-color-current',
    'var(--color-foreground)',
    'Controls current-step number color.',
  ],
  ['--stepper-indicator-size', '2rem', 'Controls indicator size.'],
  [
    '--stepper-title-color-current',
    'var(--stepper-title-color)',
    'Controls current-step title color.',
  ],
];

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}

const stepperCssProperties = stepperOverrideCssProperties.map(normalizeCssProperty);
const stepperPlaygroundProperties = stepperPlaygroundCssProperties.map(normalizeCssProperty);

function StepperDemo({
  currentStep = 2,
  orientation = 'horizontal',
  ...props
}: ComponentProps<typeof Stepper> & { currentStep?: number }) {
  return (
    <Stepper currentStep={currentStep} orientation={orientation} {...props}>
      <StepperList>
        {steps.map((item) => (
          <StepperItem key={item.step} step={item.step}>
            <StepperTrigger render={<div />}>
              <StepperIndicator />
              <StepperContent>
                <StepperTitle>{item.title}</StepperTitle>
                <StepperDescription>{item.description}</StepperDescription>
              </StepperContent>
            </StepperTrigger>
          </StepperItem>
        ))}
      </StepperList>
    </Stepper>
  );
}

export function StepperCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return <CSSPropertiesReferenceTable properties={stepperCssProperties} />;
}

export function StepperCssPlaygroundPanel({
  values,
  onChange,
  onReset,
}: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesEditor
      properties={stepperPlaygroundProperties}
      values={values}
      onChange={onChange}
      onReset={onReset}
    />
  );
}

export function StepperExample(props: ComponentProps<typeof Stepper>) {
  return (
    <div className={styles.stack}>
      <StepperDemo {...props} />
    </div>
  );
}

export function ControlledStepperExample() {
  const [currentStep, setCurrentStep] = useState(2);

  return (
    <div className={styles.stack}>
      <Stepper currentStep={currentStep}>
        <StepperList>
          {steps.map((item) => (
            <StepperItem key={item.step} step={item.step}>
              <StepperTrigger
                disabled={item.step > currentStep + 1}
                onClick={() => {
                  setCurrentStep(item.step);
                }}
              >
                <StepperIndicator />
                <StepperContent>
                  <StepperTitle>{item.title}</StepperTitle>
                  <StepperDescription>{item.description}</StepperDescription>
                </StepperContent>
              </StepperTrigger>
            </StepperItem>
          ))}
        </StepperList>
      </Stepper>
      <div className={styles.controls}>
        {steps.map((item) => (
          <button
            key={item.step}
            className={styles.controlButton}
            type="button"
            onClick={() => {
              setCurrentStep(item.step);
            }}
          >
            Go to step {item.step}
          </button>
        ))}
      </div>
    </div>
  );
}

export function VerticalStepperExample() {
  return (
    <div className={`${styles.stack} ${styles.vertical}`}>
      <StepperDemo orientation="vertical" currentStep={3} />
    </div>
  );
}

export function LinkCompositionStepperExample() {
  return (
    <div className={styles.stack}>
      <Stepper currentStep={2}>
        <StepperList>
          {steps.map((item) => (
            <StepperItem key={item.step} step={item.step}>
              <StepperTrigger render={<a href={`#step-${item.step}`} />}>
                <StepperIndicator />
                <StepperContent>
                  <StepperTitle>{item.title}</StepperTitle>
                  <StepperDescription>{item.description}</StepperDescription>
                </StepperContent>
              </StepperTrigger>
            </StepperItem>
          ))}
        </StepperList>
      </Stepper>
    </div>
  );
}

export function CustomStylesStepperExample() {
  return (
    <div className={styles.stack}>
      <StepperDemo className={styles.customStepper} currentStep={3} />
    </div>
  );
}