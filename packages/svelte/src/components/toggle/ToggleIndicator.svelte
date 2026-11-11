<script lang="ts">
  import { ToggleIndicator, type ToggleIndicatorProps } from '@ark-ui/svelte/toggle';
  import { clsx } from 'clsx';
  import styles from './Toggle.module.css';

  let { class: className, ref = $bindable(null), ...props }: ToggleIndicatorProps = $props();
</script>

<ToggleIndicator
  {...props}
  bind:ref
  class={clsx(styles.indicator, className)}
  data-slot="toggle-indicator"
/>