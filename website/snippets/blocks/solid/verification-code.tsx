import { createSignal } from 'solid-js';
import { Button } from '@/registry/solid/ui/button';
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/registry/solid/ui/card';
import { Field, FieldErrorText } from '@/registry/solid/ui/field';
import {
  PinInput,
  PinInputControl,
  PinInputHiddenInput,
  PinInputInputs,
  PinInputLabel,
} from '@/registry/solid/ui/pin-input';
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
      <CardHeader class={styles.header}>
        <CardTitle>Verify your email</CardTitle>
        <CardDescription>Enter the 6-digit code from your email.</CardDescription>
      </CardHeader>

      <CardBody>
        <form class={styles.stack} noValidate onSubmit={handleSubmit}>
          <Field class={styles.field} invalid={invalid()} required>
            <PinInput
              class={styles.code}
              count={6}
              name="code"
              otp
              onValueChange={() => setInvalid(false)}
            >
              <PinInputLabel>Verification code</PinInputLabel>
              <PinInputHiddenInput />
              <PinInputControl>
                <PinInputInputs />
              </PinInputControl>
            </PinInput>
            {invalid() ? (
              <FieldErrorText>Enter all six digits before verifying.</FieldErrorText>
            ) : null}
          </Field>

          <Button type="submit" class={styles.submit}>
            Verify email
          </Button>
        </form>
      </CardBody>

      <CardFooter class={styles.footer}>
        <p>
          Wrong email?{' '}
          <a class={styles.link} href="/sign-in">
            Use a different one
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}