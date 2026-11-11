<script lang="ts">
  import { NumberInputScrubber, type NumberInputScrubberProps } from '@ark-ui/svelte/number-input';
  import { clsx } from 'clsx';
  import styles from './NumberInput.module.css';

  let { class: className, ref = $bindable(null), ...props }: NumberInputScrubberProps = $props();
</script>

<NumberInputScrubber
  {...props}
  bind:ref
  class={clsx(styles.scrubber, className)}
  data-slot="number-input-scrubber"
/>