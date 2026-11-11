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
  import styles from './verification-code-form.module.css';

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

<Card class={styles.root}>
  <CardHeader class={styles.header}>
    <CardTitle>Verify your email</CardTitle>
    <CardDescription>Enter the 6-digit code from your email.</CardDescription>
  </CardHeader>
  <CardBody>
    <form class={styles.stack} novalidate onsubmit={handleSubmit}>
      <Field class={styles.field} {invalid} required>
        <PinInput
          class={styles.code}
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
      <Button type="submit" class={styles.submit}>Verify email</Button>
    </form>
  </CardBody>
  <CardFooter class={styles.footer}>
    <p>Wrong email? <a class={styles.link} href="/sign-in">Use a different one</a></p>
  </CardFooter>
</Card>