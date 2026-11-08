<script module lang="ts">
  import type { ButtonRootProps } from '../button/Button.svelte';
  import type { SplitButtonSize, SplitButtonVariant } from './context';

  export interface SplitButtonActionProps extends Omit<ButtonRootProps, 'size' | 'variant'> {
    size?: SplitButtonSize;
    variant?: SplitButtonVariant;
  }
</script>

<script lang="ts">
  import { cn } from '@/lib/moduix/cn';
  import Button from '../button/Button.svelte';
  import { useSplitButtonContext } from './context';

  let {
    class: className,
    ref = $bindable(null),
    size,
    variant,
    ...props
  }: SplitButtonActionProps = $props();

  const context = useSplitButtonContext('SplitButtonAction');
</script>

<Button
  {...props}
  bind:ref
  size={size ?? context.size()}
  variant={variant ?? context.variant()}
  class={cn('rounded-e-none', className)}
  data-slot="split-button-action"
/>