<script lang="ts">
  import { TabList, type TabListProps } from '@ark-ui/svelte/tabs';
  import { clsx } from 'clsx';
  import styles from './Tabs.module.css';

  let { class: className, ref = $bindable(null), ...props }: TabListProps = $props();
</script>

<TabList {...props} bind:ref class={clsx(styles.list, className)} data-slot="tabs-list" />