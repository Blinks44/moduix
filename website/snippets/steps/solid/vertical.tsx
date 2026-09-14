import { Steps } from '@moduix/solid/steps';
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

      <div class={styles.contentColumn}>
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
      </div>
    </Steps>
  );
}