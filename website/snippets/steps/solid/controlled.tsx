import {
  Steps,
  StepsCompletedContent,
  StepsContent,
  StepsIndicator,
  StepsItem,
  StepsList,
  StepsNextTrigger,
  StepsPrevTrigger,
  StepsSeparator,
  StepsTrigger,
} from '@moduix/solid/steps';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/steps/steps-controlled.module.css';

const items = [
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
];

export default function ControlledStepsDemo() {
  const [step, setStep] = createSignal(1);

  return (
    <div class={styles.container}>
      <Steps
        class={styles.root}
        count={items.length}
        step={step()}
        onStepChange={(details) => setStep(details.step)}
      >
        <StepsList>
          {items.map((item, index) => (
            <StepsItem index={index}>
              <StepsTrigger>
                <StepsIndicator />
                <span class={styles.label}>
                  <strong>{item.title}</strong>
                  <small class={styles.description}>{item.description}</small>
                </span>
              </StepsTrigger>
              <StepsSeparator />
            </StepsItem>
          ))}
        </StepsList>

        {items.map((item, index) => (
          <StepsContent index={index}>
            {item.title} - {item.description}
          </StepsContent>
        ))}

        <StepsCompletedContent>Steps complete. The workspace is ready.</StepsCompletedContent>

        <div class={styles.actions}>
          <StepsPrevTrigger>Back</StepsPrevTrigger>
          <StepsNextTrigger>Next</StepsNextTrigger>
        </div>
      </Steps>
      <output>Current step: {step() + 1}</output>
    </div>
  );
}