import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { List } from '../src';

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
  expect(list).toHaveAttribute('data-marker', 'none');
  expect(list).toHaveAttribute('data-slot', 'list-root');
  expect(screen.getByText('Publish the package.')).toHaveAttribute('data-slot', 'list-item');
});