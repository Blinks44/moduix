<script module lang="ts">
  import type { CloseButtonProps } from '../close-button/CloseButton.svelte';
  import type { InputGroupSize } from './context';

  export interface InputGroupClearTriggerProps extends CloseButtonProps {
    size?: InputGroupSize;
  }
</script>

<script lang="ts">
  import { a11yLabels } from '@/lib/moduix/a11yLabels';
  import { cn } from '@/lib/moduix/cn';
  import { CloseIcon } from '@/lib/moduix/icons/ui';
  import CloseButton from '../close-button/CloseButton.svelte';
  import { useInputGroupSize } from './context';
  import { inputGroupClearTriggerClass } from './variants';

  let {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    children,
    class: className,
    ref = $bindable(null),
    size,
    type = 'button',
    ...props
  }: InputGroupClearTriggerProps = $props();

  const groupSize = useInputGroupSize();
  const buttonSize = $derived(size ?? groupSize());
</script>

<CloseButton
  {...props}
  bind:ref
  class={cn(inputGroupClearTriggerClass, className)}
  data-size={buttonSize}
  {type}
  aria-label={ariaLabel ?? (ariaLabelledby == null ? a11yLabels.clearInput : undefined)}
  aria-labelledby={ariaLabelledby}
  data-scope="input-group"
  data-part="clear-trigger"
  data-slot="input-group-clear-trigger"
>
  {#if children}{@render children()}{:else}<CloseIcon class="size-4 shrink-0" />{/if}
</CloseButton>