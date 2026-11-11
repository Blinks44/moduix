<script lang="ts">
  import { SelectControl, type SelectControlProps } from '@ark-ui/svelte/select';
  import { clsx } from 'clsx';
  import styles from './Select.module.css';

  let { class: className, ref = $bindable(null), ...props }: SelectControlProps = $props();
</script>

<SelectControl
  {...props}
  bind:ref
  class={clsx(styles.control, className)}
  data-slot="select-control"
/>