<script lang="ts">
  import { ChevronDown as ChevronDownIcon } from '@lucide/svelte';
  import {
    Accordion,
    AccordionItem,
    AccordionItemContent,
    AccordionItemIndicator,
    AccordionItemTrigger,
  } from '@moduix/svelte/accordion';
  import styles from '@/components/examples/accordion/accordion-build-from-parts.module.css';

  const items = [
    {
      value: 'what-is-ark-ui',
      title: 'What is Ark UI?',
      description: 'Ark UI is a headless component library for building accessible web interfaces.',
    },
    {
      value: 'getting-started',
      title: 'How do I get started?',
      description:
        'Install the package, import Accordion parts, and style the composition to match your product.',
    },
    {
      value: 'can-i-use-it',
      title: 'Can I use it for my project?',
      description: 'Yes. Ark UI is open source and designed for production design systems.',
    },
  ];
</script>

<Accordion class={styles.root} defaultValue={['what-is-ark-ui']}>
  {#each items as item (item.value)}
    <AccordionItem value={item.value}>
      <h3>
        <AccordionItemTrigger>
          {item.title}
          <AccordionItemIndicator>
            <ChevronDownIcon strokeWidth={3} />
          </AccordionItemIndicator>
        </AccordionItemTrigger>
      </h3>
      <AccordionItemContent>
        <div class={styles.body}>{item.description}</div>
      </AccordionItemContent>
    </AccordionItem>
  {/each}
</Accordion>