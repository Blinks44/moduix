<script lang="ts">
  import { AccordionItemTrigger, type AccordionItemTriggerProps } from '@ark-ui/svelte/accordion';
  import { clsx } from 'clsx';
  import styles from './Accordion.module.css';

  let { class: className, ref = $bindable(null), ...props }: AccordionItemTriggerProps = $props();
</script>

<AccordionItemTrigger
  {...props}
  bind:ref
  class={clsx(styles.itemTrigger, className)}
  data-slot="accordion-item-trigger"
/>