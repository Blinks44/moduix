<script lang="ts">
  import {
    AccordionItem,
    AccordionItemBody,
    AccordionItemContent,
    AccordionItemIndicator,
    AccordionItemTrigger,
  } from '@/components/accordion';
  import { ChevronDownIcon } from '@/lib/moduix/icons/ui';
  import { faqItems } from './faqItems';

  let {
    customIcon = false,
    disabledValue,
    iconClass,
  }: { customIcon?: boolean; disabledValue?: string; iconClass?: string } = $props();
</script>

{#each faqItems as item (item.value)}
  <AccordionItem disabled={item.value === disabledValue} value={item.value}>
    <AccordionItemTrigger>
      {item.title}
      {#if customIcon}
        <AccordionItemIndicator class={iconClass}><ChevronDownIcon /></AccordionItemIndicator>
      {:else}
        <AccordionItemIndicator />
      {/if}
    </AccordionItemTrigger>
    <AccordionItemContent>
      <AccordionItemBody>{item.description}</AccordionItemBody>
    </AccordionItemContent>
  </AccordionItem>
{/each}