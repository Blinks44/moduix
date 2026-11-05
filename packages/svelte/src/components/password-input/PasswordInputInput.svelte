<script lang="ts">
  import { PasswordInputInput, type PasswordInputInputProps } from '@ark-ui/svelte/password-input';
  import { clsx } from 'clsx';
  import styles from './PasswordInput.module.css';

  let {
    class: className,
    value = $bindable(),
    ref = $bindable(null),
    ...props
  }: PasswordInputInputProps = $props();
</script>

<PasswordInputInput
  {...props}
  bind:ref
  bind:value
  class={clsx(styles.input, className)}
  data-slot="password-input-input"
/>