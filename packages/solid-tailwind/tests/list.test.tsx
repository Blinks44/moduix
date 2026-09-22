import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { List, ListItem } from '../src';

test('updates the semantic host when as changes', () => {
  const [ordered, setOrdered] = createSignal(false);
  render(() => (
    <List {...(ordered() ? { as: 'ol' as const, start: 3 } : { as: 'ul' as const })}>Tasks</List>
  ));

  expect(screen.getByRole('list').tagName).toBe('UL');
  setOrdered(true);
  expect(screen.getByRole('list').tagName).toBe('OL');
  expect(screen.getByRole('list')).toHaveAttribute('start', '3');
  expect(screen.getByRole('list')).toHaveTextContent('Tasks');
  setOrdered(false);
  expect(screen.getByRole('list').tagName).toBe('UL');
});

test('renders semantic unordered-list defaults and forwards the item ref', () => {
  let ref!: HTMLLIElement;

  render(() => (
    <List data-testid="list">
      <ListItem ref={(element) => (ref = element)}>
        Keep the item ref on its semantic host.
      </ListItem>
    </List>
  ));

  const list = screen.getByTestId('list');
  const item = screen.getByText('Keep the item ref on its semantic host.');

  expect(list.tagName).toBe('UL');
  expect(list).toHaveAttribute('data-gap', 'sm');
  expect(list).toHaveAttribute('data-marker', 'auto');
  expect(list).toHaveAttribute('data-size', 'md');
  expect(list).toHaveAttribute('data-tone', 'default');
  expect(list).toHaveClass(
    'flex',
    'flex-col',
    'gap-space-sm',
    'list-disc',
    'list-outside',
    'ps-5',
    'text-md',
    'text-foreground',
  );
  expect(ref).toBe(item);
  expect(item).toHaveAttribute('data-scope', 'list');
  expect(item).toHaveAttribute('data-part', 'item');
  expect(item).toHaveAttribute('data-slot', 'list-item');
});

test('renders semantic roots with stable hooks and native ordered-list props', () => {
  let ref!: HTMLOListElement;

  render(() => (
    <List ref={(element) => (ref = element)} as="ol" start={3} type="A" data-testid="list">
      <ListItem>Prepare the release notes.</ListItem>
    </List>
  ));

  const list = screen.getByTestId('list');

  expect(ref).toBe(list);
  expect(list.tagName).toBe('OL');
  expect(list).toHaveAttribute('start', '3');
  expect(list).toHaveAttribute('type', 'A');
  expect(list).toHaveAttribute('data-scope', 'list');
  expect(list).toHaveAttribute('data-part', 'root');
  expect(list).toHaveAttribute('data-slot', 'list-root');
  expect(list).toHaveClass('list-[revert]', 'ps-5');
});

test('keeps markerless list semantics and supports custom semantic roots', () => {
  let ref!: HTMLUListElement;

  render(() => (
    <List
      asChild={(props) => (
        <ul {...props()} aria-label="Release tasks">
          <ListItem>Publish the package.</ListItem>
        </ul>
      )}
      marker="none"
      ref={(element) => (ref = element)}
    />
  ));

  const list = screen.getByRole('list', { name: 'Release tasks' });

  expect(ref).toBeUndefined();
  expect(list).toHaveAttribute('role', 'list');
  expect(list).toHaveAttribute('data-marker', 'none');
  expect(list).toHaveAttribute('data-slot', 'list-root');
  expect(list).toHaveClass('list-none');
  expect(screen.getByText('Publish the package.')).toHaveAttribute('data-slot', 'list-item');
});

test('lets consumer utilities override conflicting defaults', () => {
  render(() => (
    <List class="gap-6 ps-0 text-lg text-primary" data-testid="list">
      <ListItem>Ready</ListItem>
    </List>
  ));

  const list = screen.getByTestId('list');

  expect(list).toHaveClass('gap-6', 'ps-0', 'text-lg', 'text-primary');
  expect(list).not.toHaveClass('gap-space-sm', 'ps-5', 'text-md', 'text-foreground');
});