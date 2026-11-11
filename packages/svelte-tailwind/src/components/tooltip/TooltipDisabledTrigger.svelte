<script lang="ts">
  import type { HTMLProps, RefAttribute } from '@ark-ui/svelte';
  import { TooltipTrigger } from '@ark-ui/svelte/tooltip';
  import { cn } from '@/lib/moduix/cn';

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
        class: cn(
          'inline-flex cursor-not-allowed [&>:disabled]:pointer-events-none [&>[data-disabled]]:pointer-events-none',
          className,
        ),
      })}
      data-slot="tooltip-disabled-trigger"
    >
      {@render children?.()}
    </span>
  {/snippet}
</TooltipTrigger>