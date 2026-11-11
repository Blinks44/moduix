<script lang="ts">
  import { SelectItemGroupLabel, type SelectItemGroupLabelProps } from '@ark-ui/svelte/select';
  import { clsx } from 'clsx';
  import styles from './Select.module.css';

  let { class: className, ref = $bindable(null), ...props }: SelectItemGroupLabelProps = $props();
</script>

<SelectItemGroupLabel
  {...props}
  bind:ref
  class={clsx(styles.itemGroupLabel, className)}
  data-slot="select-item-group-label"
/>