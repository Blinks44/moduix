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
    <Steps className={styles.root} count={items.length} defaultStep={1} linear={false}>
      <StepsList>
        {items.map((item, index) => (
          <StepsItem key={item.title} index={index}>
            <StepsTrigger asChild>
              <a href={`#step-${index + 1}`}>
                <StepsIndicator />
                <span>
                  <strong>{item.title}</strong>
                </span>
              </a>
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