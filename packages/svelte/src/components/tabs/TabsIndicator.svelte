<script lang="ts">
  import { TabIndicator, type TabIndicatorProps } from '@ark-ui/svelte/tabs';
  import { clsx } from 'clsx';
  import styles from './Tabs.module.css';

  let { class: className, ref = $bindable(null), ...props }: TabIndicatorProps = $props();
</script>

<TabIndicator
  {...props}
  bind:ref
  class={clsx(styles.indicator, className)}
  data-slot="tabs-indicator"
/>