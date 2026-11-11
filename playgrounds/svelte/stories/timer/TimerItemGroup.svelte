<script lang="ts">
  import { TimerItem, type TimerItemProps } from '@/components/timer';
  import styles from './Timer.stories.module.css';

  let { label, type }: { label: string; type: TimerItemProps['type'] } = $props();
</script>

<span class={styles.itemGroup}>
  <TimerItem {type} />
  <span class={styles.itemLabel}>{label}</span>
</span>