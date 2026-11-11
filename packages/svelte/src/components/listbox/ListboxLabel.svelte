<script lang="ts">
  import { ListboxLabel, type ListboxLabelProps } from '@ark-ui/svelte/listbox';
  import { clsx } from 'clsx';
  import styles from './Listbox.module.css';

  let { class: className, ref = $bindable(null), ...props }: ListboxLabelProps = $props();
</script>

<ListboxLabel {...props} bind:ref class={clsx(styles.label, className)} data-slot="listbox-label" />