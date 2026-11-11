<script lang="ts">
  import {
    NumberInputValueText,
    type NumberInputValueTextProps,
  } from '@ark-ui/svelte/number-input';
  import { clsx } from 'clsx';
  import styles from './NumberInput.module.css';

  let { class: className, ref = $bindable(null), ...props }: NumberInputValueTextProps = $props();
</script>

<NumberInputValueText
  {...props}
  bind:ref
  class={clsx(styles.valueText, className)}
  data-slot="number-input-value-text"
/>