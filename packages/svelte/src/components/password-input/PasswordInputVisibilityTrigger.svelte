<script lang="ts">
  import {
    PasswordInputVisibilityTrigger,
    type PasswordInputVisibilityTriggerProps,
  } from '@ark-ui/svelte/password-input';
  import { clsx } from 'clsx';
  import styles from './PasswordInput.module.css';

  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: PasswordInputVisibilityTriggerProps = $props();
</script>

<PasswordInputVisibilityTrigger
  {...props}
  bind:ref
  class={clsx(styles.visibilityTrigger, className)}
  data-slot="password-input-visibility-trigger"
/>