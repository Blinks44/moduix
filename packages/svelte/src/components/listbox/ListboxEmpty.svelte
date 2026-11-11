<script lang="ts">
  import { ListboxEmpty, type ListboxEmptyProps } from '@ark-ui/svelte/listbox';
  import { clsx } from 'clsx';
  import styles from './Listbox.module.css';

  let { class: className, ref = $bindable(null), ...props }: ListboxEmptyProps = $props();
</script>

<ListboxEmpty {...props} bind:ref class={clsx(styles.empty, className)} data-slot="listbox-empty" />