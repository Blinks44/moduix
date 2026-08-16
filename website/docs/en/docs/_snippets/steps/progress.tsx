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

export default function StepsProgressDemo() {
  return (
    <Steps className="steps-demo" count={items.length} defaultStep={1}>
      <Steps.Progress />
      <Steps.List>
        {items.map((item, index) => (
          <Steps.Item key={item.title} index={index}>
            <Steps.Trigger>
              <Steps.Indicator />
              <span style={{ display: 'grid', minWidth: 0, gap: '0.125rem' }}>
                <strong>{item.title}</strong>
                <small
                  style={{
                    color: 'var(--moduix-color-muted-foreground)',
                    fontSize: 'var(--moduix-text-xs)',
                  }}
                >
                  {item.description}
                </small>
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