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
  import { clsx } from 'clsx';
  import { a11yLabels } from '@/lib/moduix/a11yLabels';
  import { ChevronDownIcon } from '@/lib/moduix/icons/ui';
  import Button from '../button/Button.svelte';
  import { useSplitButtonContext } from './context';
  import styles from './SplitButton.module.css';

  let {
    children,
    class: className,
    ref = $bindable(null),
    size,
    variant,
    ...props
  }: SplitButtonTriggerProps = $props();

  const context = useSplitButtonContext('SplitButtonTrigger');
</script>

<MenuTrigger aria-label={children ? undefined : a11yLabels.moreActions} {...props} bind:ref>
  {#snippet asChild(triggerProps)}
    <Button
      {...triggerProps({ class: clsx(styles.trigger, className) })}
      size={size ?? context.size()}
      variant={variant ?? context.variant()}
      data-slot="split-button-trigger"
    >
      {#if children}{@render children()}{:else}<ChevronDownIcon />{/if}
    </Button>
  {/snippet}
</MenuTrigger>