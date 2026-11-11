<script lang="ts">
  import { AccordionItemContent, type AccordionItemContentProps } from '@ark-ui/svelte/accordion';
  import { clsx } from 'clsx';
  import styles from './Accordion.module.css';

  let { class: className, ref = $bindable(null), ...props }: AccordionItemContentProps = $props();
</script>

<AccordionItemContent
  {...props}
  bind:ref
  class={clsx(styles.itemContent, className)}
  data-slot="accordion-item-content"
/>