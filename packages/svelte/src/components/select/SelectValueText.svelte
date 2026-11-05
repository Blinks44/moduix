<script lang="ts">
  import { SelectValueText, type SelectValueTextProps } from '@ark-ui/svelte/select';
  import { clsx } from 'clsx';
  import styles from './Select.module.css';

  let { class: className, ref = $bindable(null), ...props }: SelectValueTextProps = $props();
</script>

<SelectValueText
  {...props}
  bind:ref
  class={clsx(styles.valueText, className)}
  data-slot="select-value-text"
/>