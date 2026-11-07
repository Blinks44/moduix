<script lang="ts">
  import { TimerArea, type TimerAreaProps } from '@ark-ui/svelte/timer';
  import { clsx } from 'clsx';
  import styles from './Timer.module.css';
  let { class: className, ref = $bindable(null), ...props }: TimerAreaProps = $props();
</script>

<TimerArea {...props} bind:ref class={clsx(styles.area, className)} data-slot="timer-area" />