<script lang="ts">
  import {
    FloatingPanelHeader,
    type FloatingPanelHeaderProps,
  } from '@ark-ui/svelte/floating-panel';
  import { clsx } from 'clsx';
  import styles from './FloatingPanel.module.css';

  let { class: className, ref = $bindable(null), ...props }: FloatingPanelHeaderProps = $props();
</script>

<FloatingPanelHeader
  {...props}
  bind:ref
  class={clsx(styles.header, className)}
  data-slot="floating-panel-header"
/>