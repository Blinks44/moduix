import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { List, ListItem } from '../src';

test('updates the semantic host when as changes', async () => {
  const { rerender } = render(<List as="ul">Tasks</List>);

  expect(screen.getByRole('list').tagName).toBe('UL');
  rerender(
    <List as="ol" start={3}>
      Tasks
    </List>,
  );
  expect(screen.getByRole('list').tagName).toBe('OL');
  await expect.element(page.getByRole('list')).toHaveAttribute('start', '3');
  await expect.element(page.getByRole('list')).toContainText('Tasks');
  rerender(<List as="ul">Tasks</List>);
  expect(screen.getByRole('list').tagName).toBe('UL');
});

test('renders semantic unordered-list defaults and forwards the item ref', () => {
  const ref = createRef<HTMLLIElement>();

  render(
    <List data-testid="list">
      <ListItem ref={ref}>Keep the item ref on its semantic host.</ListItem>
    </List>,
  );

  const list = screen.getByTestId('list');
  const item = screen.getByText('Keep the item ref on its semantic host.');

  expect(list.tagName).toBe('UL');

  expect(list.dataset).toMatchObject({ gap: 'sm', marker: 'auto', size: 'md', tone: 'default' });
  expect(ref.current).toBe(item);

  expect(item.dataset).toMatchObject({ scope: 'list', part: 'item', slot: 'list-item' });
});

test('renders semantic roots with stable hooks and native ordered-list props', async () => {
  const ref = createRef<HTMLOListElement>();

  render(
    <List ref={ref} as="ol" start={3} type="A" data-testid="list">
      <ListItem>Prepare the release notes.</ListItem>
    </List>,
  );

  const list = screen.getByTestId('list');

  expect(ref.current).toBe(list);
  expect(list.tagName).toBe('OL');
  const listLocator = page.getByTestId('list');
  await expect.element(listLocator).toHaveAttribute('start', '3');
  await expect.element(listLocator).toHaveAttribute('type', 'A');
  expect(list.dataset).toMatchObject({ scope: 'list', part: 'root', slot: 'list-root' });
});

test('keeps markerless list semantics and supports custom semantic roots', async () => {
  const ref = createRef<HTMLUListElement>();

  render(
    <List asChild marker="none" ref={ref}>
      <ul aria-label="Release tasks">
        <ListItem>Publish the package.</ListItem>
      </ul>
    </List>,
  );

  const list = screen.getByRole('list', { name: 'Release tasks' });

  expect(ref.current).toBe(list);

  await expect
    .element(page.getByRole('list', { name: 'Release tasks' }))
    .toHaveAttribute('role', 'list');
  expect(list.dataset).toMatchObject({ marker: 'none', slot: 'list-root' });
  expect(screen.getByText('Publish the package.').getAttribute('data-slot')).toBe('list-item');
});