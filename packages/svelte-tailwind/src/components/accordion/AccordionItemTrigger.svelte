<script lang="ts">
  import { AccordionItemTrigger, type AccordionItemTriggerProps } from '@ark-ui/svelte/accordion';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: AccordionItemTriggerProps = $props();

  const itemTriggerClass =
    'flex w-full cursor-pointer items-center justify-between gap-4 bg-transparent px-3 py-2 text-start text-md outline-0 transition-colors duration-normal select-none focus-visible:relative focus-visible:z-1 focus-visible:outline-focus focus-visible:outline-offset-focus-inset focus-visible:outline-ring disabled:cursor-default disabled:opacity-disabled data-[orientation=horizontal]:h-full data-[orientation=horizontal]:w-10 data-[orientation=horizontal]:justify-center data-[orientation=horizontal]:[writing-mode:sideways-lr] [&:not(:disabled):active]:bg-muted [@media(hover:hover)]:[&:not(:disabled):hover]:bg-muted';
</script>

<AccordionItemTrigger
  {...props}
  bind:ref
  class={cn(itemTriggerClass, className)}
  data-slot="accordion-item-trigger"
/>