<script lang="ts">
  import { ComboboxItem, type ComboboxItemProps } from '@ark-ui/svelte/combobox';
  import { clsx } from 'clsx';
  import styles from './Combobox.module.css';

  let { class: className, ref = $bindable(null), ...props }: ComboboxItemProps = $props();
</script>

<ComboboxItem {...props} bind:ref class={clsx(styles.item, className)} data-slot="combobox-item" />