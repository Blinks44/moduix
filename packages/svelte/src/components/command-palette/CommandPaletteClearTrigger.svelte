<script lang="ts">
  import {
    ComboboxClearTrigger,
    useComboboxContext,
    type ComboboxClearTriggerProps,
  } from '@ark-ui/svelte/combobox';
  import { clsx } from 'clsx';
  import { a11yLabels } from '@/lib/moduix/a11yLabels';
  import { CloseIcon } from '@/lib/moduix/icons/ui';
  import closeButtonStyles from '../close-button/CloseButton.module.css';
  import styles from './CommandPalette.module.css';

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
  class={clsx(closeButtonStyles.root, styles.clearTrigger, className)}
  hidden={combobox().inputValue === ''}
  onclickcapture={handleClickCapture}
  data-slot="command-palette-clear-trigger"
>
  {#if children}{@render children()}{:else if !asChild}<CloseIcon />{/if}
</ComboboxClearTrigger>