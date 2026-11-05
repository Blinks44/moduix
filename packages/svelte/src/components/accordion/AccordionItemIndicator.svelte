<script lang="ts">
  import {
    AccordionItemIndicator,
    type AccordionItemIndicatorProps,
  } from '@ark-ui/svelte/accordion';
  import { clsx } from 'clsx';
  import { ChevronDownIcon } from '@/lib/moduix/icons/ui';
  import styles from './Accordion.module.css';

  let {
    class: className,
    ref = $bindable(null),
    children,
    ...props
  }: AccordionItemIndicatorProps = $props();
</script>

<AccordionItemIndicator
  {...props}
  bind:ref
  class={clsx(styles.itemIndicator, className)}
  data-slot="accordion-item-indicator"
>
  {#if children}
    {@render children()}
  {:else}
    <ChevronDownIcon />
  {/if}
</AccordionItemIndicator>