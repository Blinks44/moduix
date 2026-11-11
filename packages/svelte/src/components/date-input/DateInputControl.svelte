<script lang="ts">
  import { DateInputControl, type DateInputControlProps } from '@ark-ui/svelte/date-input';
  import { clsx } from 'clsx';
  import styles from './DateInput.module.css';
  let { class: className, ref = $bindable(null), ...props }: DateInputControlProps = $props();
</script>

<DateInputControl
  {...props}
  bind:ref
  class={clsx(styles.control, className)}
  data-slot="date-input-control"
/>