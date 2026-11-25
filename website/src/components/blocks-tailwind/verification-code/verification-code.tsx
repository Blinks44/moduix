'use client';

import type { FormEventHandler } from 'react';
import { useState } from 'react';
import { Button } from '@/registry/react/ui/button';
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/registry/react/ui/card';
import { Field, FieldErrorText } from '@/registry/react/ui/field';
import {
  PinInput,
  PinInputHiddenInput,
  PinInputLabel,
  PinInputControl,
  PinInputInputs,
} from '@/registry/react/ui/pin-input';

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
    <Card className="w-[min(100%,26rem)]">
      <CardHeader className="flex flex-col gap-2 text-center">
        <CardTitle>Verify your email</CardTitle>
        <CardDescription>Enter the 6-digit code from your email.</CardDescription>
      </CardHeader>

      <CardBody>
        <form className="grid gap-4" noValidate onSubmit={handleSubmit}>
          <Field className="items-center" invalid={invalid} required>
            <PinInput
              className="w-full items-center"
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

          <Button type="submit" className="w-full">
            Verify email
          </Button>
        </form>
      </CardBody>

      <CardFooter className="justify-center text-center [&_p]:m-0 [&_p]:text-sm [&_p]:text-muted-foreground">
        <p>
          Wrong email?{' '}
          <a
            className="text-sm font-medium text-primary underline-offset-[0.2em] hover:text-foreground hover:underline focus-visible:rounded-xs focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-ring"
            href="/sign-in"
          >
            Use a different one
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}