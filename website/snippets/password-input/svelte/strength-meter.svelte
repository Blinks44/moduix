<script lang="ts">
  import {
    PasswordInput,
    PasswordInputControl,
    PasswordInputIndicator,
    PasswordInputInput,
    PasswordInputLabel,
    PasswordInputVisibilityTrigger,
  } from '@moduix/svelte/password-input';
  import styles from '@/components/examples/password-input/password-input-strength-meter.module.css';

  let password = $state('asdfasdf');
  const strength = $derived(getPasswordStrength(password));

  function getPasswordStrength(value: string) {
    if (!value) return null;
    if (value.length >= 10 && /[0-9]/.test(value) && /[^a-zA-Z0-9]/.test(value)) return 'strong';
    if (value.length >= 6) return 'medium';
    return 'weak';
  }
</script>

<PasswordInput class={styles.root}>
  <PasswordInputLabel>Password</PasswordInputLabel>
  <PasswordInputControl>
    <PasswordInputInput bind:value={password} placeholder="Enter your password" />
    <PasswordInputVisibilityTrigger>
      <PasswordInputIndicator />
    </PasswordInputVisibilityTrigger>
  </PasswordInputControl>
  {#if strength}
    <div class={styles.strengthMeter}>
      <div class={styles.strengthBar}>
        <div class={styles.strengthFill} data-strength={strength}></div>
      </div>
      <div class={styles.strengthLabel}>{strength} password</div>
    </div>
  {/if}
</PasswordInput>