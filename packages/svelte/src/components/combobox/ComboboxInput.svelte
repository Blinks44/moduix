<script lang="ts">
  import { ComboboxInput, type ComboboxInputProps } from '@ark-ui/svelte/combobox';
  import { clsx } from 'clsx';
  import styles from './Combobox.module.css';

  let { asChild, class: className, ref = $bindable(null), ...props }: ComboboxInputProps = $props();
</script>

<ComboboxInput
  {...props}
  bind:ref
  {asChild}
  class={clsx(!asChild && styles.input, className)}
  data-slot="combobox-input"
/>