import { Steps } from '@moduix/react';

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

      <div
        style={{
          display: 'grid',
          minWidth: 0,
          flex: '1 1 auto',
          alignContent: 'start',
          gap: 'var(--moduix-spacing-4)',
        }}
      >
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
      </div>
    </Steps>
  );
}