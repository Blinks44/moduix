<script lang="ts">
  import {
    PasswordInputIndicator,
    type PasswordInputIndicatorProps,
  } from '@ark-ui/svelte/password-input';
  import { clsx } from 'clsx';
  import { UiIcon } from '@/lib/moduix/icons/ui';
  import styles from './PasswordInput.module.css';

  let {
    children,
    class: className,
    fallback,
    ref = $bindable(null),
    ...props
  }: PasswordInputIndicatorProps = $props();
</script>

{#snippet visible()}
  <UiIcon icon="eye" />
{/snippet}

{#snippet hidden()}
  <UiIcon icon="eye-closed" />
{/snippet}

<PasswordInputIndicator
  {...props}
  bind:ref
  children={children ?? visible}
  fallback={fallback ?? hidden}
  class={clsx(styles.indicator, className)}
  data-slot="password-input-indicator"
/>