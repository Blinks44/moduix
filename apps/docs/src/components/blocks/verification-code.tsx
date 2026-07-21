import { Button, Card, Field, PinInput } from '@moduix/react';
import type { FormEventHandler } from 'react';
import { useState } from 'react';
import styles from './verification-code.module.css';
import '@moduix/react/style.css';

export function VerificationCode({ onSubmit }: { onSubmit?: FormEventHandler<HTMLFormElement> }) {
  const [invalid, setInvalid] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
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
    <Card className={styles.root}>
      <Card.Header className={styles.header}>
        <Card.Title>Verify your email</Card.Title>
        <Card.Description>Enter the 6-digit code from your email.</Card.Description>
      </Card.Header>

      <Card.Body>
        <form className={styles.form} noValidate onSubmit={handleSubmit}>
          <Field.Root className={styles.field} invalid={invalid} required>
            <PinInput
              className={styles.code}
              count={6}
              name="code"
              otp
              onValueChange={() => setInvalid(false)}
            >
              <PinInput.Label>Verification code</PinInput.Label>
              <PinInput.Control>
                <PinInput.Inputs />
              </PinInput.Control>
            </PinInput>
            {invalid ? (
              <Field.ErrorText>Enter all six digits before verifying.</Field.ErrorText>
            ) : null}
          </Field.Root>

          <Button type="submit" className={styles.submit}>
            Verify email
          </Button>
        </form>
      </Card.Body>

      <Card.Footer className={styles.footer}>
        <p>
          Wrong email?{' '}
          <a className={styles.link} href="/sign-in">
            Use a different one
          </a>
        </p>
      </Card.Footer>
    </Card>
  );
}