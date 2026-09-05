import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { List } from '../src';

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
      <List.Item ref={(element) => (ref = element)}>
        Keep the item ref on its semantic host.
      </List.Item>
    </List>
  ));

  const list = screen.getByTestId('list');
  const item = screen.getByText('Keep the item ref on its semantic host.');

  expect(list.tagName).toBe('UL');
  expect(list).toHaveAttribute('data-gap', 'sm');
  expect(list).toHaveAttribute('data-marker', 'auto');
  expect(list).toHaveAttribute('data-size', 'md');
  expect(list).toHaveAttribute('data-tone', 'default');
  expect(ref).toBe(item);
  expect(item).toHaveAttribute('data-scope', 'list');
  expect(item).toHaveAttribute('data-part', 'item');
  expect(item).toHaveAttribute('data-slot', 'list-item');
});

test('renders semantic roots with stable hooks and native ordered-list props', () => {
  let ref!: HTMLOListElement;

  render(() => (
    <List ref={(element) => (ref = element)} as="ol" start={3} type="A" data-testid="list">
      <List.Item>Prepare the release notes.</List.Item>
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
});

test('keeps markerless list semantics and supports custom semantic roots', () => {
  let ref!: HTMLUListElement;

  render(() => (
    <List
      asChild={(props) => (
        <ul {...props()} aria-label="Release tasks">
          <List.Item>Publish the package.</List.Item>
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
  expect(screen.getByText('Publish the package.')).toHaveAttribute('data-slot', 'list-item');
});