<script lang="ts">
  import { DateInputLabel, type DateInputLabelProps } from '@ark-ui/svelte/date-input';
  import { clsx } from 'clsx';
  import styles from './DateInput.module.css';
  let { class: className, ref = $bindable(null), ...props }: DateInputLabelProps = $props();
</script>

<DateInputLabel
  {...props}
  bind:ref
  class={clsx(styles.label, className)}
  data-slot="date-input-label"
/>