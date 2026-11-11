<script lang="ts">
  import { TimerRootProvider, type TimerRootProviderProps } from '@ark-ui/svelte/timer';
  import { clsx } from 'clsx';
  import styles from './Timer.module.css';
  let { class: className, ref = $bindable(null), ...props }: TimerRootProviderProps = $props();
</script>

<TimerRootProvider
  {...props}
  bind:ref
  class={clsx(styles.root, className)}
  data-slot="timer-root-provider"
/>