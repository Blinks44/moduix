<script lang="ts">
  import { ToastTitle, useToastContext, type ToastTitleProps } from '@ark-ui/svelte/toast';
  import { clsx } from 'clsx';
  import styles from './Toast.module.css';
  import ToastValue from './ToastValue.svelte';

  let { children, class: className, ref = $bindable(null), ...props }: ToastTitleProps = $props();

  const toast = useToastContext();
</script>

<ToastTitle {...props} bind:ref class={clsx(styles.title, className)} data-slot="toast-title">
  {#if children}{@render children()}{:else}<ToastValue value={toast().title} />{/if}
</ToastTitle>