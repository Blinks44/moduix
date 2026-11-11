<script lang="ts">
  import { AccordionItem, type AccordionItemProps } from '@ark-ui/svelte/accordion';
  import { clsx } from 'clsx';
  import styles from './Accordion.module.css';

  let { class: className, ref = $bindable(null), ...props }: AccordionItemProps = $props();
</script>

<AccordionItem
  {...props}
  bind:ref
  class={clsx(styles.item, className)}
  data-slot="accordion-item"
/>