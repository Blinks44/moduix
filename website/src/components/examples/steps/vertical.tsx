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
} from '@moduix/react/steps';
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
          <StepsItem key={item.title} index={index}>
            <StepsTrigger>
              <StepsIndicator />
              <span className={styles.label}>
                <strong>{item.title}</strong>
                <small className={styles.description}>{item.description}</small>
              </span>
            </StepsTrigger>
            <StepsSeparator />
          </StepsItem>
        ))}
      </StepsList>

      <div className={styles.contentColumn}>
        {items.map((item, index) => (
          <StepsContent key={item.title} index={index}>
            {item.title} - {item.description}
          </StepsContent>
        ))}

        <StepsCompletedContent>Steps complete. The workspace is ready.</StepsCompletedContent>

        <div className={styles.actions}>
          <StepsPrevTrigger>Back</StepsPrevTrigger>
          <StepsNextTrigger>Next</StepsNextTrigger>
        </div>
      </div>
    </Steps>
  );
}
