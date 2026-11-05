<script lang="ts">
  import {
    Accordion,
    AccordionItem,
    AccordionItemBody,
    AccordionItemContent,
    AccordionItemTrigger,
  } from '@/components/accordion';

  let rootRef: Element | null = $state(null);
  let bodyRef: Element | null = $state(null);

  export const getRefs = () => ({ rootRef, bodyRef });
</script>

<Accordion bind:ref={rootRef} defaultValue={['first']}>
  {#snippet asChild(props)}
    <section {...props()} aria-label="Frequently asked questions">
      <AccordionItem value="first">
        <AccordionItemTrigger>First item</AccordionItemTrigger>
        <AccordionItemContent>
          <AccordionItemBody bind:ref={bodyRef}>
            {#snippet asChild(bodyProps)}
              <article {...bodyProps()}>First content</article>
            {/snippet}
          </AccordionItemBody>
        </AccordionItemContent>
      </AccordionItem>
    </section>
  {/snippet}
</Accordion>