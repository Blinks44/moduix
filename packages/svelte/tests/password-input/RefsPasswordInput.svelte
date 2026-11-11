<script lang="ts">
  import {
    PasswordInput,
    PasswordInputField,
    PasswordInputLabel,
  } from '@/components/password-input';

  let rootRef: Element | null = $state(null);
  let fieldRef: Element | null = $state(null);

  export const getRefs = () => ({ rootRef, fieldRef });
</script>

<PasswordInput bind:ref={rootRef} data-probe="root">
  <PasswordInputLabel>Password</PasswordInputLabel>
  <PasswordInputField bind:ref={fieldRef} class="consumer-control" title="password control" />
</PasswordInput>