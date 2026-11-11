<script lang="ts">
  import { TocIndicator, type TocIndicatorProps } from '@ark-ui/svelte/toc';
  import { clsx } from 'clsx';
  import styles from './Toc.module.css';

  let { class: className, ref = $bindable(null), ...props }: TocIndicatorProps = $props();
</script>

<TocIndicator
  {...props}
  bind:ref
  class={clsx(styles.indicator, className)}
  data-slot="toc-indicator"
/>