<script lang="ts">
  import { ChevronDown, ChevronUp } from '@lucide/svelte';
  import {
    NumberInput,
    NumberInputControl,
    NumberInputDecrementTrigger,
    NumberInputIncrementTrigger,
    NumberInputInput,
    NumberInputLabel,
  } from '@moduix/svelte/number-input';
  import styles from '@/components/examples/number-input/number-input-custom-icons.module.css';
</script>

<NumberInput
  defaultValue="8"
  translations={{ decrementLabel: 'Decrease floors', incrementLabel: 'Increase floors' }}
>
  <NumberInputLabel>Floors</NumberInputLabel>
  <NumberInputControl>
    <NumberInputDecrementTrigger class={styles.button}>
      <ChevronDown />
    </NumberInputDecrementTrigger>
    <NumberInputInput class={styles.input} />
    <NumberInputIncrementTrigger class={styles.button}>
      <ChevronUp />
    </NumberInputIncrementTrigger>
  </NumberInputControl>
</NumberInput>