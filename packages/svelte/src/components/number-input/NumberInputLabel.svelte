<script lang="ts">
  import { NumberInputLabel, type NumberInputLabelProps } from '@ark-ui/svelte/number-input';
  import { clsx } from 'clsx';
  import styles from './NumberInput.module.css';

  let { class: className, ref = $bindable(null), ...props }: NumberInputLabelProps = $props();
</script>

<NumberInputLabel
  {...props}
  bind:ref
  class={clsx(styles.label, className)}
  data-slot="number-input-label"
/>