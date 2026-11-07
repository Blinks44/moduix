<script lang="ts">
  import { ListboxInput, type ListboxInputProps } from '@ark-ui/svelte/listbox';
  import { clsx } from 'clsx';
  import styles from './Listbox.module.css';

  let { class: className, ref = $bindable(null), ...props }: ListboxInputProps = $props();
</script>

<ListboxInput {...props} bind:ref class={clsx(styles.input, className)} data-slot="listbox-input" />