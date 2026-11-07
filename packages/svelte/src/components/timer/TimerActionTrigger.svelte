<script lang="ts">
  import { TimerActionTrigger, type TimerActionTriggerProps } from '@ark-ui/svelte/timer';
  import { clsx } from 'clsx';
  import styles from './Timer.module.css';
  let { class: className, ref = $bindable(null), ...props }: TimerActionTriggerProps = $props();
</script>

<TimerActionTrigger
  {...props}
  bind:ref
  class={clsx(styles.actionTrigger, className)}
  data-slot="timer-action-trigger"
/>