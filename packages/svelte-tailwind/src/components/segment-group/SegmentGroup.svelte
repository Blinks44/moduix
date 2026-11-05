<script module lang="ts">
  import type { SegmentGroupRootProps as ArkSegmentGroupRootProps } from '@ark-ui/svelte/segment-group';

  export type SegmentGroupSize = 'sm' | 'md' | 'lg';

  export interface SegmentGroupRootProps extends ArkSegmentGroupRootProps {
    size?: SegmentGroupSize;
  }
</script>

<script lang="ts">
  import { SegmentGroupRoot } from '@ark-ui/svelte/segment-group';
  import { cn } from '@/lib/moduix/cn';

  const rootClass =
    'group/segment-group isolate inline-flex max-w-full gap-1 rounded-lg border border-border bg-muted p-1 text-foreground [--_segment-group-size:var(--moduix-size-md)] data-disabled:opacity-disabled data-invalid:border-destructive data-[orientation=vertical]:flex-col data-[size=lg]:[--_segment-group-size:var(--moduix-size-lg)] data-[size=sm]:[--_segment-group-size:var(--moduix-size-sm)]';

  let {
    class: className,
    orientation = 'horizontal',
    ref = $bindable(null),
    size = 'md',
    value = $bindable(),
    ...props
  }: SegmentGroupRootProps = $props();
</script>

<SegmentGroupRoot
  {...props}
  bind:ref
  bind:value
  {orientation}
  class={cn(rootClass, className)}
  data-size={size}
  data-slot="segment-group-root"
/>