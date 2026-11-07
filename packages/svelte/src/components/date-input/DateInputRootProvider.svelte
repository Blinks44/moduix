<script lang="ts">
  import {
    DateInputRootProvider,
    type DateInputRootProviderProps,
  } from '@ark-ui/svelte/date-input';
  import { clsx } from 'clsx';
  import styles from './DateInput.module.css';
  let { class: className, ...props }: DateInputRootProviderProps = $props();
</script>

<DateInputRootProvider
  {...props}
  class={clsx(styles.root, className)}
  data-slot="date-input-root-provider"
/>