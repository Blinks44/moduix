import { Steps } from '@moduix/react/steps';
import { PreviewMeta } from '@/components/mdx/Components';
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
  const steps = Steps.useSteps({
    count: items.length,
  });
  return (
    <div className={styles.container}>
      <Steps.RootProvider className={styles.root} value={steps}>
        <Steps.List>
          {items.map((item, index) => (
            <Steps.Item key={item.title} index={index}>
              <Steps.Trigger>
                <Steps.Indicator />
                <span className={styles.label}>
                  <strong>{item.title}</strong>
                  <small className={styles.description}>{item.description}</small>
                </span>
              </Steps.Trigger>
              <Steps.Separator />
            </Steps.Item>
          ))}
        </Steps.List>

        {items.map((item, index) => (
          <Steps.Content key={item.title} index={index}>
            {item.title} - {item.description}
          </Steps.Content>
        ))}

        <Steps.CompletedContent>Steps complete. The workspace is ready.</Steps.CompletedContent>

        <div className={styles.actions}>
          <Steps.PrevTrigger>Back</Steps.PrevTrigger>
          <Steps.NextTrigger>Next</Steps.NextTrigger>
        </div>
      </Steps.RootProvider>
      <PreviewMeta>
        <output>Current step: {steps.value + 1}</output>
      </PreviewMeta>
    </div>
  );
}