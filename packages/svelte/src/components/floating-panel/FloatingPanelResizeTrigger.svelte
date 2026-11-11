<script lang="ts">
  import {
    FloatingPanelResizeTrigger,
    type FloatingPanelResizeTriggerProps,
  } from '@ark-ui/svelte/floating-panel';
  import { clsx } from 'clsx';
  import styles from './FloatingPanel.module.css';

  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: FloatingPanelResizeTriggerProps = $props();
</script>

<FloatingPanelResizeTrigger
  {...props}
  bind:ref
  class={clsx(styles.resizeTrigger, className)}
  data-slot="floating-panel-resize-trigger"
/>