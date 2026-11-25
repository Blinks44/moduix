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
    <Card class="w-[min(100%,26rem)]">
      <CardHeader class="flex flex-col gap-2 text-center">
        <CardTitle>Verify your email</CardTitle>
        <CardDescription>Enter the 6-digit code from your email.</CardDescription>
      </CardHeader>

      <CardBody>
        <form class="grid gap-4" noValidate onSubmit={handleSubmit}>
          <Field class="items-center" invalid={invalid()} required>
            <PinInput
              class="w-full items-center"
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

          <Button type="submit" class="w-full">
            Verify email
          </Button>
        </form>
      </CardBody>

      <CardFooter class="justify-center text-center [&_p]:m-0 [&_p]:text-sm [&_p]:text-muted-foreground">
        <p>
          Wrong email?{' '}
          <a
            class="text-sm font-medium text-primary underline-offset-[0.2em] hover:text-foreground hover:underline focus-visible:rounded-xs focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-ring"
            href="/sign-in"
          >
            Use a different one
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}