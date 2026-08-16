import { Steps } from '@moduix/react/steps';

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
    <Steps className="steps-demo" count={items.length} defaultStep={1} linear={false}>
      <Steps.List>
        {items.map((item, index) => (
          <Steps.Item key={item.title} index={index}>
            <Steps.Trigger asChild>
              <a href={`#step-${index + 1}`}>
                <Steps.Indicator />
                <span>
                  <strong>{item.title}</strong>
                </span>
              </a>
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

      <div
        style={{
          display: 'flex',
          gap: 'var(--moduix-spacing-2)',
          justifyContent: 'flex-end',
        }}
      >
        <Steps.PrevTrigger>Back</Steps.PrevTrigger>
        <Steps.NextTrigger>Next</Steps.NextTrigger>
      </div>
    </Steps>
  );
}