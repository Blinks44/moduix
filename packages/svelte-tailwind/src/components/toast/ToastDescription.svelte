<script lang="ts">
  import {
    ToastDescription,
    useToastContext,
    type ToastDescriptionProps,
  } from '@ark-ui/svelte/toast';
  import { cn } from '@/lib/moduix/cn';
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
  class={cn('m-0 min-w-0 text-sm leading-5 wrap-anywhere text-muted-foreground', className)}
  data-slot="toast-description"
>
  {#if children}{@render children()}{:else}<ToastValue value={toast().description} />{/if}
</ToastDescription>