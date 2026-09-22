import {
  StepsCompletedContent,
  StepsContent,
  StepsIndicator,
  StepsItem,
  StepsList,
  StepsNextTrigger,
  StepsPrevTrigger,
  StepsRootProvider,
  StepsSeparator,
  StepsTrigger,
  useSteps,
} from '@moduix/solid/steps';
import styles from '@/components/examples/steps/steps-root-provider.module.css';

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

export default function RootProviderStepsDemo() {
  const steps = useSteps({ count: items.length });

  return (
    <>
      <StepsRootProvider class={styles.root} value={steps}>
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
      </StepsRootProvider>
      <output>Current step: {steps().value + 1}</output>
    </>
  );
}