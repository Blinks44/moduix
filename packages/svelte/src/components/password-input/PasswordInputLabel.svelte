<script lang="ts">
  import { PasswordInputLabel, type PasswordInputLabelProps } from '@ark-ui/svelte/password-input';
  import { clsx } from 'clsx';
  import styles from './PasswordInput.module.css';

  let { class: className, ref = $bindable(null), ...props }: PasswordInputLabelProps = $props();
</script>

<PasswordInputLabel
  {...props}
  bind:ref
  class={clsx(styles.label, className)}
  data-slot="password-input-label"
/>