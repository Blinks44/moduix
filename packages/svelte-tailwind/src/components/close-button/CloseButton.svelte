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
  import { a11yLabels } from '@/lib/moduix/a11yLabels';
  import { cn } from '@/lib/moduix/cn';
  import { CloseIcon } from '@/lib/moduix/icons/ui';

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
  class={cn(
    "m-0 inline-flex size-7 shrink-0 cursor-pointer appearance-none items-center justify-center rounded-sm border-0 bg-transparent p-0 text-muted-foreground transition-[background-color,color,opacity] duration-normal ease-in-out select-none focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-ring data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:opacity-disabled [&>svg]:shrink-0 [&>svg:not([class*='size-'])]:size-4 [@media(hover:hover)]:[&:not([data-disabled]):hover]:bg-muted [@media(hover:hover)]:[&:not([data-disabled]):hover]:text-foreground",
    className,
  )}
>
  {#if children}
    {@render children()}
  {:else}
    <CloseIcon />
  {/if}
</Ark>