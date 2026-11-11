<script lang="ts">
  import { a11yLabels } from '@/lib/moduix/a11yLabels';
  import { cn } from '@/lib/moduix/cn';
  import CloseButton, { type CloseButtonProps } from '../close-button/CloseButton.svelte';

  let {
    children,
    class: className,
    ref = $bindable(null),
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    ...props
  }: CloseButtonProps = $props();
</script>

<CloseButton
  {...props}
  bind:ref
  aria-label={ariaLabel ?? (ariaLabelledBy == null ? a11yLabels.closeTag : undefined)}
  aria-labelledby={ariaLabelledBy}
  data-scope="tag"
  data-part="close-trigger"
  data-slot="tag-close-trigger"
  class={cn(
    `size-4 rounded-full text-inherit focus-visible:outline-focus-inset focus-visible:outline-offset-0 [&>svg:not([class*='size-'])]:size-3 [@media(hover:hover)]:[&:not([data-disabled]):hover]:bg-current/12 [@media(hover:hover)]:[&:not([data-disabled]):hover]:text-inherit`,
    className,
  )}
  {children}
/>