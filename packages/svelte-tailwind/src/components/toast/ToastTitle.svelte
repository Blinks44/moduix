<script lang="ts">
  import { ToastTitle, useToastContext, type ToastTitleProps } from '@ark-ui/svelte/toast';
  import { cn } from '@/lib/moduix/cn';
  import ToastValue from './ToastValue.svelte';

  let { children, class: className, ref = $bindable(null), ...props }: ToastTitleProps = $props();

  const toast = useToastContext();
</script>

<ToastTitle
  {...props}
  bind:ref
  class={cn(
    'm-0 flex min-w-0 items-center gap-2 text-sm leading-5 font-semibold wrap-anywhere',
    className,
  )}
  data-slot="toast-title"
>
  {#if children}{@render children()}{:else}<ToastValue value={toast().title} />{/if}
</ToastTitle>