<script lang="ts">
  import {
    Collapsible,
    CollapsibleBody,
    CollapsibleContent,
    CollapsibleIndicator,
    CollapsibleTrigger,
  } from '@moduix/svelte/collapsible';
  import styles from '@/components/examples/collapsible/collapsible-partial-collapse.module.css';

  const paragraphs = [
    'Ark UI is a headless component library for building accessible, high-quality UI components for React, Solid, Vue, and Svelte.',
    'Built on top of Zag.js state machines, Ark UI keeps behavior consistent while leaving styling under your control.',
    'Use partial collapse when a short preview should stay visible while the rest of the content is inert.',
  ];
</script>

<Collapsible collapsedHeight="3rem" class={styles.root}>
  <CollapsibleTrigger>
    Read more
    <CollapsibleIndicator />
  </CollapsibleTrigger>
  <CollapsibleContent>
    <CollapsibleBody>
      {#each paragraphs as paragraph (paragraph)}
        <p>{paragraph}</p>
      {/each}
    </CollapsibleBody>
  </CollapsibleContent>
</Collapsible>