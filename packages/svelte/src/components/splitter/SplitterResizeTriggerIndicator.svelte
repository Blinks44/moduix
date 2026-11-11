<script lang="ts">
  import {
    SplitterResizeTriggerIndicator,
    type SplitterResizeTriggerIndicatorProps,
  } from '@ark-ui/svelte/splitter';
  import { clsx } from 'clsx';
  import styles from './Splitter.module.css';

  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: SplitterResizeTriggerIndicatorProps = $props();
</script>

<SplitterResizeTriggerIndicator
  {...props}
  bind:ref
  class={clsx(styles.resizeTriggerIndicator, className)}
  data-slot="splitter-resize-trigger-indicator"
/>