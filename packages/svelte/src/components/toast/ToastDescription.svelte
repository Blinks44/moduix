<script lang="ts">
  import {
    ToastDescription,
    useToastContext,
    type ToastDescriptionProps,
  } from '@ark-ui/svelte/toast';
  import { clsx } from 'clsx';
  import styles from './Toast.module.css';
  import ToastValue from './ToastValue.svelte';

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: ToastDescriptionProps = $props();

  const toast = useToastContext();
</script>

<ToastDescription
  {...props}
  bind:ref
  class={clsx(styles.description, className)}
  data-slot="toast-description"
>
  {#if children}{@render children()}{:else}<ToastValue value={toast().description} />{/if}
</ToastDescription>