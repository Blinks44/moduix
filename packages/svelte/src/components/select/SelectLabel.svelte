<script lang="ts">
  import { SelectLabel, type SelectLabelProps } from '@ark-ui/svelte/select';
  import { clsx } from 'clsx';
  import styles from './Select.module.css';

  let { class: className, ref = $bindable(null), ...props }: SelectLabelProps = $props();
</script>

<SelectLabel {...props} bind:ref class={clsx(styles.label, className)} data-slot="select-label" />