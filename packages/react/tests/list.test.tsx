import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { List } from '../src';

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
  expect(screen.getByText('Publish the package.')).toHaveAttribute('data-slot', 'list-item');
});