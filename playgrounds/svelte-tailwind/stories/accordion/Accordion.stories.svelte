<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import {
    Accordion,
    AccordionContext,
    AccordionItem,
    AccordionItemBody,
    AccordionItemContent,
    AccordionItemContext,
    AccordionItemIndicator,
    AccordionItemTrigger,
    AccordionRootProvider,
    useAccordion,
  } from '@/components/accordion';
  import FaqAccordionItems from './FaqAccordionItems.svelte';
  import { faqItems } from './faqItems';
  import NestedSlider from './NestedSlider.svelte';

  const demoRootClass = 'w-full max-w-88';
  const stateClass = 'mt-3 text-sm text-muted-foreground';
  const customIconClass = 'data-[state=open]:rotate-180';

  const { Story } = defineMeta({
    title: 'Components/Accordion',
    component: Accordion,
    parameters: { layout: 'centered' },
  });
</script>

<script lang="ts">
  let controlledValue = $state(['getting-started']);
  const accordion = useAccordion({ defaultValue: ['what-is-ark-ui'] });
</script>

<Story name="Basic" asChild>
  <Accordion defaultValue={['what-is-ark-ui']} class={demoRootClass}>
    <FaqAccordionItems />
  </Accordion>
</Story>

<Story name="Collapsible" asChild>
  <Accordion defaultValue={['what-is-ark-ui']} collapsible class={demoRootClass}>
    <FaqAccordionItems />
  </Accordion>
</Story>

<Story name="Context State" asChild>
  <Accordion defaultValue={['what-is-ark-ui']} class={demoRootClass}>
    <AccordionContext>
      {#snippet render(context)}
        <output class={stateClass}>Open sections: {context().value.join(', ')}</output>
      {/snippet}
    </AccordionContext>
    {#each faqItems as item (item.value)}
      <AccordionItem value={item.value}>
        <AccordionItemTrigger>
          {item.title}
          <AccordionItemContext>
            {#snippet render(context)}
              <span>{context().expanded ? 'Open' : 'Closed'}</span>
            {/snippet}
          </AccordionItemContext>
        </AccordionItemTrigger>
        <AccordionItemContent>
          <AccordionItemBody>{item.description}</AccordionItemBody>
        </AccordionItemContent>
      </AccordionItem>
    {/each}
  </Accordion>
</Story>

<Story name="Controlled" asChild>
  <Accordion bind:value={controlledValue} class={demoRootClass}>
    <FaqAccordionItems />
  </Accordion>
</Story>

<Story name="Disabled Item" asChild>
  <Accordion defaultValue={['what-is-ark-ui']} class={demoRootClass}>
    <FaqAccordionItems disabledValue="getting-started" />
  </Accordion>
</Story>

<Story name="Horizontal" asChild>
  <Accordion orientation="horizontal" defaultValue={['what-is-ark-ui']} class={demoRootClass}>
    <FaqAccordionItems />
  </Accordion>
</Story>

<Story name="Lazy Mount" asChild>
  <Accordion lazyMount unmountOnExit class={demoRootClass}>
    <FaqAccordionItems />
  </Accordion>
</Story>

<Story name="Multiple" asChild>
  <Accordion multiple defaultValue={['what-is-ark-ui', 'can-i-use-it']} class={demoRootClass}>
    <FaqAccordionItems />
  </Accordion>
</Story>

<Story name="Root Provider" asChild>
  <div class={stateClass}>Open sections: {accordion().value.join(', ')}</div>
  <AccordionRootProvider value={accordion} class={demoRootClass}>
    <FaqAccordionItems />
  </AccordionRootProvider>
</Story>

<Story name="Advanced Customization" asChild>
  <Accordion defaultValue={['what-is-ark-ui']} class={demoRootClass}>
    {#each faqItems as item (item.value)}
      <AccordionItem value={item.value}>
        <AccordionItemTrigger>{item.title}<AccordionItemIndicator /></AccordionItemTrigger>
        <AccordionItemContent>
          <AccordionItemBody>
            <span>{item.description}</span>
            <NestedSlider label={`${item.title} priority`} />
          </AccordionItemBody>
        </AccordionItemContent>
      </AccordionItem>
    {/each}
  </Accordion>
</Story>

<Story name="Content Stress" asChild>
  <Accordion defaultValue={['long-content']} class={demoRootClass}>
    <AccordionItem value="long-content">
      <AccordionItemTrigger>
        How does Accordion behave when a heading wraps across several lines in a narrow container?
        <AccordionItemIndicator />
      </AccordionItemTrigger>
      <AccordionItemContent>
        <AccordionItemBody>
          Long headings wrap without displacing the indicator, and multiline panel content keeps its
          spacing while the container narrows.
        </AccordionItemBody>
      </AccordionItemContent>
    </AccordionItem>
  </Accordion>
</Story>

<Story name="Custom Styling" asChild>
  <Accordion defaultValue={['what-is-ark-ui']} class={demoRootClass}>
    <FaqAccordionItems customIcon iconClass={customIconClass} />
  </Accordion>
</Story>