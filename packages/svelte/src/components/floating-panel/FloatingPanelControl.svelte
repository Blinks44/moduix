<script lang="ts">
  import {
    FloatingPanelControl,
    type FloatingPanelControlProps,
  } from '@ark-ui/svelte/floating-panel';
  import { clsx } from 'clsx';
  import styles from './FloatingPanel.module.css';

  let { class: className, ref = $bindable(null), ...props }: FloatingPanelControlProps = $props();
</script>

<FloatingPanelControl
  {...props}
  bind:ref
  class={clsx(styles.control, className)}
  data-slot="floating-panel-control"
/>