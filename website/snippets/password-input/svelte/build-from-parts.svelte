<script lang="ts">
  import { Eye as EyeIcon, EyeClosed as EyeClosedIcon } from '@lucide/svelte';
  import {
    PasswordInput,
    PasswordInputControl,
    PasswordInputIndicator,
    PasswordInputInput,
    PasswordInputLabel,
    PasswordInputVisibilityTrigger,
  } from '@moduix/svelte/password-input';
  import styles from '@/components/examples/password-input/password-input-basic.module.css';
</script>

<PasswordInput class={styles.root} autoComplete="current-password">
  <PasswordInputLabel>Password</PasswordInputLabel>
  <PasswordInputControl>
    <PasswordInputInput />
    <PasswordInputVisibilityTrigger>
      <PasswordInputIndicator>
        <EyeIcon />
        {#snippet fallback()}<EyeClosedIcon />{/snippet}
      </PasswordInputIndicator>
    </PasswordInputVisibilityTrigger>
  </PasswordInputControl>
</PasswordInput>