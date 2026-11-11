<script lang="ts">
  import {
    PasswordInput,
    PasswordInputField,
    PasswordInputLabel,
  } from '@moduix/svelte/password-input';
  import styles from '@/components/examples/password-input/password-input-basic.module.css';
</script>

<PasswordInput class={styles.root} autoComplete="current-password">
  <PasswordInputLabel>Password</PasswordInputLabel>
  <PasswordInputField />
</PasswordInput>