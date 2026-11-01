import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import {
  Accordion,
  AccordionItem,
  AccordionItemBody,
  AccordionItemContent,
  AccordionItemTrigger,
} from '@/index';

test('lets consumer Tailwind classes override conflicting defaults', async () => {
  render(() => (
    <Accordion defaultValue={['first']}>
      <AccordionItem value="first">
        <AccordionItemTrigger>First item</AccordionItemTrigger>
        <AccordionItemContent>
          <AccordionItemBody class="p-0">First content</AccordionItemBody>
        </AccordionItemContent>
      </AccordionItem>
    </Accordion>
  ));

  const body = screen.getByText('First content');
  expect([...body!.classList]).toEqual(expect.arrayContaining(['p-0']));
  await expect
    .element(page.getByText('First content', { exact: true }))
    .toHaveCSS('padding', '0px');
});