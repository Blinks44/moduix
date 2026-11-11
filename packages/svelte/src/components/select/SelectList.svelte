<script lang="ts">
  import { SelectList, type SelectListProps } from '@ark-ui/svelte/select';
  import { clsx } from 'clsx';
  import styles from './Select.module.css';

  let { class: className, ref = $bindable(null), ...props }: SelectListProps = $props();
</script>

<SelectList {...props} bind:ref class={clsx(styles.list, className)} data-slot="select-list" />