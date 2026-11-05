<script lang="ts">
  import type { AccordionRootProps } from '@/components/accordion';
  import {
    Accordion,
    AccordionItem,
    AccordionItemBody,
    AccordionItemContent,
    AccordionItemTrigger,
  } from '@/components/accordion';

  let {
    disabled = false,
    value = $bindable(),
    ...props
  }: Omit<AccordionRootProps, 'disabled'> & { disabled?: boolean } = $props();

  const items = [
    { value: 'first', label: 'First item', content: 'First content' },
    { value: 'second', label: 'Second item', content: 'Second content' },
  ];
</script>

<Accordion {...props} bind:value defaultValue={value === undefined ? ['first'] : undefined}>
  {#each items as item (item.value)}
    <AccordionItem disabled={disabled && item.value === 'second'} value={item.value}>
      <AccordionItemTrigger>{item.label}</AccordionItemTrigger>
      <AccordionItemContent>
        <AccordionItemBody>{item.content}</AccordionItemBody>
      </AccordionItemContent>
    </AccordionItem>
  {/each}
</Accordion>