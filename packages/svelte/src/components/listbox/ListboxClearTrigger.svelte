<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface ListboxClearTriggerProps
    extends HTMLProps<'button'>, PolymorphicProps<'button'>, RefAttribute {}
</script>

<script lang="ts">
  import { clsx } from 'clsx';
  import { a11yLabels } from '@/lib/moduix/a11yLabels';
  import CloseButton from '../close-button/CloseButton.svelte';
  import styles from './Listbox.module.css';

  let {
    class: className,
    ref = $bindable(null),
    'aria-label': ariaLabel,
    ...props
  }: ListboxClearTriggerProps = $props();
</script>

<CloseButton
  {...props}
  bind:ref
  aria-label={ariaLabel ?? a11yLabels.clearSearch}
  class={clsx(styles.clearTrigger, className)}
  data-slot="listbox-clear-trigger"
/>