<script lang="ts">
  import { ToastActionTrigger, type ToastActionTriggerProps } from '@ark-ui/svelte/toast';
  import { clsx } from 'clsx';
  import styles from './Toast.module.css';

  let {
    asChild,
    class: className,
    ref = $bindable(null),
    ...props
  }: ToastActionTriggerProps = $props();
</script>

<ToastActionTrigger
  {...props}
  bind:ref
  {asChild}
  class={clsx(!asChild && styles.actionTrigger, className)}
  data-slot="toast-action-trigger"
/>