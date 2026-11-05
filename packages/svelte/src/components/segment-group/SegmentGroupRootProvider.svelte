<script module lang="ts">
  import type { SegmentGroupRootProviderProps as ArkSegmentGroupRootProviderProps } from '@ark-ui/svelte/segment-group';
  import type { SegmentGroupSize } from './SegmentGroup.svelte';

  export interface SegmentGroupRootProviderProps extends ArkSegmentGroupRootProviderProps {
    size?: SegmentGroupSize;
  }
</script>

<script lang="ts">
  import { SegmentGroupRootProvider } from '@ark-ui/svelte/segment-group';
  import { clsx } from 'clsx';
  import styles from './SegmentGroup.module.css';

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
  class={clsx(styles.root, className)}
  data-size={size}
  data-slot="segment-group-root-provider"
/>