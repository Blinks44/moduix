import { Button } from '@moduix/solid/button';
import { Card } from '@moduix/solid/card';
import { Field } from '@moduix/solid/field';
import { PinInput } from '@moduix/solid/pin-input';
import { createSignal } from 'solid-js';
import styles from './verification-code-form.module.css';

export function VerificationCode({ onSubmit }: { onSubmit?: (event: SubmitEvent) => void }) {
  const [invalid, setInvalid] = createSignal(false);

  const handleSubmit = (event: SubmitEvent & { currentTarget: HTMLFormElement }) => {
    const code = new FormData(event.currentTarget).get('code');
    const isComplete = typeof code === 'string' && code.length === 6;

    setInvalid(!isComplete);

    if (!isComplete) {
      event.preventDefault();
      return;
    }

    onSubmit?.(event);
  };

  return (
    <Card class={styles.root}>
      <Card.Header class={styles.header}>
        <Card.Title>Verify your email</Card.Title>
        <Card.Description>Enter the 6-digit code from your email.</Card.Description>
      </Card.Header>

      <Card.Body>
        <form class={styles.stack} noValidate onSubmit={handleSubmit}>
          <Field class={styles.field} invalid={invalid()} required>
            <PinInput
              class={styles.code}
              count={6}
              name="code"
              otp
              onValueChange={() => setInvalid(false)}
            >
              <PinInput.Label>Verification code</PinInput.Label>
              <PinInput.HiddenInput />
              <PinInput.Control>
                <PinInput.Inputs />
              </PinInput.Control>
            </PinInput>
            {invalid() ? (
              <Field.ErrorText>Enter all six digits before verifying.</Field.ErrorText>
            ) : null}
          </Field>

          <Button type="submit" class={styles.submit}>
            Verify email
          </Button>
        </form>
      </Card.Body>

      <Card.Footer class={styles.footer}>
        <p>
          Wrong email?{' '}
          <a class={styles.link} href="/sign-in">
            Use a different one
          </a>
        </p>
      </Card.Footer>
    </Card>
  );
}