<script lang="ts">
  import { TimerItem, type TimerItemProps } from '@ark-ui/svelte/timer';
  import { clsx } from 'clsx';
  import styles from './Timer.module.css';
  let { class: className, ref = $bindable(null), ...props }: TimerItemProps = $props();
</script>

<TimerItem {...props} bind:ref class={clsx(styles.item, className)} data-slot="timer-item" />