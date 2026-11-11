<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface ListboxClearTriggerProps
    extends HTMLProps<'button'>, PolymorphicProps<'button'>, RefAttribute {}
</script>

<script lang="ts">
  import { a11yLabels } from '@/lib/moduix/a11yLabels';
  import { cn } from '@/lib/moduix/cn';
  import CloseButton from '../close-button/CloseButton.svelte';

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
  class={cn('absolute end-3 top-1/2 size-control-xs -translate-y-1/2', className)}
  data-slot="listbox-clear-trigger"
/>