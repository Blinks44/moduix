<script lang="ts">
  import {
    PasswordInputControl,
    type PasswordInputControlProps,
  } from '@ark-ui/svelte/password-input';
  import { clsx } from 'clsx';
  import styles from './PasswordInput.module.css';

  let { class: className, ref = $bindable(null), ...props }: PasswordInputControlProps = $props();
</script>

<PasswordInputControl
  {...props}
  bind:ref
  class={clsx(styles.control, className)}
  data-slot="password-input-control"
/>