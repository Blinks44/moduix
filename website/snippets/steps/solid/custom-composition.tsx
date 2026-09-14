import { Steps } from '@moduix/solid/steps';
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
      <Steps.List>
        {items.map((item, index) => (
          <Steps.Item index={index}>
            <Steps.Trigger
              asChild={(props) => (
                <a {...props()} href={`#step-${index + 1}`}>
                  <Steps.Indicator />
                  <span>
                    <strong>{item.title}</strong>
                  </span>
                </a>
              )}
            />
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
  );
}