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
  import { useA11yLabels } from '@/lib/moduix/a11yLabels';
  import { UiIcon } from '@/lib/moduix/icons/ui';
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

  const labels = useA11yLabels();
</script>

<MenuTrigger aria-label={children ? undefined : labels().moreActions} {...props} bind:ref>
  {#snippet asChild(triggerProps)}
    <Button
      {...triggerProps({ class: clsx(styles.trigger, className) })}
      size={size ?? context.size()}
      variant={variant ?? context.variant()}
      data-slot="split-button-trigger"
    >
      {#if children}{@render children()}{:else}<UiIcon icon="chevron-down" />{/if}
    </Button>
  {/snippet}
</MenuTrigger>