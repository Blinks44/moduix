<script lang="ts">
  import { ListboxValueText, type ListboxValueTextProps } from '@ark-ui/svelte/listbox';
  import { clsx } from 'clsx';
  import styles from './Listbox.module.css';

  let { class: className, ...props }: ListboxValueTextProps = $props();
</script>

<ListboxValueText
  {...props}
  class={clsx(styles.valueText, className)}
  data-slot="listbox-value-text"
/>