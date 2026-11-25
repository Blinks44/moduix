<script lang="ts">
  import { SelectTrigger, type SelectTriggerProps } from '@ark-ui/svelte/select';
  import { cn } from '@/lib/moduix/cn';

  let { asChild, class: className, ref = $bindable(null), ...props }: SelectTriggerProps = $props();
</script>

<!-- An asChild host keeps its own styling. -->
<SelectTrigger
  {...props}
  bind:ref
  {asChild}
  class={cn(
    !asChild && [
      'peer/select-trigger inline-flex h-control-md w-full min-w-0 cursor-pointer items-center rounded-md border border-input bg-background px-3.5 pe-[calc(var(--select-action-offset)+var(--select-action-size)+0.875rem)] text-start text-inherit outline-focus-halo outline-transparent transition-[border-color,outline-color] duration-normal ease-in-out select-none [font:inherit]',
      'group-has-[>[data-slot=select-clear-trigger]:not([hidden])]/select-control:pe-[calc(var(--select-action-offset)+var(--select-action-size)*2+0.75rem)]',
      'disabled:cursor-default data-placeholder-shown:text-muted-foreground',
      'focus-visible:border-ring focus-visible:outline-ring/50 data-[state=open]:border-ring data-[state=open]:outline-ring/50',
      'group-data-invalid/select-control:border-destructive group-data-invalid/select-control:focus-visible:outline-destructive/20 group-data-invalid/select-control:data-[state=open]:outline-destructive/20',
    ],
    className,
  )}
  data-slot="select-trigger"
/>