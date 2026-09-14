import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { List } from '../src';

test('updates the semantic host when as changes', () => {
  const { rerender } = render(<List as="ul">Tasks</List>);

  expect(screen.getByRole('list').tagName).toBe('UL');
  rerender(
    <List as="ol" start={3}>
      Tasks
    </List>,
  );
  expect(screen.getByRole('list').tagName).toBe('OL');
  expect(screen.getByRole('list')).toHaveAttribute('start', '3');
  expect(screen.getByRole('list')).toHaveTextContent('Tasks');
  rerender(<List as="ul">Tasks</List>);
  expect(screen.getByRole('list').tagName).toBe('UL');
});

test('renders semantic unordered-list defaults and forwards the item ref', () => {
  const ref = createRef<HTMLLIElement>();

  render(
    <List data-testid="list">
      <List.Item ref={ref}>Keep the item ref on its semantic host.</List.Item>
    </List>,
  );

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
  expect(ref.current).toBe(item);
  expect(item).toHaveAttribute('data-scope', 'list');
  expect(item).toHaveAttribute('data-part', 'item');
  expect(item).toHaveAttribute('data-slot', 'list-item');
});

test('renders semantic roots with stable hooks and native ordered-list props', () => {
  const ref = createRef<HTMLOListElement>();

  render(
    <List ref={ref} as="ol" start={3} type="A" data-testid="list">
      <List.Item>Prepare the release notes.</List.Item>
    </List>,
  );

  const list = screen.getByTestId('list');

  expect(ref.current).toBe(list);
  expect(list.tagName).toBe('OL');
  expect(list).toHaveAttribute('start', '3');
  expect(list).toHaveAttribute('type', 'A');
  expect(list).toHaveAttribute('data-scope', 'list');
  expect(list).toHaveAttribute('data-part', 'root');
  expect(list).toHaveAttribute('data-slot', 'list-root');
  expect(list).toHaveClass('list-[revert]', 'ps-5');
});

test('keeps markerless list semantics and supports custom semantic roots', () => {
  const ref = createRef<HTMLUListElement>();

  render(
    <List asChild marker="none" ref={ref}>
      <ul aria-label="Release tasks">
        <List.Item>Publish the package.</List.Item>
      </ul>
    </List>,
  );

  const list = screen.getByRole('list', { name: 'Release tasks' });

  expect(ref.current).toBe(list);
  expect(list).toHaveAttribute('role', 'list');
  expect(list).toHaveAttribute('data-marker', 'none');
  expect(list).toHaveAttribute('data-slot', 'list-root');
  expect(list).toHaveClass('list-none');
  expect(screen.getByText('Publish the package.')).toHaveAttribute('data-slot', 'list-item');
});

test('lets consumer utilities override conflicting defaults', () => {
  render(
    <List className="gap-6 ps-0 text-lg text-primary" data-testid="list">
      <List.Item>Ready</List.Item>
    </List>,
  );

  const list = screen.getByTestId('list');

  expect(list).toHaveClass('gap-6', 'ps-0', 'text-lg', 'text-primary');
  expect(list).not.toHaveClass('gap-space-sm', 'ps-5', 'text-md', 'text-foreground');
});