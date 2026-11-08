<script lang="ts">
  import {
    PasswordInput,
    PasswordInputControl,
    PasswordInputIndicator,
    PasswordInputInput,
    PasswordInputLabel,
    PasswordInputVisibilityTrigger,
  } from '@moduix/svelte/password-input';
  import styles from '@/components/examples/password-input/password-input-autocomplete.module.css';
</script>

<PasswordInput class={styles.root} autoComplete="new-password" name="new-password">
  <PasswordInputLabel>New password</PasswordInputLabel>
  <PasswordInputControl>
    <PasswordInputInput placeholder="Create a password" />
    <PasswordInputVisibilityTrigger>
      <PasswordInputIndicator />
    </PasswordInputVisibilityTrigger>
  </PasswordInputControl>
</PasswordInput>