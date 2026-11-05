<script module lang="ts">
  import type { SegmentGroupRootProps as ArkSegmentGroupRootProps } from '@ark-ui/svelte/segment-group';

  export type SegmentGroupSize = 'sm' | 'md' | 'lg';

  export interface SegmentGroupRootProps extends ArkSegmentGroupRootProps {
    size?: SegmentGroupSize;
  }
</script>

<script lang="ts">
  import { SegmentGroupRoot } from '@ark-ui/svelte/segment-group';
  import { clsx } from 'clsx';
  import styles from './SegmentGroup.module.css';

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
  class={clsx(styles.root, className)}
  data-size={size}
  data-slot="segment-group-root"
/>