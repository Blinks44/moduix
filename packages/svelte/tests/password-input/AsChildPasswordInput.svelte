<script lang="ts">
  import {
    PasswordInput,
    PasswordInputField,
    PasswordInputLabel,
  } from '@/components/password-input';

  let rootRef: Element | null = $state(null);

  export const getRootRef = () => rootRef;
</script>

<PasswordInput bind:ref={rootRef} class="consumer-root">
  {#snippet asChild(props)}
    <section {...props()} aria-label="Password input">
      <PasswordInputLabel>Password</PasswordInputLabel>
      <PasswordInputField />
    </section>
  {/snippet}
</PasswordInput>