<script lang="ts">
  import { ComboboxLabel, type ComboboxLabelProps } from '@ark-ui/svelte/combobox';
  import { clsx } from 'clsx';
  import styles from './Combobox.module.css';

  let { class: className, ref = $bindable(null), ...props }: ComboboxLabelProps = $props();
</script>

<ComboboxLabel
  {...props}
  bind:ref
  class={clsx(styles.label, className)}
  data-slot="combobox-label"
/>