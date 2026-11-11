<script lang="ts">
  import { ComboboxEmpty, type ComboboxEmptyProps } from '@ark-ui/svelte/combobox';
  import { clsx } from 'clsx';
  import styles from './Combobox.module.css';

  let { class: className, ref = $bindable(null), ...props }: ComboboxEmptyProps = $props();
</script>

<ComboboxEmpty
  {...props}
  bind:ref
  class={clsx(styles.empty, className)}
  data-slot="combobox-empty"
/>