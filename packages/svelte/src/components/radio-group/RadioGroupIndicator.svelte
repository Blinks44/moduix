<script lang="ts">
  import { RadioGroupIndicator, type RadioGroupIndicatorProps } from '@ark-ui/svelte/radio-group';
  import { clsx } from 'clsx';
  import styles from './RadioGroup.module.css';

  let { class: className, ref = $bindable(null), ...props }: RadioGroupIndicatorProps = $props();
</script>

<RadioGroupIndicator
  {...props}
  bind:ref
  class={clsx(styles.indicator, className)}
  data-slot="radio-group-indicator"
/>