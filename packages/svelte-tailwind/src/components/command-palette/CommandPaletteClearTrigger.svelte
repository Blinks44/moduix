<script lang="ts">
  import {
    ComboboxClearTrigger,
    useComboboxContext,
    type ComboboxClearTriggerProps,
  } from '@ark-ui/svelte/combobox';
  import { a11yLabels } from '@/lib/moduix/a11yLabels';
  import { cn } from '@/lib/moduix/cn';
  import { CloseIcon } from '@/lib/moduix/icons/ui';

  let {
    asChild,
    children,
    class: className,
    onclickcapture,
    ref = $bindable(null),
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    ...props
  }: ComboboxClearTriggerProps = $props();

  const combobox = useComboboxContext();

  // Clear only the query; Ark's own handler would also clear the selected value. The capture
  // phase runs before Ark's click handler, which skips events that are already default-prevented.
  const handleClickCapture: ComboboxClearTriggerProps['onclickcapture'] = (event) => {
    onclickcapture?.(event);
    if (!event.defaultPrevented) {
      event.preventDefault();
      combobox().setInputValue('');
    }
  };
</script>

<ComboboxClearTrigger
  {...props}
  bind:ref
  {asChild}
  aria-label={ariaLabel ??
    (!asChild && ariaLabelledby == null ? a11yLabels.clearSearch : undefined)}
  aria-labelledby={ariaLabelledby}
  class={cn(
    `m-0 inline-flex size-control-xs shrink-0 cursor-pointer appearance-none items-center justify-center rounded-sm border-0 bg-transparent p-0 text-muted-foreground transition-[background-color,color,opacity] duration-normal ease-in-out select-none focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-ring data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:opacity-disabled [&>svg]:shrink-0 [&>svg:not([class*='size-'])]:size-4 [@media(hover:hover)]:[&:not([data-disabled]):hover]:bg-muted [@media(hover:hover)]:[&:not([data-disabled]):hover]:text-foreground`,
    className,
  )}
  hidden={combobox().inputValue === ''}
  onclickcapture={handleClickCapture}
  data-slot="command-palette-clear-trigger"
>
  {#if children}{@render children()}{:else if !asChild}<CloseIcon />{/if}
</ComboboxClearTrigger>