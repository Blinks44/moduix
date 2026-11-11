<script lang="ts">
  import { TimerRoot, type TimerRootProps } from '@ark-ui/svelte/timer';
  import { clsx } from 'clsx';
  import styles from './Timer.module.css';
  let { class: className, ref = $bindable(null), ...props }: TimerRootProps = $props();
</script>

<TimerRoot {...props} bind:ref class={clsx(styles.root, className)} data-slot="timer-root" />