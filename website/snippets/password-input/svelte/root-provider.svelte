<script lang="ts">
  import {
    PasswordInputControl,
    PasswordInputIndicator,
    PasswordInputInput,
    PasswordInputLabel,
    PasswordInputRootProvider,
    PasswordInputVisibilityTrigger,
    usePasswordInput,
  } from '@moduix/svelte/password-input';
  import styles from '@/components/examples/password-input/password-input-root-provider.module.css';

  const passwordInput = usePasswordInput();
</script>

<PasswordInputRootProvider class={styles.root} value={passwordInput}>
  <PasswordInputLabel>Password</PasswordInputLabel>
  <PasswordInputControl>
    <PasswordInputInput placeholder="Managed outside the tree" />
    <PasswordInputVisibilityTrigger>
      <PasswordInputIndicator />
    </PasswordInputVisibilityTrigger>
  </PasswordInputControl>
</PasswordInputRootProvider>
<div data-preview-meta>
  <output>Visibility: {passwordInput().visible ? 'visible' : 'hidden'}</output>
</div>