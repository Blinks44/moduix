<script lang="ts">
  import { TimerControl, type TimerControlProps } from '@ark-ui/svelte/timer';
  import { clsx } from 'clsx';
  import styles from './Timer.module.css';
  let { class: className, ref = $bindable(null), ...props }: TimerControlProps = $props();
</script>

<TimerControl
  {...props}
  bind:ref
  class={clsx(styles.control, className)}
  data-slot="timer-control"
/>