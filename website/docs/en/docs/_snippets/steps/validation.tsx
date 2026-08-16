import { Input } from '@moduix/react/input';
import { Steps } from '@moduix/react/steps';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

export default function StepsValidationDemo() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('Enter a name to continue.');

  return (
    <div
      style={{
        display: 'grid',
        width: '100%',
        gap: 'var(--moduix-spacing-3)',
        justifyItems: 'center',
      }}
    >
      <Steps
        count={2}
        linear
        isStepValid={(index) => index !== 0 || name.trim().length > 0}
        onStepInvalid={() => setMessage('Enter a name before moving to the next step.')}
        onStepChange={() => setMessage('Step changed.')}
      >
        <Steps.List>
          <Steps.Item index={0}>
            <Steps.Trigger>
              <Steps.Indicator />
              Account
            </Steps.Trigger>
            <Steps.Separator />
          </Steps.Item>
          <Steps.Item index={1}>
            <Steps.Trigger>
              <Steps.Indicator />
              Profile
            </Steps.Trigger>
          </Steps.Item>
        </Steps.List>

        <Steps.Content index={0}>
          <label>
            Name
            <Input value={name} onChange={(event) => setName(event.target.value)} />
          </label>
        </Steps.Content>
        <Steps.Content index={1}>Your profile can now be completed.</Steps.Content>
        <Steps.CompletedContent>Steps complete.</Steps.CompletedContent>

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
      <PreviewMeta>
        <output>{message}</output>
      </PreviewMeta>
    </div>
  );
}