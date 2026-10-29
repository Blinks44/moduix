import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { defineComponent } from 'vue';
import {
  Accordion,
  AccordionItem,
  AccordionItemBody,
  AccordionItemContent,
  AccordionItemIndicator,
  AccordionItemTrigger,
  AccordionRootProvider,
} from '@/index';

const accordionComponents = {
  Accordion,
  AccordionItem,
  AccordionItemBody,
  AccordionItemContent,
  AccordionItemIndicator,
  AccordionItemTrigger,
  AccordionRootProvider,
};

test('lets consumer Tailwind classes override conflicting defaults', async () => {
  const App = defineComponent({
    components: accordionComponents,
    template: `
      <Accordion :default-value="['first']">
        <AccordionItem value="first">
          <AccordionItemTrigger>First item</AccordionItemTrigger>
          <AccordionItemContent><AccordionItemBody class="p-0">First content</AccordionItemBody></AccordionItemContent>
        </AccordionItem>
      </Accordion>
    `,
  });

  render(App);
  const body = screen.getByText('First content');
  expect([...body!.classList]).toEqual(expect.arrayContaining(['p-0']));
  await expect
    .element(page.getByText('First content', { exact: true }))
    .toHaveCSS('padding', '0px');
});