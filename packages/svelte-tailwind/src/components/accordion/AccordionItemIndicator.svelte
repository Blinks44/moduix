<script lang="ts">
  import {
    AccordionItemIndicator,
    type AccordionItemIndicatorProps,
  } from '@ark-ui/svelte/accordion';
  import { cn } from '@/lib/moduix/cn';
  import { ChevronDownIcon } from '@/lib/moduix/icons/ui';

  let {
    class: className,
    ref = $bindable(null),
    children,
    ...props
  }: AccordionItemIndicatorProps = $props();

  const itemIndicatorClass =
    'inline-flex size-3 shrink-0 items-center justify-center transition-transform duration-normal data-[orientation=vertical]:data-[state=open]:rotate-180 data-[orientation=horizontal]:-rotate-90 data-[orientation=horizontal]:data-[state=open]:rotate-90 [&[data-orientation=horizontal][dir=rtl]]:rotate-90 [&[data-orientation=horizontal][dir=rtl][data-state=open]]:-rotate-90 [&_svg]:size-full';
</script>

<AccordionItemIndicator
  {...props}
  bind:ref
  class={cn(itemIndicatorClass, className)}
  data-slot="accordion-item-indicator"
>
  {#if children}
    {@render children()}
  {:else}
    <ChevronDownIcon />
  {/if}
</AccordionItemIndicator>