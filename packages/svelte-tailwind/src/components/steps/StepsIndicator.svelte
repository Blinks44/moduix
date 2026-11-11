<script lang="ts">
  import {
    StepsIndicator,
    useStepsItemContext,
    type StepsIndicatorProps,
  } from '@ark-ui/svelte/steps';
  import { cn } from '@/lib/moduix/cn';
  import { CheckIcon } from '@/lib/moduix/icons/ui';

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: StepsIndicatorProps = $props();

  const item = useStepsItemContext();
</script>

<StepsIndicator
  {...props}
  bind:ref
  class={cn(
    'inline-flex size-8 flex-none items-center justify-center rounded-full border border-border bg-background text-sm leading-none font-semibold text-muted-foreground transition-[background-color,border-color,color] duration-normal ease-in-out data-complete:border-foreground data-complete:bg-foreground data-complete:text-background data-current:border-foreground data-current:text-foreground [&_svg]:size-3.5 [@media(hover:hover)]:group-hover/steps-trigger:data-incomplete:border-foreground [@media(hover:hover)]:group-hover/steps-trigger:data-incomplete:text-foreground',
    className,
  )}
  data-slot="steps-indicator"
>
  {#if children}
    {@render children()}
  {:else if item().completed}
    <CheckIcon />
  {:else}
    {item().index + 1}
  {/if}
</StepsIndicator>