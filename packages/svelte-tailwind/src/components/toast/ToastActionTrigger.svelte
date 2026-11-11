<script lang="ts">
  import { ToastActionTrigger, type ToastActionTriggerProps } from '@ark-ui/svelte/toast';
  import { cn } from '@/lib/moduix/cn';

  let {
    asChild,
    class: className,
    ref = $bindable(null),
    ...props
  }: ToastActionTriggerProps = $props();

  const actionClass =
    'mt-2 inline-flex min-h-control-xs w-max max-w-full min-w-0 cursor-pointer items-center justify-center gap-2 rounded-sm border border-border bg-transparent px-2 py-1 text-start text-xs leading-4 font-medium wrap-anywhere text-foreground transition-[background-color] duration-normal ease-in-out select-none focus-visible:outline-focus-inset focus-visible:outline-ring [@media(hover:hover)]:hover:bg-accent';
</script>

<ToastActionTrigger
  {...props}
  bind:ref
  {asChild}
  class={cn(!asChild && actionClass, className)}
  data-slot="toast-action-trigger"
/>