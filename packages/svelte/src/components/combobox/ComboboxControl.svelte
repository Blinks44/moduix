<script lang="ts">
  import { ComboboxControl, type ComboboxControlProps } from '@ark-ui/svelte/combobox';
  import { clsx } from 'clsx';
  import styles from './Combobox.module.css';

  let { class: className, ref = $bindable(null), ...props }: ComboboxControlProps = $props();
</script>

<ComboboxControl
  {...props}
  bind:ref
  class={clsx(styles.control, className)}
  data-slot="combobox-control"
/>