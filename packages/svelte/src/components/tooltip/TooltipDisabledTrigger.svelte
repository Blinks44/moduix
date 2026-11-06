<script lang="ts">
  import type { HTMLProps, RefAttribute } from '@ark-ui/svelte';
  import { TooltipTrigger } from '@ark-ui/svelte/tooltip';
  import { clsx } from 'clsx';
  import styles from './Tooltip.module.css';

  type Props = HTMLProps<'span'> & RefAttribute;

  let {
    children,
    class: className,
    ref = $bindable(null),
    tabindex = 0,
    ...props
  }: Props = $props();
</script>

<TooltipTrigger bind:ref>
  {#snippet asChild(triggerProps)}
    <span
      {...triggerProps({
        ...props,
        tabindex,
        class: clsx(styles.disabledTrigger, className),
      })}
      data-slot="tooltip-disabled-trigger"
    >
      {@render children?.()}
    </span>
  {/snippet}
</TooltipTrigger>