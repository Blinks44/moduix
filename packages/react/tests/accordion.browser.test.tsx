import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef, useState } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemBody,
  AccordionItemContent,
  AccordionItemIndicator,
  AccordionItemTrigger,
  AccordionRootProvider,
  useAccordion,
  useAccordionContext,
  useAccordionItemContext,
} from '../src';

const items = [
  { value: 'first', label: 'First item', content: 'First content' },
  { value: 'second', label: 'Second item', content: 'Second content' },
];

function TestAccordion({
  collapsible = false,
  disabled = false,
  lazyMount = false,
  onValueChange,
  orientation = 'vertical',
  value,
}: {
  collapsible?: boolean;
  disabled?: boolean;
  lazyMount?: boolean;
  onValueChange?: (details: { value: string[] }) => void;
  orientation?: 'horizontal' | 'vertical';
  value?: string[];
}) {
  return (
    <Accordion
      collapsible={collapsible}
      defaultValue={value === undefined ? ['first'] : undefined}
      lazyMount={lazyMount}
      onValueChange={onValueChange}
      orientation={orientation}
      value={value}
    >
      {items.map((item) => (
        <AccordionItem
          key={item.value}
          disabled={disabled && item.value === 'second'}
          value={item.value}
        >
          <AccordionItemTrigger>{item.label}</AccordionItemTrigger>
          <AccordionItemContent>
            <AccordionItemBody>{item.content}</AccordionItemBody>
          </AccordionItemContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

function AccordionRootState() {
  const accordion = useAccordionContext();

  return (
    <button type="button" onClick={() => accordion.setValue(['second'])}>
      Open second from context
    </button>
  );
}

function AccordionItemState() {
  const item = useAccordionItemContext();

  return <span>First item is {item.expanded ? 'open' : 'closed'}</span>;
}

function ProviderAccordion() {
  const accordion = useAccordion({ defaultValue: ['first'] });

  return (
    <AccordionRootProvider value={accordion}>
      <AccordionRootState />
      <AccordionItem value="first">
        <AccordionItemTrigger>
          First item
          <AccordionItemState />
        </AccordionItemTrigger>
        <AccordionItemContent>
          <AccordionItemBody>First content</AccordionItemBody>
        </AccordionItemContent>
      </AccordionItem>
      <AccordionItem value="second">
        <AccordionItemTrigger>Second item</AccordionItemTrigger>
        <AccordionItemContent>
          <AccordionItemBody>Second content</AccordionItemBody>
        </AccordionItemContent>
      </AccordionItem>
    </AccordionRootProvider>
  );
}

test('preserves Ark semantics, refs, anatomy, and moduix styling hooks', async () => {
  const rootRef = createRef<HTMLDivElement>();
  const triggerRef = createRef<HTMLButtonElement>();
  const bodyRef = createRef<HTMLDivElement>();

  render(
    <Accordion ref={rootRef} defaultValue={['first']}>
      <AccordionItem value="first">
        <AccordionItemTrigger ref={triggerRef}>
          First item
          <AccordionItemIndicator />
        </AccordionItemTrigger>
        <AccordionItemContent>
          <AccordionItemBody ref={bodyRef}>First content</AccordionItemBody>
        </AccordionItemContent>
      </AccordionItem>
    </Accordion>,
  );

  const trigger = screen.getByRole('button', { name: 'First item' });
  const body = screen.getByText('First content');
  const content = body.parentElement;

  expect(rootRef.current!.getAttribute('data-slot')).toBe('accordion-root');
  expect(rootRef.current!.getAttribute('data-scope')).toBe('accordion');
  expect(triggerRef.current).toBe(trigger);
  const triggerLocator = page.getByRole('button', { name: 'First item', exact: true });
  await expect.element(triggerLocator).toHaveAttribute('type', 'button');
  await expect.element(triggerLocator).toHaveAttribute('data-slot', 'accordion-item-trigger');
  await expect.element(triggerLocator).toHaveAttribute('aria-expanded', 'true');
  await expect.element(triggerLocator).toHaveAttribute('aria-controls', content?.id);
  expect(
    Boolean(trigger.querySelector('[data-slot="accordion-item-indicator"] svg')?.isConnected),
  ).toBe(true);
  expect(content!.getAttribute('data-slot')).toBe('accordion-item-content');
  expect(content!.getAttribute('aria-labelledby')).toBe(trigger.id);
  expect(bodyRef.current).toBe(body);
  await expect.element(page.getByText('First content')).toHaveAttribute('data-part', 'item-body');
  await expect
    .element(page.getByText('First content'))
    .toHaveAttribute('data-slot', 'accordion-item-body');
});

test('moves focus between vertical triggers with arrow keys', async () => {
  render(<TestAccordion />);

  const firstTriggerLocator = page.getByRole('button', { name: 'First item', exact: true });
  await firstTriggerLocator.click();
  await firstTriggerLocator.press('ArrowDown');
  const secondTriggerLocator = page.getByRole('button', { name: 'Second item', exact: true });
  await expect.element(secondTriggerLocator).toBeFocused();

  await secondTriggerLocator.press('ArrowUp');
  await expect.element(firstTriggerLocator).toBeFocused();

  await firstTriggerLocator.press('End');
  await expect.element(secondTriggerLocator).toBeFocused();

  await secondTriggerLocator.press('Home');
  await expect.element(firstTriggerLocator).toBeFocused();
});

test('keeps Ark value change details and ignores disabled items', async () => {
  const values: string[][] = [];
  render(<TestAccordion disabled onValueChange={(details) => values.push(details.value)} />);

  await expect
    .element(page.getByRole('button', { name: 'Second item', exact: true }))
    .toBeDisabled();

  expect(values).toEqual([]);
});

test('reports the next value when an item opens', async () => {
  function ControlledAccordion() {
    const [value, setValue] = useState(['first']);

    return (
      <>
        <TestAccordion value={value} onValueChange={(details) => setValue(details.value)} />
        <output>Open items: {value.join(', ')}</output>
      </>
    );
  }

  render(<ControlledAccordion />);

  await page.getByRole('button', { name: 'Second item', exact: true }).click();
  await expect.element(page.getByText('Open items: second')).toBeAttached();
});

test('mounts lazy content only after its item opens', async () => {
  render(<TestAccordion lazyMount />);

  await expect.element(page.getByText('Second content')).toHaveCount(0);

  await page.getByRole('button', { name: 'Second item', exact: true }).click();
  await expect.element(page.getByText('Second content')).toBeVisible();
});

test('uses horizontal keyboard navigation', async () => {
  render(<TestAccordion orientation="horizontal" />);

  await page.getByRole('button', { name: 'First item', exact: true }).click();
  await page.getByRole('button', { name: 'First item', exact: true }).press('ArrowRight');
  await expect
    .element(page.getByRole('button', { name: 'Second item', exact: true }))
    .toBeFocused();
});

test('allows the active item to close when collapsible', async () => {
  render(<TestAccordion collapsible />);

  const firstTriggerLocator = page.getByRole('button', { name: 'First item', exact: true });
  await expect.element(firstTriggerLocator).toHaveAttribute('aria-expanded', 'true');

  await firstTriggerLocator.click();
  await expect.element(firstTriggerLocator).toHaveAttribute('aria-expanded', 'false');
});

test('preserves semantic hosts with asChild', async () => {
  render(
    <Accordion asChild defaultValue={['first']}>
      <section aria-label="Frequently asked questions">
        <AccordionItem value="first">
          <AccordionItemTrigger>First item</AccordionItemTrigger>
          <AccordionItemContent>
            <AccordionItemBody asChild>
              <article>First content</article>
            </AccordionItemBody>
          </AccordionItemContent>
        </AccordionItem>
      </section>
    </Accordion>,
  );

  const root = screen.getByRole('region', { name: 'Frequently asked questions' });

  expect(root.tagName).toBe('SECTION');
  await expect
    .element(page.getByRole('region', { name: 'Frequently asked questions', exact: true }))
    .toHaveAttribute('data-slot', 'accordion-root');
  await expect
    .element(page.getByRole('article'))
    .toHaveAttribute('data-slot', 'accordion-item-body');
  await expect.element(page.getByRole('article')).toHaveAttribute('data-part', 'item-body');
});

test('keeps provider and root and item context composition connected', async () => {
  render(<ProviderAccordion />);

  const firstTrigger = screen.getByRole('button', { name: /First item/ });

  await expect
    .element(page.getByRole('button', { name: /First item/, exact: true }))
    .toHaveAttribute('aria-expanded', 'true');
  await expect.element(page.getByText('First item is open')).toBeAttached();

  await page.getByRole('button', { name: 'Open second from context', exact: true }).click();

  await expect
    .element(page.getByRole('button', { name: 'Second item', exact: true }))
    .toHaveAttribute('aria-expanded', 'true');
  await expect
    .element(page.getByRole('button', { name: /First item/, exact: true }))
    .toHaveAttribute('aria-expanded', 'false');
  await expect.element(page.getByText('First item is closed')).toBeAttached();
  expect(Boolean(firstTrigger.closest('[data-slot="accordion-root-provider"]')?.isConnected)).toBe(
    true,
  );
});