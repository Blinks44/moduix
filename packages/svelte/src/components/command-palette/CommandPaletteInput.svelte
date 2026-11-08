<script lang="ts">
  import { ComboboxInput, type ComboboxInputProps } from '@ark-ui/svelte/combobox';
  import { clsx } from 'clsx';
  import styles from './CommandPalette.module.css';
  let { class: className, ref = $bindable(null), ...props }: ComboboxInputProps = $props();
</script>

<ComboboxInput
  {...props}
  bind:ref
  class={clsx(styles.input, className)}
  data-slot="command-palette-input"
/>