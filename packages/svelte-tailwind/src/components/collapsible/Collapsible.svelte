<script lang="ts">
  import { CollapsibleRoot, type CollapsibleRootProps } from '@ark-ui/svelte/collapsible';
  import { cn } from '@/lib/moduix/cn';

  let {
    class: className,
    open = $bindable(),
    ref = $bindable(null),
    ...props
  }: CollapsibleRootProps = $props();
</script>

<CollapsibleRoot
  {...props}
  bind:ref
  bind:open
  class={cn('flex w-full min-w-0 flex-col text-foreground', className)}
  data-slot="collapsible-root"
/>