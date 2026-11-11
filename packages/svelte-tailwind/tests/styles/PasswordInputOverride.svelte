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

<PasswordInput class="w-80 max-w-sm gap-4 text-muted-foreground">
  <PasswordInputLabel>Password</PasswordInputLabel>
  <PasswordInputControl class="min-h-20 rounded-lg border-2 border-primary bg-muted pe-0">
    <PasswordInputInput />
    <PasswordInputVisibilityTrigger>
      <PasswordInputIndicator />
    </PasswordInputVisibilityTrigger>
  </PasswordInputControl>
</PasswordInput>