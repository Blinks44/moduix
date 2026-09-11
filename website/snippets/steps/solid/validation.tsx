import { Input } from '@moduix/solid/input';
import { Steps } from '@moduix/solid/steps';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/steps/steps-validation.module.css';

export default function StepsValidationDemo() {
  const [name, setName] = createSignal('');
  const [message, setMessage] = createSignal('Enter a name to continue.');

  return (
    <div class={styles.container}>
      <Steps
        count={2}
        linear
        isStepValid={(index) => index !== 0 || name().trim().length > 0}
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
            <Input value={name()} onInput={(event) => setName(event.currentTarget.value)} />
          </label>
        </Steps.Content>
        <Steps.Content index={1}>Your profile can now be completed.</Steps.Content>
        <Steps.CompletedContent>Steps complete.</Steps.CompletedContent>

        <div class={styles.actions}>
          <Steps.PrevTrigger>Back</Steps.PrevTrigger>
          <Steps.NextTrigger>Next</Steps.NextTrigger>
        </div>
      </Steps>
      <output>{message()}</output>
    </div>
  );
}