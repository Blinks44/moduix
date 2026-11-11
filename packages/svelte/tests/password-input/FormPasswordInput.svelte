<script lang="ts">
  import {
    PasswordInput,
    PasswordInputControl,
    PasswordInputIndicator,
    PasswordInputInput,
    PasswordInputLabel,
    PasswordInputVisibilityTrigger,
  } from '@/components/password-input';
</script>

<form data-testid="form">
  <PasswordInput name="password" id="form-password">
    <PasswordInputLabel>Password</PasswordInputLabel>
    <PasswordInputControl>
      <PasswordInputInput defaultValue="initial-password" />
      <PasswordInputVisibilityTrigger>
        <PasswordInputIndicator />
      </PasswordInputVisibilityTrigger>
    </PasswordInputControl>
  </PasswordInput>
</form>