<script lang="ts">
  import {
    PasswordInput,
    PasswordInputControl,
    PasswordInputIndicator,
    PasswordInputInput,
    PasswordInputLabel,
    PasswordInputVisibilityTrigger,
  } from '@moduix/svelte/password-input';
  import styles from '@/components/examples/password-input/password-input-controlled-visibility.module.css';

  let visible = $state(false);
</script>

<PasswordInput class={styles.root} bind:visible>
  <PasswordInputLabel>Password</PasswordInputLabel>
  <PasswordInputControl>
    <PasswordInputInput placeholder="Toggle visibility" />
    <PasswordInputVisibilityTrigger>
      <PasswordInputIndicator />
    </PasswordInputVisibilityTrigger>
  </PasswordInputControl>
</PasswordInput>
<output>Visibility: {visible ? 'visible' : 'hidden'}</output>