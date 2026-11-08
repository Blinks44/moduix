<script lang="ts">
  import { TabContent, type TabContentProps } from '@ark-ui/svelte/tabs';
  import { clsx } from 'clsx';
  import styles from './Tabs.module.css';

  let { class: className, ref = $bindable(null), ...props }: TabContentProps = $props();
</script>

<TabContent {...props} bind:ref class={clsx(styles.content, className)} data-slot="tabs-content" />