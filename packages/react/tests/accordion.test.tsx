import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Accordion } from '../src';

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
}: {
  collapsible?: boolean;
  disabled?: boolean;
  lazyMount?: boolean;
  onValueChange?: (details: { value: string[] }) => void;
  orientation?: 'horizontal' | 'vertical';
}) {
  return (
    <Accordion
      collapsible={collapsible}
      defaultValue={['first']}
      lazyMount={lazyMount}
      onValueChange={onValueChange}
      orientation={orientation}
    >
      {items.map((item) => (
        <Accordion.Item
          key={item.value}
          disabled={disabled && item.value === 'second'}
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

test('moves focus between vertical triggers with arrow keys', async () => {
  render(<TestAccordion />);

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
});

test('keeps Ark value change details and ignores disabled items', () => {
  const values: string[][] = [];
  render(<TestAccordion disabled onValueChange={(details) => values.push(details.value)} />);

  const disabledTrigger = screen.getByRole('button', { name: 'Second item' });
  expect(disabledTrigger).toBeDisabled();

  fireEvent.click(disabledTrigger);
  expect(values).toEqual([]);
});

test('reports the next value when an item opens', async () => {
  const values: string[][] = [];
  render(<TestAccordion onValueChange={(details) => values.push(details.value)} />);

  const secondTrigger = screen.getByRole('button', { name: 'Second item' });
  secondTrigger.focus();
  fireEvent.focusIn(secondTrigger);
  await waitFor(() => expect(secondTrigger).toHaveAttribute('data-focus'));
  fireEvent.click(secondTrigger);
  await waitFor(() => expect(values).toEqual([['second']]));
});

test('mounts lazy content only after its item opens', async () => {
  render(<TestAccordion lazyMount />);

  expect(screen.queryByText('Second content')).not.toBeInTheDocument();
  const secondTrigger = screen.getByRole('button', { name: 'Second item' });
  secondTrigger.focus();
  fireEvent.focusIn(secondTrigger);
  await waitFor(() => expect(secondTrigger).toHaveAttribute('data-focus'));
  fireEvent.click(secondTrigger);
  await waitFor(() => expect(screen.getByText('Second content')).toBeVisible());
});

test('uses horizontal keyboard navigation', async () => {
  render(<TestAccordion orientation="horizontal" />);

  const firstTrigger = screen.getByRole('button', { name: 'First item' });
  const secondTrigger = screen.getByRole('button', { name: 'Second item' });

  firstTrigger.focus();
  fireEvent.focusIn(firstTrigger);
  await waitFor(() => expect(firstTrigger).toHaveAttribute('data-focus'));
  fireEvent.keyDown(firstTrigger, { key: 'ArrowRight' });
  await waitFor(() => expect(secondTrigger).toHaveFocus());
});