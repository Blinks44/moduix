<script lang="ts">
  import { AccordionItem, type AccordionItemProps } from '@ark-ui/svelte/accordion';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: AccordionItemProps = $props();

  const itemClass =
    "[overflow-anchor:none] data-[orientation=horizontal]:flex [&[data-orientation='horizontal']:not(:last-child)]:border-e [&[data-orientation='horizontal']:not(:last-child)]:border-border [&[data-orientation='vertical']:not(:last-child)]:border-b [&[data-orientation='vertical']:not(:last-child)]:border-border";
</script>

<AccordionItem {...props} bind:ref class={cn(itemClass, className)} data-slot="accordion-item" />