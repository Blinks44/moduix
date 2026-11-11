<script lang="ts">
  import {
    FloatingPanelCloseTrigger,
    type FloatingPanelCloseTriggerProps,
  } from '@ark-ui/svelte/floating-panel';
  import { clsx } from 'clsx';
  import styles from './FloatingPanel.module.css';

  let {
    asChild,
    class: className,
    ref = $bindable(null),
    ...props
  }: FloatingPanelCloseTriggerProps = $props();
</script>

<FloatingPanelCloseTrigger
  {...props}
  bind:ref
  {asChild}
  class={clsx(!asChild && styles.controlButton, className)}
  data-slot="floating-panel-close-trigger"
/>