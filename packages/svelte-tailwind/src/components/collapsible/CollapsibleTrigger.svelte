<script lang="ts">
  import { CollapsibleTrigger, type CollapsibleTriggerProps } from '@ark-ui/svelte/collapsible';
  import { cn } from '@/lib/moduix/cn';

  let {
    asChild,
    class: className,
    ref = $bindable(null),
    ...props
  }: CollapsibleTriggerProps = $props();
</script>

<CollapsibleTrigger
  {...props}
  bind:ref
  {asChild}
  class={cn(
    !asChild &&
      'flex w-full cursor-pointer items-center justify-between gap-2 bg-transparent px-0 py-1 text-start text-sm outline-0 select-none focus-visible:outline-focus focus-visible:outline-offset-focus-inset focus-visible:outline-ring disabled:cursor-default disabled:opacity-disabled data-disabled:cursor-default data-disabled:opacity-disabled',
    className,
  )}
  data-slot="collapsible-trigger"
/>