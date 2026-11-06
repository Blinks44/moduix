<script lang="ts">
  import { FloatingPanelTitle, type FloatingPanelTitleProps } from '@ark-ui/svelte/floating-panel';
  import { clsx } from 'clsx';
  import styles from './FloatingPanel.module.css';

  let { class: className, ref = $bindable(null), ...props }: FloatingPanelTitleProps = $props();
</script>

<FloatingPanelTitle
  {...props}
  bind:ref
  class={clsx(styles.title, className)}
  data-slot="floating-panel-title"
/>