<script lang="ts">
  import { Field, FieldErrorText } from '@moduix/svelte/field';
  import {
    PasswordInput,
    PasswordInputControl,
    PasswordInputIndicator,
    PasswordInputInput,
    PasswordInputLabel,
    PasswordInputVisibilityTrigger,
  } from '@moduix/svelte/password-input';
  import styles from '@/components/examples/password-input/password-input-with-validation.module.css';

  let password = $state('');
  const isValid = $derived(password.length >= 8);
  const invalid = $derived(!isValid && password.length > 0);
</script>

<Field class={styles.root} {invalid}>
  <PasswordInput>
    <PasswordInputLabel>Password (min 8 characters)</PasswordInputLabel>
    <PasswordInputControl>
      <PasswordInputInput bind:value={password} placeholder="Enter your password" />
      <PasswordInputVisibilityTrigger>
        <PasswordInputIndicator />
      </PasswordInputVisibilityTrigger>
    </PasswordInputControl>
  </PasswordInput>
  <FieldErrorText>Password must be at least 8 characters.</FieldErrorText>
</Field>