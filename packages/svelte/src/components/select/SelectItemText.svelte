<script lang="ts">
  import { SelectItemText, type SelectItemTextProps } from '@ark-ui/svelte/select';
  import { clsx } from 'clsx';
  import styles from './Select.module.css';

  let { class: className, ref = $bindable(null), ...props }: SelectItemTextProps = $props();
</script>

<SelectItemText
  {...props}
  bind:ref
  class={clsx(styles.itemText, className)}
  data-slot="select-item-text"
/>