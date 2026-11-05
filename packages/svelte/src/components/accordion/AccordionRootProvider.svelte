<script lang="ts">
  import { AccordionRootProvider, type AccordionRootProviderProps } from '@ark-ui/svelte/accordion';
  import { clsx } from 'clsx';
  import styles from './Accordion.module.css';

  let { class: className, ref = $bindable(null), ...props }: AccordionRootProviderProps = $props();
</script>

<AccordionRootProvider
  {...props}
  bind:ref
  class={clsx(styles.root, className)}
  data-slot="accordion-root-provider"
/>