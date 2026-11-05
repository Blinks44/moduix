<script lang="ts">
  import { AccordionItemContent, type AccordionItemContentProps } from '@ark-ui/svelte/accordion';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: AccordionItemContentProps = $props();

  const itemContentClass =
    'overflow-hidden text-md text-muted-foreground data-[state=closed]:data-[orientation=horizontal]:animate-moduix-accordion-closed-horizontal data-[state=closed]:data-[orientation=vertical]:animate-moduix-accordion-closed data-[state=open]:data-[orientation=horizontal]:animate-moduix-accordion-open-horizontal data-[state=open]:data-[orientation=vertical]:animate-moduix-accordion-open motion-reduce:data-[state]:data-[orientation]:animate-none data-[orientation=horizontal]:[&>*]:w-64';
</script>

<AccordionItemContent
  {...props}
  bind:ref
  class={cn(itemContentClass, className)}
  data-slot="accordion-item-content"
/>