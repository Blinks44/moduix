import { Steps } from '@moduix/solid/steps';
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
        <Steps.List>
          {items.map((item, index) => (
            <Steps.Item index={index}>
              <Steps.Trigger>
                <Steps.Indicator />
                <span class={styles.label}>
                  <strong>{item.title}</strong>
                  <small class={styles.description}>{item.description}</small>
                </span>
              </Steps.Trigger>
              <Steps.Separator />
            </Steps.Item>
          ))}
        </Steps.List>

        {items.map((item, index) => (
          <Steps.Content index={index}>
            {item.title} - {item.description}
          </Steps.Content>
        ))}

        <Steps.CompletedContent>Steps complete. The workspace is ready.</Steps.CompletedContent>

        <div class={styles.actions}>
          <Steps.PrevTrigger>Back</Steps.PrevTrigger>
          <Steps.NextTrigger>Next</Steps.NextTrigger>
        </div>
      </Steps>
      <output>Current step: {step() + 1}</output>
    </div>
  );
}