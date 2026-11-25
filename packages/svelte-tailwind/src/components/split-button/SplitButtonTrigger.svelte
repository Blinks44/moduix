<script module lang="ts">
  import type { MenuTriggerProps } from '@ark-ui/svelte/menu';
  import type { SplitButtonSize, SplitButtonVariant } from './context';

  export interface SplitButtonTriggerProps extends Omit<MenuTriggerProps, 'asChild'> {
    size?: SplitButtonSize;
    variant?: SplitButtonVariant;
  }
</script>

<script lang="ts">
  import { MenuTrigger } from '@ark-ui/svelte/menu';
  import { useA11yLabels } from '@/lib/moduix/a11yLabels';
  import { cn } from '@/lib/moduix/cn';
  import { UiIcon } from '@/lib/moduix/icons/ui';
  import Button from '../button/Button.svelte';
  import { useSplitButtonContext } from './context';
  import { splitButtonTriggerVariants } from './SplitButton.variants';

  let {
    children,
    class: className,
    ref = $bindable(null),
    size,
    variant,
    ...props
  }: SplitButtonTriggerProps = $props();

  const context = useSplitButtonContext('SplitButtonTrigger');

  const labels = useA11yLabels();
</script>

<MenuTrigger aria-label={children ? undefined : labels().moreActions} {...props} bind:ref>
  {#snippet asChild(triggerProps)}
    <Button
      {...triggerProps({
        class: cn(splitButtonTriggerVariants({ size: size ?? context.size() }), className),
      })}
      size={size ?? context.size()}
      variant={variant ?? context.variant()}
      data-slot="split-button-trigger"
    >
      {#if children}{@render children()}{:else}<UiIcon icon="chevron-down" />{/if}
    </Button>
  {/snippet}
</MenuTrigger>