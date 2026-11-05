<script lang="ts">
  import {
    PasswordInputContext,
    PasswordInputField,
    PasswordInputLabel,
    PasswordInputRootProvider,
    usePasswordInput,
  } from '@/components/password-input';

  const passwordInput = usePasswordInput();
</script>

<PasswordInputRootProvider value={passwordInput}>
  <PasswordInputLabel>Password</PasswordInputLabel>
  <PasswordInputField />
  <PasswordInputContext>
    {#snippet render(context)}
      <output>Visibility: {context().visible ? 'visible' : 'hidden'}</output>
    {/snippet}
  </PasswordInputContext>
</PasswordInputRootProvider>