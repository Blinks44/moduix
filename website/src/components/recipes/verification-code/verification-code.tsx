import { Button } from '@moduix/react/button';
import {
  Card, CardBody, CardDescription, CardFooter, CardHeader, CardTitle, } from '@moduix/react/card';
import { Field, FieldErrorText } from '@moduix/react/field';
import { PinInput, PinInputHiddenInput, PinInputLabel, PinInputControl, PinInputInputs } from '@moduix/react/pin-input';
import type { FormEventHandler } from 'react';
import { useState } from 'react';
import styles from './verification-code-form.module.css';

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
      <CardHeader className={styles.header}>
        <CardTitle>Verify your email</CardTitle>
        <CardDescription>Enter the 6-digit code from your email.</CardDescription>
      </CardHeader>

      <CardBody>
        <form className={styles.stack} noValidate onSubmit={handleSubmit}>
          <Field className={styles.field} invalid={invalid} required>
            <PinInput
              className={styles.code}
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
            {invalid ? (
              <FieldErrorText>Enter all six digits before verifying.</FieldErrorText>
            ) : null}
          </Field>

          <Button type="submit" className={styles.submit}>
            Verify email
          </Button>
        </form>
      </CardBody>

      <CardFooter className={styles.footer}>
        <p>
          Wrong email?{' '}
          <a className={styles.link} href="/sign-in">
            Use a different one
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}
