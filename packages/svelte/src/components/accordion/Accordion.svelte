<script lang="ts">
  import { AccordionRoot, type AccordionRootProps } from '@ark-ui/svelte/accordion';
  import { clsx } from 'clsx';
  import styles from './Accordion.module.css';

  let {
    class: className,
    ref = $bindable(null),
    value = $bindable(),
    ...props
  }: AccordionRootProps = $props();
</script>

<AccordionRoot
  {...props}
  bind:ref
  bind:value
  class={clsx(styles.root, className)}
  data-slot="accordion-root"
/>