<script module lang="ts">
  import type { ToastCloseTriggerProps as ArkToastCloseTriggerProps } from '@ark-ui/svelte/toast';

  export interface ToastCloseTriggerProps extends ArkToastCloseTriggerProps {}
</script>

<script lang="ts">
  import { ToastCloseTrigger } from '@ark-ui/svelte/toast';
  import { a11yLabels } from '@/lib/moduix/a11yLabels';
  import { cn } from '@/lib/moduix/cn';
  import CloseButton from '../close-button/CloseButton.svelte';

  let {
    asChild,
    children,
    class: className,
    ref = $bindable(null),
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    ...props
  }: ToastCloseTriggerProps = $props();

  const resolvedAriaLabel = $derived(
    ariaLabel === undefined && ariaLabelledby == null ? a11yLabels.closeToast : ariaLabel,
  );
</script>

{#if asChild}
  <ToastCloseTrigger
    {...props}
    bind:ref
    {asChild}
    aria-label={resolvedAriaLabel}
    aria-labelledby={ariaLabelledby}
    class={className}
    data-slot="toast-close-trigger"
  />
{:else}
  <ToastCloseTrigger {...props} bind:ref>
    {#snippet asChild(triggerProps)}
      <CloseButton
        {...triggerProps({
          class: cn(
            'absolute end-2 top-2 [@media(hover:hover)]:[&:not([data-disabled]):hover]:bg-[color:var(--_toast-hover,var(--color-muted))]',
            className,
          ),
        })}
        {children}
        aria-label={resolvedAriaLabel}
        aria-labelledby={ariaLabelledby}
        data-slot="toast-close-trigger"
      />
    {/snippet}
  </ToastCloseTrigger>
{/if}