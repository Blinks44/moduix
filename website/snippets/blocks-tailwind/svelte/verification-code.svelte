<script lang="ts">
  import { Button } from '@/components/ui/button';
  import {
    Card,
    CardBody,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';
  import { Field, FieldErrorText } from '@/components/ui/field';
  import {
    PinInput,
    PinInputControl,
    PinInputHiddenInput,
    PinInputInputs,
    PinInputLabel,
  } from '@/components/ui/pin-input';

  let { onsubmit }: { onsubmit?: (event: SubmitEvent) => void } = $props();
  let invalid = $state(false);

  const handleSubmit = (event: SubmitEvent) => {
    if (!(event.currentTarget instanceof HTMLFormElement)) return;
    const code = new FormData(event.currentTarget).get('code');
    invalid = typeof code !== 'string' || code.length !== 6;
    if (invalid) {
      event.preventDefault();
      return;
    }
    onsubmit?.(event);
  };
</script>

<Card class="w-[min(100%,26rem)]">
  <CardHeader class="flex flex-col gap-2 text-center">
    <CardTitle>Verify your email</CardTitle>
    <CardDescription>Enter the 6-digit code from your email.</CardDescription>
  </CardHeader>
  <CardBody>
    <form class="grid gap-4" novalidate onsubmit={handleSubmit}>
      <Field class="items-center" {invalid} required>
        <PinInput
          class="w-full items-center"
          count={6}
          name="code"
          otp
          onValueChange={() => (invalid = false)}
        >
          <PinInputLabel>Verification code</PinInputLabel>
          <PinInputHiddenInput />
          <PinInputControl><PinInputInputs /></PinInputControl>
        </PinInput>
        {#if invalid}
          <FieldErrorText>Enter all six digits before verifying.</FieldErrorText>
        {/if}
      </Field>
      <Button type="submit" class="w-full">Verify email</Button>
    </form>
  </CardBody>
  <CardFooter
    class="justify-center text-center [&_p]:m-0 [&_p]:text-sm [&_p]:text-muted-foreground"
  >
    <p>
      Wrong email? <a
        class="text-sm font-medium text-primary underline-offset-[0.2em] hover:text-foreground hover:underline focus-visible:rounded-xs focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-ring"
        href="/sign-in">Use a different one</a
      >
    </p>
  </CardFooter>
</Card>