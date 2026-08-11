import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Kbd } from '../src';

test('renders semantic keycaps and a labelled shortcut group with stable hooks', () => {
  const groupRef = createRef<HTMLSpanElement>();

  render(
    <Kbd.Group ref={groupRef} aria-label="Command K" data-testid="group">
      <Kbd data-testid="key">Cmd</Kbd>+<Kbd>K</Kbd>
    </Kbd.Group>,
  );

  const group = screen.getByRole('group', { name: 'Command K' });
  const key = screen.getByTestId('key');

  expect(group.tagName).toBe('SPAN');
  expect(groupRef.current).toBe(group);
  expect(group).toHaveAttribute('data-scope', 'kbd');
  expect(group).toHaveAttribute('data-part', 'group');
  expect(group).toHaveAttribute('data-slot', 'kbd-group');
  expect(group).toHaveAttribute('aria-label', 'Command K');
  expect(key.tagName).toBe('KBD');
  expect(key).toHaveAttribute('data-slot', 'kbd-root');
});

test('preserves semantic children and refs with asChild', () => {
  const keyRef = createRef<HTMLElement>();
  const groupRef = createRef<HTMLElement>();

  render(
    <Kbd.Group ref={groupRef} asChild aria-label="Command K">
      <span title="Command K">
        <Kbd ref={keyRef} asChild>
          <kbd title="Escape">Esc</kbd>
        </Kbd>
      </span>
    </Kbd.Group>,
  );

  const group = screen.getByRole('group', { name: 'Command K' });
  const key = screen.getByTitle('Escape');

  expect(groupRef.current).toBe(group);
  expect(keyRef.current).toBe(key);
  expect(group).toHaveAttribute('data-part', 'group');
  expect(group).toHaveAttribute('data-slot', 'kbd-group');
  expect(key).toHaveAttribute('data-part', 'root');
  expect(key).toHaveAttribute('data-slot', 'kbd-root');
});