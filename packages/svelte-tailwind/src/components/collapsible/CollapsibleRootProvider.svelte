<script lang="ts">
  import {
    CollapsibleRootProvider,
    type CollapsibleRootProviderProps,
  } from '@ark-ui/svelte/collapsible';
  import { cn } from '@/lib/moduix/cn';

  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: CollapsibleRootProviderProps = $props();
</script>

<CollapsibleRootProvider
  {...props}
  bind:ref
  class={cn('flex w-full min-w-0 flex-col text-foreground', className)}
  data-slot="collapsible-root-provider"
/>