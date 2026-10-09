import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
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

function TestAccordion(props: {
  collapsible?: boolean;
  disabled?: boolean;
  lazyMount?: boolean;
  onValueChange?: (details: { value: string[] }) => void;
  orientation?: 'horizontal' | 'vertical';
  value?: string[];
}) {
  return (
    <Accordion
      collapsible={props.collapsible ?? false}
      defaultValue={props.value === undefined ? ['first'] : undefined}
      lazyMount={props.lazyMount ?? false}
      onValueChange={props.onValueChange}
      orientation={props.orientation ?? 'vertical'}
      value={props.value}
    >
      {items.map((item) => (
        <AccordionItem
          disabled={(props.disabled ?? false) && item.value === 'second'}
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
    <button type="button" onClick={() => accordion().setValue(['second'])}>
      Open second from context
    </button>
  );
}

function AccordionItemState() {
  const item = useAccordionItemContext();

  return <span>First item is {item().expanded ? 'open' : 'closed'}</span>;
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
  let rootRef!: HTMLDivElement;
  let triggerRef!: HTMLButtonElement;
  let bodyRef!: HTMLDivElement;

  render(() => (
    <Accordion ref={(element) => (rootRef = element)} defaultValue={['first']}>
      <AccordionItem value="first">
        <AccordionItemTrigger ref={(element) => (triggerRef = element)}>
          First item
          <AccordionItemIndicator />
        </AccordionItemTrigger>
        <AccordionItemContent>
          <AccordionItemBody ref={(element) => (bodyRef = element)}>
            First content
          </AccordionItemBody>
        </AccordionItemContent>
      </AccordionItem>
    </Accordion>
  ));

  const trigger = screen.getByRole('button', { name: 'First item' });
  const body = screen.getByText('First content');
  const content = body.parentElement;

  expect(rootRef!.getAttribute('data-slot')).toBe('accordion-root');
  expect(rootRef!.getAttribute('data-scope')).toBe('accordion');
  expect(triggerRef).toBe(trigger);
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
  expect(bodyRef).toBe(body);
  await expect.element(page.getByText('First content')).toHaveAttribute('data-part', 'item-body');
  await expect
    .element(page.getByText('First content'))
    .toHaveAttribute('data-slot', 'accordion-item-body');
});

test('moves focus between vertical triggers with arrow keys', async () => {
  render(() => <TestAccordion />);

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
  render(() => <TestAccordion disabled onValueChange={(details) => values.push(details.value)} />);

  await expect
    .element(page.getByRole('button', { name: 'Second item', exact: true }))
    .toBeDisabled();

  expect(values).toEqual([]);
});

test('reports the next value when an item opens', async () => {
  function ControlledAccordion() {
    const [value, setValue] = createSignal(['first']);

    return (
      <>
        <TestAccordion value={value()} onValueChange={(details) => setValue(details.value)} />
        <output>Open items: {value().join(', ')}</output>
      </>
    );
  }

  render(() => <ControlledAccordion />);

  await page.getByRole('button', { name: 'Second item', exact: true }).click();
  await expect.element(page.getByText('Open items: second')).toBeAttached();
});

test('mounts lazy content only after its item opens', async () => {
  render(() => <TestAccordion lazyMount />);

  await expect.element(page.getByText('Second content')).toHaveCount(0);

  await page.getByRole('button', { name: 'Second item', exact: true }).click();
  await expect.element(page.getByText('Second content')).toBeVisible();
});

test('uses horizontal keyboard navigation', async () => {
  render(() => <TestAccordion orientation="horizontal" />);

  await page.getByRole('button', { name: 'First item', exact: true }).click();
  await page.getByRole('button', { name: 'First item', exact: true }).press('ArrowRight');
  await expect
    .element(page.getByRole('button', { name: 'Second item', exact: true }))
    .toBeFocused();
});

test('allows the active item to close when collapsible', async () => {
  render(() => <TestAccordion collapsible />);

  const firstTriggerLocator = page.getByRole('button', { name: 'First item', exact: true });
  await expect.element(firstTriggerLocator).toHaveAttribute('aria-expanded', 'true');

  await firstTriggerLocator.click();
  await expect.element(firstTriggerLocator).toHaveAttribute('aria-expanded', 'false');
});

test('preserves semantic hosts with asChild', async () => {
  render(() => (
    <Accordion
      defaultValue={['first']}
      asChild={(props) => <section {...props()} aria-label="Frequently asked questions" />}
    >
      <AccordionItem value="first">
        <AccordionItemTrigger>First item</AccordionItemTrigger>
        <AccordionItemContent>
          <AccordionItemBody asChild={(props) => <article {...props()}>First content</article>} />
        </AccordionItemContent>
      </AccordionItem>
    </Accordion>
  ));

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
  render(() => <ProviderAccordion />);

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
  expect(body!.classList.contains('p-3')).toBe(false);
  await expect
    .element(page.getByText('First content', { exact: true }))
    .toHaveCSS('padding', '0px');
});