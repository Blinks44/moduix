<script lang="ts">
  import {
    FloatingPanelContent,
    type FloatingPanelContentProps,
  } from '@ark-ui/svelte/floating-panel';
  import { clsx } from 'clsx';
  import styles from './FloatingPanel.module.css';

  let { class: className, ref = $bindable(null), ...props }: FloatingPanelContentProps = $props();
</script>

<FloatingPanelContent
  {...props}
  bind:ref
  class={clsx(styles.content, className)}
  data-slot="floating-panel-content"
/>