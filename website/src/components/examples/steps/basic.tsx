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
import styles from '@/components/examples/steps/steps-basic.module.css';

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

export default function StepsDemo() {
  return (
    <Steps className={styles.root} count={items.length}>
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
    </Steps>
  );
}