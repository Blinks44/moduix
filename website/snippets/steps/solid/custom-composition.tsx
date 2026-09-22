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
import styles from '@/components/examples/steps/steps-custom-composition.module.css';

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

export default function StepsCustomCompositionDemo() {
  return (
    <Steps class={styles.root} count={items.length} defaultStep={1} linear={false}>
      <StepsList>
        {items.map((item, index) => (
          <StepsItem index={index}>
            <StepsTrigger
              asChild={(props) => (
                <a {...props()} href={`#step-${index + 1}`}>
                  <StepsIndicator />
                  <span>
                    <strong>{item.title}</strong>
                  </span>
                </a>
              )}
            />
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
  );
}
