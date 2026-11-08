<script lang="ts">
  import { SplitterPanel, type SplitterPanelProps } from '@ark-ui/svelte/splitter';
  import { clsx } from 'clsx';
  import styles from './Splitter.module.css';

  let { class: className, ref = $bindable(null), ...props }: SplitterPanelProps = $props();
</script>

<SplitterPanel
  {...props}
  bind:ref
  class={clsx(styles.panel, className)}
  data-slot="splitter-panel"
/>