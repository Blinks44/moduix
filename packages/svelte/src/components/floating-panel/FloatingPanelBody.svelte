<script lang="ts">
  import { FloatingPanelBody, type FloatingPanelBodyProps } from '@ark-ui/svelte/floating-panel';
  import { clsx } from 'clsx';
  import styles from './FloatingPanel.module.css';

  let { class: className, ref = $bindable(null), ...props }: FloatingPanelBodyProps = $props();
</script>

<FloatingPanelBody
  {...props}
  bind:ref
  class={clsx(styles.body, className)}
  data-slot="floating-panel-body"
/>