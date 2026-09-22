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
import styles from '@/components/examples/steps/steps-vertical.module.css';

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
  {
    title: 'Launch',
    description: 'Review everything and go live.',
  },
];

export default function StepsVerticalDemo() {
  return (
    <Steps count={items.length} defaultStep={1} orientation="vertical">
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

      <div class={styles.contentColumn}>
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
      </div>
    </Steps>
  );
}
