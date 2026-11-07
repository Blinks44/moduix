<script lang="ts">
  import { ComboboxList, type ComboboxListProps } from '@ark-ui/svelte/combobox';
  import { clsx } from 'clsx';
  import styles from './Combobox.module.css';

  let { class: className, ref = $bindable(null), ...props }: ComboboxListProps = $props();
</script>

<ComboboxList {...props} bind:ref class={clsx(styles.list, className)} data-slot="combobox-list" />