<script lang="ts">
  import {
    PasswordInput,
    PasswordInputField,
    PasswordInputLabel,
    type PasswordInputRootProps,
  } from '@/components/password-input';

  let props: PasswordInputRootProps = $props();
</script>

<PasswordInput {...props}>
  <PasswordInputLabel>Password</PasswordInputLabel>
  <PasswordInputField />
</PasswordInput>