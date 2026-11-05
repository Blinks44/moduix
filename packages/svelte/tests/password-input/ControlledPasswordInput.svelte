<script lang="ts">
  import {
    PasswordInput,
    PasswordInputField,
    PasswordInputLabel,
  } from '@/components/password-input';

  let { changes }: { changes: boolean[] } = $props();
  let visible = $state(false);

  export const getVisible = () => visible;
</script>

<PasswordInput bind:visible onVisibilityChange={(details) => changes.push(details.visible)}>
  <PasswordInputLabel>Password</PasswordInputLabel>
  <PasswordInputField />
</PasswordInput>