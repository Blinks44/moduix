import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { Kbd } from '../src';

test('renders semantic keycaps and a labelled shortcut group with stable hooks', () => {
  let groupRef!: HTMLSpanElement;

  render(() => (
    <Kbd.Group ref={(element) => (groupRef = element)} aria-label="Command K" data-testid="group">
      <Kbd data-testid="key">Cmd</Kbd>+<Kbd>K</Kbd>
    </Kbd.Group>
  ));

  const group = screen.getByRole('group', { name: 'Command K' });
  const key = screen.getByTestId('key');

  expect(group.tagName).toBe('SPAN');
  expect(groupRef).toBe(group);
  expect(group).toHaveAttribute('data-scope', 'kbd');
  expect(group).toHaveAttribute('data-part', 'group');
  expect(group).toHaveAttribute('data-slot', 'kbd-group');
  expect(group).toHaveAttribute('aria-label', 'Command K');
  expect(key.tagName).toBe('KBD');
  expect(key).toHaveAttribute('data-slot', 'kbd-root');
});

test('keeps owned anatomy and group semantics when consumer props conflict', () => {
  render(() => (
    <Kbd data-part="consumer" data-scope="consumer" data-testid="kbd">
      A
      <Kbd.Group data-part="consumer" data-scope="consumer" role="presentation">
        B
      </Kbd.Group>
    </Kbd>
  ));

  expect(screen.getByTestId('kbd')).toHaveAttribute('data-scope', 'kbd');
  expect(screen.getByTestId('kbd')).toHaveAttribute('data-part', 'root');
  expect(screen.getByRole('group')).toHaveAttribute('data-scope', 'kbd');
  expect(screen.getByRole('group')).toHaveAttribute('data-part', 'group');
});

test('preserves semantic children and stable hooks with native Ark Solid asChild', () => {
  let keyRef: HTMLElement | undefined;
  let groupRef: HTMLElement | undefined;

  render(() => (
    <Kbd.Group
      ref={(element) => (groupRef = element)}
      asChild={(props) => <span {...props()} />}
      aria-label="Command K"
    >
      <Kbd
        ref={(element) => (keyRef = element)}
        asChild={(props) => <kbd {...props()} title="Escape" />}
      >
        Esc
      </Kbd>
    </Kbd.Group>
  ));

  const group = screen.getByRole('group', { name: 'Command K' });
  const key = screen.getByTitle('Escape');

  expect(groupRef).toBeUndefined();
  expect(keyRef).toBeUndefined();
  expect(group).toHaveAttribute('data-part', 'group');
  expect(group).toHaveAttribute('data-slot', 'kbd-group');
  expect(key).toHaveAttribute('data-part', 'root');
  expect(key).toHaveAttribute('data-slot', 'kbd-root');
});