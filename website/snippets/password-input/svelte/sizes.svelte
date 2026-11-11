<script lang="ts">
  import {
    PasswordInput,
    PasswordInputField,
    PasswordInputLabel,
  } from '@moduix/svelte/password-input';
  import styles from '@/components/examples/password-input/password-input-sizes.module.css';

  const sizes = [
    ['xs', 'Extra small'],
    ['sm', 'Small'],
    ['md', 'Medium'],
    ['lg', 'Large'],
    ['xl', 'Extra large'],
  ] as const;
</script>

<div class={styles.root}>
  {#each sizes as [size, label] (size)}
    <PasswordInput {size}>
      <PasswordInputLabel>{label}</PasswordInputLabel>
      <PasswordInputField />
    </PasswordInput>
  {/each}
</div>