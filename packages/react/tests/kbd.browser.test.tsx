import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Kbd, KbdGroup } from '../src';

test('renders semantic keycaps and a labelled shortcut group with stable hooks', () => {
  const groupRef = createRef<HTMLSpanElement>();

  render(
    <KbdGroup
      ref={groupRef}
      aria-label="Command K"
      data-testid="group"
      data-scope="consumer"
      data-part="consumer"
      role="presentation"
    >
      <Kbd data-testid="key" data-scope="consumer" data-part="consumer">
        Cmd
      </Kbd>
      +<Kbd>K</Kbd>
    </KbdGroup>,
  );

  const group = screen.getByRole('group', { name: 'Command K' });
  const key = screen.getByTestId('key');

  expect(group.tagName).toBe('SPAN');
  expect(groupRef.current).toBe(group);
  expect(group.getAttribute('data-scope')).toBe('kbd');
  expect(group.getAttribute('data-part')).toBe('group');
  expect(group.getAttribute('data-slot')).toBe('kbd-group');
  expect(group.getAttribute('aria-label')).toBe('Command K');
  expect(key.tagName).toBe('KBD');
  expect(key.getAttribute('data-slot')).toBe('kbd-root');
  expect(key.dataset).toMatchObject({ scope: 'kbd', part: 'root' });
  expect(getComputedStyle(key)).toMatchObject({
    display: 'flex',
    minHeight: '24px',
    minWidth: '24px',
    fontSize: '12px',
    fontWeight: '500',
    userSelect: 'none',
    fontVariantNumeric: 'tabular-nums',
  });
  expect(getComputedStyle(group)).toMatchObject({
    display: 'inline-flex',
    flexWrap: 'wrap',
    gap: '4px',
    padding: '0px',
    borderWidth: '0px',
    boxShadow: 'none',
  });
});

test('preserves semantic children and refs with asChild', () => {
  const keyRef = createRef<HTMLElement>();
  const groupRef = createRef<HTMLElement>();

  render(
    <KbdGroup ref={groupRef} asChild aria-label="Command K">
      <span title="Command K">
        <Kbd ref={keyRef} asChild>
          <kbd title="Escape">Esc</kbd>
        </Kbd>
      </span>
    </KbdGroup>,
  );

  const group = screen.getByRole('group', { name: 'Command K' });
  const key = screen.getByTitle('Escape');

  expect(groupRef.current).toBe(group);
  expect(keyRef.current).toBe(key);
  expect(group.getAttribute('data-part')).toBe('group');
  expect(group.getAttribute('data-slot')).toBe('kbd-group');
  expect(key.getAttribute('data-part')).toBe('root');
  expect(key.getAttribute('data-slot')).toBe('kbd-root');
});