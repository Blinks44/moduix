<script lang="ts">
  import { NumberInputInput, type NumberInputInputProps } from '@ark-ui/svelte/number-input';
  import { clsx } from 'clsx';
  import styles from './NumberInput.module.css';

  let { class: className, ref = $bindable(null), ...props }: NumberInputInputProps = $props();
</script>

<NumberInputInput
  {...props}
  bind:ref
  class={clsx(styles.input, className)}
  data-slot="number-input-input"
/>