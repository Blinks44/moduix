import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { Accordion, useAccordion, useAccordionContext, useAccordionItemContext } from '../src';

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
        <Accordion.Item
          disabled={(props.disabled ?? false) && item.value === 'second'}
          value={item.value}
        >
          <Accordion.ItemTrigger>{item.label}</Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody>{item.content}</Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
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
    <Accordion.RootProvider value={accordion}>
      <AccordionRootState />
      <Accordion.Item value="first">
        <Accordion.ItemTrigger>
          First item
          <AccordionItemState />
        </Accordion.ItemTrigger>
        <Accordion.ItemContent>
          <Accordion.ItemBody>First content</Accordion.ItemBody>
        </Accordion.ItemContent>
      </Accordion.Item>
      <Accordion.Item value="second">
        <Accordion.ItemTrigger>Second item</Accordion.ItemTrigger>
        <Accordion.ItemContent>
          <Accordion.ItemBody>Second content</Accordion.ItemBody>
        </Accordion.ItemContent>
      </Accordion.Item>
    </Accordion.RootProvider>
  );
}

test('preserves Ark semantics, refs, anatomy, and moduix styling hooks', () => {
  let rootRef!: HTMLDivElement;
  let triggerRef!: HTMLButtonElement;
  let bodyRef!: HTMLDivElement;

  render(() => (
    <Accordion ref={(element) => (rootRef = element)} defaultValue={['first']}>
      <Accordion.Item value="first">
        <Accordion.ItemTrigger ref={(element) => (triggerRef = element)}>
          First item
          <Accordion.ItemIndicator />
        </Accordion.ItemTrigger>
        <Accordion.ItemContent>
          <Accordion.ItemBody ref={(element) => (bodyRef = element)}>
            First content
          </Accordion.ItemBody>
        </Accordion.ItemContent>
      </Accordion.Item>
    </Accordion>
  ));

  const trigger = screen.getByRole('button', { name: 'First item' });
  const body = screen.getByText('First content');
  const content = body.parentElement;

  expect(rootRef).toHaveAttribute('data-slot', 'accordion-root');
  expect(rootRef).toHaveAttribute('data-scope', 'accordion');
  expect(triggerRef).toBe(trigger);
  expect(trigger).toHaveAttribute('type', 'button');
  expect(trigger).toHaveAttribute('data-slot', 'accordion-item-trigger');
  expect(trigger).toHaveAttribute('aria-expanded', 'true');
  expect(trigger).toHaveAttribute('aria-controls', content?.id);
  expect(trigger.querySelector('[data-slot="accordion-item-indicator"] svg')).toBeInTheDocument();
  expect(content).toHaveAttribute('data-slot', 'accordion-item-content');
  expect(content).toHaveAttribute('aria-labelledby', trigger.id);
  expect(bodyRef).toBe(body);
  expect(body).toHaveAttribute('data-part', 'item-body');
  expect(body).toHaveAttribute('data-slot', 'accordion-item-body');
});

test('moves focus between vertical triggers with arrow keys', async () => {
  render(() => <TestAccordion />);

  const firstTrigger = screen.getByRole('button', { name: 'First item' });
  const secondTrigger = screen.getByRole('button', { name: 'Second item' });

  firstTrigger.focus();
  fireEvent.focusIn(firstTrigger);
  await waitFor(() => expect(firstTrigger).toHaveAttribute('data-focus'));
  fireEvent.keyDown(firstTrigger, { key: 'ArrowDown' });
  await waitFor(() => expect(secondTrigger).toHaveFocus());

  fireEvent.focusIn(secondTrigger);
  await waitFor(() => expect(secondTrigger).toHaveAttribute('data-focus'));
  fireEvent.keyDown(secondTrigger, { key: 'ArrowUp' });
  await waitFor(() => expect(firstTrigger).toHaveFocus());

  fireEvent.keyDown(firstTrigger, { key: 'End' });
  await waitFor(() => expect(secondTrigger).toHaveFocus());

  fireEvent.keyDown(secondTrigger, { key: 'Home' });
  await waitFor(() => expect(firstTrigger).toHaveFocus());
});

test('keeps Ark value change details and ignores disabled items', () => {
  const values: string[][] = [];
  render(() => <TestAccordion disabled onValueChange={(details) => values.push(details.value)} />);

  const disabledTrigger = screen.getByRole('button', { name: 'Second item' });
  expect(disabledTrigger).toBeDisabled();

  fireEvent.click(disabledTrigger);
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

  const secondTrigger = screen.getByRole('button', { name: 'Second item' });
  secondTrigger.focus();
  fireEvent.focusIn(secondTrigger);
  await waitFor(() => expect(secondTrigger).toHaveAttribute('data-focus'));
  fireEvent.click(secondTrigger);
  await waitFor(() => expect(screen.getByText('Open items: second')).toBeInTheDocument());
});

test('mounts lazy content only after its item opens', async () => {
  render(() => <TestAccordion lazyMount />);

  expect(screen.queryByText('Second content')).not.toBeInTheDocument();
  const secondTrigger = screen.getByRole('button', { name: 'Second item' });
  secondTrigger.focus();
  fireEvent.focusIn(secondTrigger);
  await waitFor(() => expect(secondTrigger).toHaveAttribute('data-focus'));
  fireEvent.click(secondTrigger);
  await waitFor(() => expect(screen.getByText('Second content')).toBeVisible());
});

test('uses horizontal keyboard navigation', async () => {
  render(() => <TestAccordion orientation="horizontal" />);

  const firstTrigger = screen.getByRole('button', { name: 'First item' });
  const secondTrigger = screen.getByRole('button', { name: 'Second item' });

  firstTrigger.focus();
  fireEvent.focusIn(firstTrigger);
  await waitFor(() => expect(firstTrigger).toHaveAttribute('data-focus'));
  fireEvent.keyDown(firstTrigger, { key: 'ArrowRight' });
  await waitFor(() => expect(secondTrigger).toHaveFocus());
});

test('allows the active item to close when collapsible', async () => {
  render(() => <TestAccordion collapsible />);

  const firstTrigger = screen.getByRole('button', { name: 'First item' });
  expect(firstTrigger).toHaveAttribute('aria-expanded', 'true');

  firstTrigger.focus();
  fireEvent.focusIn(firstTrigger);
  await waitFor(() => expect(firstTrigger).toHaveAttribute('data-focus'));
  fireEvent.click(firstTrigger);
  await waitFor(() => expect(firstTrigger).toHaveAttribute('aria-expanded', 'false'));
});

test('preserves semantic hosts with asChild', () => {
  render(() => (
    <Accordion
      defaultValue={['first']}
      asChild={(props) => <section {...props()} aria-label="Frequently asked questions" />}
    >
      <Accordion.Item value="first">
        <Accordion.ItemTrigger>First item</Accordion.ItemTrigger>
        <Accordion.ItemContent>
          <Accordion.ItemBody asChild={(props) => <article {...props()}>First content</article>} />
        </Accordion.ItemContent>
      </Accordion.Item>
    </Accordion>
  ));

  const root = screen.getByRole('region', { name: 'Frequently asked questions' });
  const body = screen.getByRole('article');

  expect(root.tagName).toBe('SECTION');
  expect(root).toHaveAttribute('data-slot', 'accordion-root');
  expect(body).toHaveAttribute('data-slot', 'accordion-item-body');
  expect(body).toHaveAttribute('data-part', 'item-body');
});

test('keeps provider and root and item context composition connected', async () => {
  render(() => <ProviderAccordion />);

  const firstTrigger = screen.getByRole('button', { name: /First item/ });
  const secondTrigger = screen.getByRole('button', { name: 'Second item' });

  expect(firstTrigger).toHaveAttribute('aria-expanded', 'true');
  expect(screen.getByText('First item is open')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'Open second from context' }));

  await waitFor(() => expect(secondTrigger).toHaveAttribute('aria-expanded', 'true'));
  expect(firstTrigger).toHaveAttribute('aria-expanded', 'false');
  expect(screen.getByText('First item is closed')).toBeInTheDocument();
  expect(firstTrigger.closest('[data-slot="accordion-root-provider"]')).toBeInTheDocument();
});