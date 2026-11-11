<script lang="ts">
  import { DateInputRoot, type DateInputRootProps } from '@ark-ui/svelte/date-input';
  import { clsx } from 'clsx';
  import styles from './DateInput.module.css';
  let {
    class: className,
    placeholderValue = $bindable(),
    ref = $bindable(null),
    value = $bindable(),
    ...props
  }: DateInputRootProps = $props();
</script>

<DateInputRoot
  {...props}
  bind:ref
  bind:value
  bind:placeholderValue
  class={clsx(styles.root, className)}
  data-slot="date-input-root"
/>