import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Kbd } from '../src';

test('renders semantic keycaps and an inline shortcut group with stable hooks', () => {
  const groupRef = createRef<HTMLSpanElement>();

  render(
    <Kbd.Group ref={groupRef} aria-label="Command K" data-testid="group">
      <Kbd data-testid="key">Cmd</Kbd>+<Kbd>K</Kbd>
    </Kbd.Group>,
  );

  const group = screen.getByTestId('group');
  const key = screen.getByTestId('key');

  expect(group.tagName).toBe('SPAN');
  expect(groupRef.current).toBe(group);
  expect(group).toHaveAttribute('data-scope', 'kbd');
  expect(group).toHaveAttribute('data-part', 'group');
  expect(group).toHaveAttribute('data-slot', 'kbd-group');
  expect(key.tagName).toBe('KBD');
  expect(key).toHaveAttribute('data-slot', 'kbd-root');
});

test('preserves semantic children and refs with asChild', () => {
  const ref = createRef<HTMLElement>();

  render(
    <Kbd ref={ref} asChild>
      <kbd title="Escape">Esc</kbd>
    </Kbd>,
  );

  const key = screen.getByTitle('Escape');

  expect(ref.current).toBe(key);
  expect(key).toHaveAttribute('data-part', 'root');
  expect(key).toHaveAttribute('data-slot', 'kbd-root');
});