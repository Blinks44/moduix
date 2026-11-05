<script lang="ts">
  import type { PasswordInputControlProps } from '@ark-ui/svelte/password-input';
  import PasswordInputControl from './PasswordInputControl.svelte';
  import PasswordInputIndicator from './PasswordInputIndicator.svelte';
  import PasswordInputInput from './PasswordInputInput.svelte';
  import PasswordInputVisibilityTrigger from './PasswordInputVisibilityTrigger.svelte';

  let { ref = $bindable(null), ...props }: Omit<PasswordInputControlProps, 'asChild' | 'children'> =
    $props();
</script>

<PasswordInputControl {...props} bind:ref>
  <PasswordInputInput />
  <PasswordInputVisibilityTrigger>
    <PasswordInputIndicator />
  </PasswordInputVisibilityTrigger>
</PasswordInputControl>