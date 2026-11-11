<script module lang="ts">
  import type { SegmentGroupRootProviderProps as ArkSegmentGroupRootProviderProps } from '@ark-ui/svelte/segment-group';
  import type { SegmentGroupSize } from './SegmentGroup.svelte';

  export interface SegmentGroupRootProviderProps extends ArkSegmentGroupRootProviderProps {
    size?: SegmentGroupSize;
  }
</script>

<script lang="ts">
  import { SegmentGroupRootProvider } from '@ark-ui/svelte/segment-group';
  import { cn } from '@/lib/moduix/cn';

  const rootClass =
    'group/segment-group isolate inline-flex max-w-full gap-1 rounded-lg border border-border bg-muted p-1 text-foreground [--_segment-group-size:var(--moduix-size-md)] data-disabled:opacity-disabled data-invalid:border-destructive data-[orientation=vertical]:flex-col data-[size=lg]:[--_segment-group-size:var(--moduix-size-lg)] data-[size=sm]:[--_segment-group-size:var(--moduix-size-sm)]';

  let {
    class: className,
    ref = $bindable(null),
    size = 'md',
    ...props
  }: SegmentGroupRootProviderProps = $props();
</script>

<SegmentGroupRootProvider
  {...props}
  bind:ref
  class={cn(rootClass, className)}
  data-size={size}
  data-slot="segment-group-root-provider"
/>