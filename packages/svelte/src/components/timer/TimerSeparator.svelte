<script lang="ts">
  import { TimerSeparator, type TimerSeparatorProps } from '@ark-ui/svelte/timer';
  import { clsx } from 'clsx';
  import styles from './Timer.module.css';
  let { class: className, ref = $bindable(null), ...props }: TimerSeparatorProps = $props();
</script>

<TimerSeparator
  {...props}
  bind:ref
  class={clsx(styles.separator, className)}
  data-slot="timer-separator"
/>