<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface CloseButtonProps
    extends HTMLProps<'button'>, PolymorphicProps<'button'>, RefAttribute {
    'data-disabled'?: string;
    'data-part'?: string;
    'data-scope'?: string;
    'data-slot'?: string;
  }
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { clsx } from 'clsx';
  import { a11yLabels } from '@/lib/moduix/a11yLabels';
  import { CloseIcon } from '@/lib/moduix/icons/ui';
  import styles from './CloseButton.module.css';

  let {
    asChild,
    children,
    class: className,
    disabled,
    onclickcapture,
    ref = $bindable(null),
    type,
    'aria-disabled': ariaDisabled,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'data-disabled': dataDisabled,
    'data-part': dataPart = 'root',
    'data-scope': dataScope = 'close-button',
    'data-slot': dataSlot = 'close-button-root',
    ...props
  }: CloseButtonProps = $props();

  // A parent Ark part that composes CloseButton through asChild passes its own data-disabled.
  const isDisabled = $derived(
    !!disabled || ariaDisabled === true || ariaDisabled === 'true' || dataDisabled !== undefined,
  );

  // Stopping capture also skips every bubble onclick, including the composed child.
  const handleClickCapture: CloseButtonProps['onclickcapture'] = (event) => {
    if (isDisabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    onclickcapture?.(event);
  };
</script>

<Ark
  as="button"
  {...props}
  bind:ref
  {asChild}
  type={asChild ? type : (type ?? 'button')}
  disabled={asChild ? undefined : disabled}
  aria-disabled={asChild && disabled ? true : ariaDisabled}
  aria-label={ariaLabel ?? (ariaLabelledBy == null ? a11yLabels.close : undefined)}
  aria-labelledby={ariaLabelledBy}
  onclickcapture={handleClickCapture}
  data-scope={dataScope}
  data-part={dataPart}
  data-slot={dataSlot}
  data-disabled={isDisabled ? (dataDisabled ?? '') : undefined}
  class={clsx(styles.root, className)}
>
  {#if children}
    {@render children()}
  {:else}
    <CloseIcon />
  {/if}
</Ark>