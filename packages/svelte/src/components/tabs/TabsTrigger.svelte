<script lang="ts">
  import { TabTrigger, type TabTriggerProps } from '@ark-ui/svelte/tabs';
  import { clsx } from 'clsx';
  import styles from './Tabs.module.css';

  let { class: className, ref = $bindable(null), ...props }: TabTriggerProps = $props();
</script>

<TabTrigger {...props} bind:ref class={clsx(styles.trigger, className)} data-slot="tabs-trigger" />