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

<PasswordInput>
  <PasswordInputLabel>Password</PasswordInputLabel>
  <PasswordInputControl>
    <PasswordInputInput />
    <PasswordInputVisibilityTrigger>
      <PasswordInputIndicator>
        Visible icon
        {#snippet fallback()}Hidden icon{/snippet}
      </PasswordInputIndicator>
    </PasswordInputVisibilityTrigger>
  </PasswordInputControl>
</PasswordInput>