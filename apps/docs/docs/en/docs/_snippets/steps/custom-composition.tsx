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

export default function StepsCustomCompositionDemo() {
  return (
    <Steps count={items.length} defaultStep={1} linear={false}>
      <Steps.List>
        {items.map((item, index) => (
          <Steps.Item key={item.title} index={index}>
            <Steps.Trigger asChild>
              <a href={`#step-${index + 1}`}>
                <Steps.Indicator />
                <span className="stepText">
                  <span className="stepTitle">{item.title}</span>
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

      <div className="actions">
        <Steps.PrevTrigger>Back</Steps.PrevTrigger>
        <Steps.NextTrigger>Next</Steps.NextTrigger>
      </div>
    </Steps>
  );
}